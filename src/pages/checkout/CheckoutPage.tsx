import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { track } from '@vercel/analytics';

declare global {
    interface Window {
        paypal: any;
    }
}

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        industry: ''
    });

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [cart, setCart] = useState<any[]>([]);

    // Get Cart
    useEffect(() => {
        const storedCart = sessionStorage.getItem('oasis_cart');
        if (!storedCart) {
            // Demo cart logic from user prompt
            // But we should probably redirect if empty in real app
            // Keeping user logic:
            setCart([{
                automationType: 'website-chat',
                automationName: 'Website Chat Automation',
                setupFee: 997,
                tierKey: 'professional',
                tierName: 'Professional',
                monthlyPrice: 297
            }]);
        } else {
            setCart(JSON.parse(storedCart));
            // Track checkout started
            try {
                const cartData = JSON.parse(storedCart);
                const total = cartData.reduce((acc: number, item: any) => acc + (item.setupFee || 0) + (item.monthlyPrice || 0), 0);
                track('checkout_started', {
                    total: total,
                    items: cartData.map((i: any) => i.automationName + '-' + i.tierName)
                });
            } catch (e) { console.error(e); }
        }
    }, []);

    // Load PayPal SDK
    useEffect(() => {
        if (document.getElementById('paypal-sdk-script')) {
            setScriptLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.id = 'paypal-sdk-script';
        // USE PROVIDED CREDENTIALS AND URL EXACTLY
        script.src = "https://www.paypal.com/sdk/js?client-id=AWj36CkXVGVjHIIO7LHsvtRQoACy6Gbg4KTJu0CD1dJrRBkLqm8G9PYIpr40vCZ8ZZl63o-5eHDfD-8J&currency=CAD&intent=capture&components=buttons,card-fields";
        script.setAttribute('data-partner-attribution-id', 'OASIS_AI');
        script.async = true;

        script.onload = () => {
            setScriptLoaded(true);
        };

        script.onerror = () => {
            setErrorMsg('Payment system failed to load. Please refresh the page.');
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup? Usually better to keep SDK if loaded
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Remove error class on change
        e.target.classList.remove('error');
    };

    const validateForm = () => {
        let isValid = true;
        const required = ['firstName', 'lastName', 'email', 'company'];

        required.forEach(field => {
            const el = document.getElementById(field) as HTMLInputElement;
            if (el && !el.value.trim()) {
                el.classList.add('error');
                isValid = false;
            }
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            const el = document.getElementById('email') as HTMLInputElement;
            if (el) el.classList.add('error');
            isValid = false;
        }

        if (!isValid) {
            setErrorMsg('Please fill in all required fields correctly.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setErrorMsg(null), 5000);
        }
        return isValid;
    };

    const calculateTotals = () => {
        let setupTotal = 0;
        let monthlyTotal = 0;
        cart.forEach(item => {
            setupTotal += item.setupFee || 0;
            monthlyTotal += item.monthlyPrice || 0;
        });
        const subtotal = setupTotal + monthlyTotal;
        const tax = subtotal * 0.13;
        const grandTotal = subtotal + tax;
        return { setupTotal, monthlyTotal, tax, grandTotal, subtotal };
    };

    const totals = calculateTotals();

    // Render Buttons
    useEffect(() => {
        if (scriptLoaded && window.paypal) {
            const container = document.getElementById('paypal-button-container');
            if (container) container.innerHTML = ''; // Clear previous

            window.paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay',
                    height: 50
                },
                createOrder: (data: any, actions: any) => {
                    if (!validateForm()) {
                        return actions.reject();
                    }

                    // Client-side totals calculation for PayPal
                    const currentTotals = calculateTotals();

                    return actions.order.create({
                        purchase_units: [{
                            description: `OASIS AI - ${cart.map(i => i.automationName).join(', ')}`,
                            amount: {
                                currency_code: 'CAD',
                                value: currentTotals.grandTotal.toFixed(2),
                                breakdown: {
                                    item_total: {
                                        currency_code: 'CAD',
                                        value: currentTotals.subtotal.toFixed(2)
                                    },
                                    tax_total: {
                                        currency_code: 'CAD',
                                        value: currentTotals.tax.toFixed(2)
                                    }
                                }
                            },
                            items: cart.map(item => ({
                                name: (item.automationName + ' - ' + item.tierName).substring(0, 127), // PayPal limit
                                description: `Setup: $${item.setupFee}, Monthly: $${item.monthlyPrice}`,
                                unit_amount: {
                                    currency_code: 'CAD',
                                    value: (item.setupFee + item.monthlyPrice).toFixed(2)
                                },
                                quantity: '1',
                                category: 'DIGITAL_GOODS'
                            }))
                        }],
                        application_context: {
                            brand_name: 'OASIS AI Solutions',
                            shipping_preference: 'NO_SHIPPING',
                            user_action: 'PAY_NOW'
                        }
                    });
                },
                onApprove: (data: any, actions: any) => {
                    setLoading(true);
                    return actions.order.capture().then((orderData: any) => {
                        console.log('Payment captured:', orderData);
                        track('payment_completed', {
                            orderID: data.orderID,
                            total: orderData.purchase_units[0].amount.value,
                            currency: orderData.purchase_units[0].amount.currency_code
                        });

                        const orderInfo = {
                            orderID: data.orderID,
                            payerEmail: orderData.payer.email_address,
                            payerName: orderData.payer.name.given_name + ' ' + orderData.payer.name.surname,
                            amount: orderData.purchase_units[0].amount.value,
                            currency: orderData.purchase_units[0].amount.currency_code,
                            status: orderData.status,
                            customer: formData,
                            cart: cart,
                            timestamp: new Date().toISOString()
                        };

                        sessionStorage.setItem('oasis_order', JSON.stringify(orderInfo));
                        sessionStorage.removeItem('oasis_cart');
                        navigate(`/checkout/success?order=${data.orderID}`);
                    }).catch((err: any) => {
                        setLoading(false);
                        console.error('Capture error:', err);
                        setErrorMsg('Payment could not be processed. Please try again.');
                    });
                },
                onError: (err: any) => {
                    console.error('PayPal error:', err);
                    setLoading(false);
                    setErrorMsg('Something went wrong with the payment. Please try again.');
                }
            }).render('#paypal-button-container');
        }
    }, [scriptLoaded, cart, formData, navigate]);

    return (
        <div className="checkout-page pt-24">
            {loading && (
                <div className="loading-overlay active">
                    <div className="spinner"></div>
                    <div className="loading-text">Processing your payment...</div>
                </div>
            )}

            <div className="checkout-header">
                <h1>Secure Checkout</h1>
            </div>

            {errorMsg && (
                <div className="error-banner active">
                    {errorMsg}
                </div>
            )}

            <div className="checkout-grid">
                <div className="checkout-forms">
                    <div className="checkout-card">
                        <h2>Contact Information</h2>
                        <div id="customer-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Company Name *</label>
                                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your Business Inc." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="industry">Industry</label>
                                <select id="industry" name="industry" value={formData.industry} onChange={handleChange}>
                                    <option value="">Select your industry</option>
                                    <option value="hvac">HVAC / Home Services</option>
                                    <option value="fitness">Fitness / Gym</option>
                                    <option value="beauty">Beauty / Wellness</option>
                                    <option value="ecommerce">E-commerce</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="realestate">Real Estate</option>
                                    <option value="professional">Professional Services</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-card">
                        <h2>Payment Method</h2>
                        <div className="payment-section">
                            <div id="paypal-button-container"></div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                <span style={{ color: '#64748B', fontSize: '14px' }}>Secured by PayPal</span>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                            </div>

                            <p className="text-gray-500 text-sm text-center">
                                Note: Credit Card fields will appear in the PayPal popup or you can log in to PayPal.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="summary-card text-white">
                    <div className="checkout-card">
                        <h2>Order Summary</h2>
                        <div id="order-items">
                            {cart.map((item, idx) => (
                                <div className="order-item" key={idx}>
                                    <div className="item-info">
                                        <h4>{item.automationName}</h4>
                                        <span className="tier-badge">{item.tierName} Plan</span>
                                    </div>
                                    <div className="item-pricing">
                                        <div className="setup">${item.setupFee?.toLocaleString()} setup</div>
                                        <div className="monthly">${item.monthlyPrice}/mo</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row">
                            <span>Setup Fees</span>
                            <span>${totals.setupTotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>First Month</span>
                            <span>${totals.monthlyTotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (13% HST)</span>
                            <span>${totals.tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total Today</span>
                            <span>${totals.grandTotal.toLocaleString()}</span>
                        </div>
                        <p className="recurring-note">Then ${totals.monthlyTotal.toLocaleString()}/mo starting next month</p>

                        <div className="trust-badge">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            <span>256-bit SSL Encrypted Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
