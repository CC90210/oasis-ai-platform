import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const OrderSuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order');

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center p-5 font-sans">
            <div className="text-center max-w-[600px]">
                <div className="w-[100px] h-[100px] bg-[rgba(16,185,129,0.1)] rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-[50px] h-[50px] text-[#10B981]">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h1 className="text-[2.5rem] mb-4 font-bold">Payment Successful!</h1>
                <p className="text-[#00D4FF] text-[1.25rem] mb-6">Order #{orderId ? orderId.substring(0, 8).toUpperCase() : 'CONFIRMED'}</p>

                <p className="text-[#94A3B8] text-[1.125rem] leading-[1.6] mb-8">
                    Thank you for choosing OASIS AI! A confirmation email has been sent to your inbox.
                    Our team will contact you within 1 hour to schedule your setup consultation.
                </p>

                <div className="bg-[rgba(26,31,46,0.8)] border border-[rgba(0,212,255,0.2)] rounded-[16px] p-8 text-left mb-8">
                    <h2 className="text-[#00D4FF] text-[1.25rem] mb-5 font-semibold">What Happens Next</h2>

                    <div className="flex gap-4 mb-5">
                        <div className="w-8 h-8 bg-[#00D4FF] text-[#0A0A0F] rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                        <div>
                            <h3 className="text-base font-semibold mb-1">Confirmation Email</h3>
                            <p className="text-[#64748B] text-sm m-0">Check your inbox for order details and receipt</p>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-5">
                        <div className="w-8 h-8 bg-[#00D4FF] text-[#0A0A0F] rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                            <h3 className="text-base font-semibold mb-1">Consultation Call</h3>
                            <p className="text-[#64748B] text-sm m-0">We'll contact you within 1 hour to schedule setup</p>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-5">
                        <div className="w-8 h-8 bg-[#00D4FF] text-[#0A0A0F] rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                        <div>
                            <h3 className="text-base font-semibold mb-1">Custom Setup</h3>
                            <p className="text-[#64748B] text-sm m-0">We'll configure your automation to your exact needs</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-8 h-8 bg-[#00D4FF] text-[#0A0A0F] rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                        <div>
                            <h3 className="text-base font-semibold mb-1">Go Live</h3>
                            <p className="text-[#64748B] text-sm m-0">Your automation starts working 24/7 for your business</p>
                        </div>
                    </div>
                </div>

                <Link to="/" className="inline-block px-8 py-4 bg-[#00D4FF] text-[#0A0A0F] no-underline rounded-[10px] font-semibold hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(0,212,255,0.4)] transition-all">
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
