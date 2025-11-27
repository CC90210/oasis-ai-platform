import { useState } from 'react';

interface FormData {
    [key: string]: string;
}

interface UseFormSubmitReturn {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    submitForm: (formType: string, data: FormData) => Promise<void>;
    reset: () => void;
}

const WEBHOOK_URL = 'https://n8n.srv993801.hstgr.cloud/webhook/3f5d51e4-87b8-4cb2-a105-914213892b4a';

// Rate limiting
let lastSubmitTime = 0;
const MIN_SUBMIT_INTERVAL = 3000; // 3 seconds

function canSubmit(): boolean {
    const now = Date.now();
    if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
        return false;
    }
    lastSubmitTime = now;
    return true;
}

function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .substring(0, 5000); // Limit length
}

export function useFormSubmit(): UseFormSubmitReturn {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitForm = async (formType: string, data: FormData) => {
        // Rate limiting check
        if (!canSubmit()) {
            setIsError(true);
            setErrorMessage('Please wait a moment before submitting again.');
            return;
        }

        // Check honeypot (if present)
        if (data.website && data.website.length > 0) {
            console.log('Bot detected');
            return;
        }

        setIsSubmitting(true);
        setIsError(false);
        setErrorMessage('');

        try {
            // Sanitize inputs
            const sanitizedData: FormData = {};
            Object.keys(data).forEach(key => {
                if (data[key]) {
                    sanitizedData[key] = sanitizeInput(data[key]);
                }
            });

            const payload = {
                formType,
                ...sanitizedData,
                submittedAt: new Date().toISOString(),
                page: window.location.pathname,
                referrer: document.referrer || 'direct'
            };

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            setIsSuccess(true);

            // Track conversion (if analytics present)
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'form_submit', {
                    form_type: formType,
                    page: window.location.pathname
                });
            }

        } catch (error) {
            setIsError(true);
            setErrorMessage('Something went wrong. Please try again or email us at oasisaisolutions@gmail.com');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setIsSuccess(false);
        setIsError(false);
        setErrorMessage('');
    };

    return { isSubmitting, isSuccess, isError, errorMessage, submitForm, reset };
}
