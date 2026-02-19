export const BUNDLES = {
    launchpad: {
        id: 'launchpad',
        name: 'OASIS Launchpad',
        tag: 'BEST FOR GETTING STARTED',
        description: 'Best for getting started. Includes 90-min discovery consultation, custom automation roadmap, 1 automation of your choice, first month included, 7-day priority implementation, and monthly ROI documentation.',
        setupFee: 1497,
        monthlyFee: 347,
        features: [
            '90-minute discovery consultation',
            'Custom automation roadmap',
            '1 automation of your choice',
            'First month included',
            '7-day priority implementation',
            'Monthly ROI documentation'
        ],
        idealFor: 'Small businesses testing automation for the first time',
        cta: 'Get Started'
    },
    integrationSuite: {
        id: 'integration-suite',
        name: 'Integration Suite',
        tag: 'MOST POPULAR',
        description: 'Most popular choice. Half-day strategy workshop, 3 core automations, CRM integration setup, cross-automation data flows, first 2 months included, dedicated implementation manager, bi-weekly optimization calls.',
        setupFee: 4997,
        monthlyFee: 497,
        features: [
            'Half-day strategy workshop',
            '3 core automations (client\'s choice)',
            'CRM integration setup',
            'Cross-automation data flows',
            'First 2 months of subscription included',
            'Dedicated implementation manager',
            'Bi-weekly optimization calls (first 90 days)',
            'Monthly ROI documentation'
        ],
        roi: 'Average 312% ROI within 90 days or we rebuild for free',
        idealFor: 'Growing businesses ready to scale operations',
        cta: 'Book Consultation'
    }
};

export const STANDARD_AUTOMATIONS = {
    websiteChat: {
        id: 'website-chat',
        name: 'Website Chat Automation',
        description: '24/7 intelligent chat that captures leads and answers questions.',
        icon: 'MessageSquare',
        setupFee: 997,
        tiers: {
            starter: { price: 149, name: 'Starter' },
            professional: { price: 297, name: 'Professional' },
            business: { price: 497, name: 'Business' }
        },
        highlight: 'Converts 3x more visitors',
        features: [
            'AI-trained on your business',
            'Lead qualification',
            'CRM sync',
            'Human handoff'
        ]
    },
    email: {
        id: 'email',
        name: 'Email Automation',
        description: 'Categorize, draft, and route emails automatically. Inbox zero on autopilot.',
        icon: 'Mail',
        setupFee: 997,
        tiers: {
            starter: { price: 149, name: 'Starter' },
            professional: { price: 297, name: 'Professional' },
            business: { price: 497, name: 'Business' }
        },
        highlight: 'Saves 15+ hours/week',
        features: [
            'Smart categorization',
            'Auto-drafting',
            'Priority flagging',
            'Human-in-loop'
        ]
    },
    appointmentBooking: {
        id: 'appointment-booking',
        name: 'Appointment & Booking Automation',
        description: 'Automated scheduling with zero double-bookings or no-shows.',
        icon: 'Calendar',
        setupFee: 897,
        tiers: {
            starter: { price: 149, name: 'Starter' },
            professional: { price: 297, name: 'Professional' },
            business: { price: 497, name: 'Business' }
        },
        highlight: 'Reduces no-shows by 60%',
        features: [
            'Calendar sync',
            'SMS reminders',
            'Rescheduling flows',
            'Waitlist management'
        ]
    },
    googleReview: {
        id: 'google-review',
        name: 'Google Review Automation',
        description: 'Automate review requests and respond to reviews intelligently.',
        icon: 'Star',
        setupFee: 797,
        tiers: {
            starter: { price: 149, name: 'Starter' },
            professional: { price: 297, name: 'Professional' },
            business: { price: 497, name: 'Business' }
        },
        highlight: 'Boost ratings by 1.5 stars',
        features: [
            'Automated review requests',
            'AI responses',
            'Sentiment monitoring',
            'Multi-location'
        ]
    },
    invoiceHandling: {
        id: 'invoice-handling',
        name: 'Invoice Handling Automation',
        description: 'Process inbound/outbound invoices with personalized creation and tracking.',
        icon: 'Receipt',
        setupFee: 1197,
        tiers: {
            starter: { price: 149, name: 'Starter' },
            professional: { price: 297, name: 'Professional' },
            business: { price: 497, name: 'Business' }
        },
        highlight: 'Zero manual data entry',
        features: [
            'Inbound invoice processing',
            'Personalized invoice creation',
            'Payment tracking',
            'Automatic reconciliation'
        ]
    }
};

export const PREMIUM_AUTOMATIONS = {
    voiceAI: {
        id: 'voice-ai',
        name: 'Voice AI Automation',
        description: 'Never miss a call. AI receptionist that books appointments and answers questions.',
        icon: 'Phone',
        setupFee: 1497,
        tiers: {
            starter: { price: 197, name: 'Starter' },
            professional: { price: 347, name: 'Professional' },
            business: { price: 547, name: 'Business' }
        },
        highlight: 'Handles 500+ calls/month',
        features: [
            'Custom voice persona',
            'Call transcription',
            'SMS follow-ups',
            'Appointment booking'
        ]
    },
    leadGeneration: {
        id: 'lead-generation',
        name: 'Lead Generation Automation',
        description: 'Find, enrich, and qualify leads on autopilot.',
        icon: 'Database',
        setupFee: 1497,
        tiers: {
            starter: { price: 197, name: 'Starter' },
            professional: { price: 347, name: 'Professional' },
            business: { price: 547, name: 'Business' }
        },
        highlight: '1000+ qualified leads/month',
        features: [
            'Multi-source scraping',
            'Data enrichment',
            'Lead scoring',
            'CRM population'
        ]
    },
    socialMedia: {
        id: 'social-media',
        name: 'Social Media Content Automation',
        description: 'AI-generated content, scheduled and posted across all platforms.',
        icon: 'Share2',
        setupFee: 1197,
        tiers: {
            starter: { price: 197, name: 'Starter' },
            professional: { price: 347, name: 'Professional' },
            business: { price: 547, name: 'Business' }
        },
        highlight: '60 posts/month on autopilot',
        features: [
            'AI copywriting',
            'Cross-platform posting',
            'Optimal timing',
            'Performance tracking'
        ]
    },
    revenueOps: {
        id: 'revenue-ops',
        name: 'Revenue Operations Automation',
        description: 'Automated invoicing, payment reminders, and pipeline management.',
        icon: 'DollarSign',
        setupFee: 1497,
        tiers: {
            starter: { price: 197, name: 'Starter' },
            professional: { price: 347, name: 'Professional' },
            business: { price: 547, name: 'Business' }
        },
        highlight: 'Collect payments 40% faster',
        features: [
            'Invoice generation',
            'Payment reminders',
            'Pipeline automation',
            'Revenue reporting'
        ]
    },
    documentProcessing: {
        id: 'document-processing',
        name: 'Data Entry & Document Processing',
        description: 'Extract data from documents and build searchable knowledge bases.',
        icon: 'FileText',
        setupFee: 1697,
        tiers: {
            starter: { price: 197, name: 'Starter' },
            professional: { price: 347, name: 'Professional' },
            business: { price: 547, name: 'Business' }
        },
        highlight: 'Process 500+ docs/month',
        features: [
            'PDF/image OCR',
            'Data extraction',
            'Knowledge base (RAG)',
            'Database sync'
        ]
    },
    hrOnboarding: {
        id: 'hr-onboarding',
        name: 'HR & Onboarding Automation',
        description: 'Automate hiring paperwork, training, and employee onboarding.',
        icon: 'Users',
        setupFee: 1497,
        tiers: {
            starter: { price: 197, name: 'Starter' },
            professional: { price: 347, name: 'Professional' },
            business: { price: 547, name: 'Business' }
        },
        highlight: 'Onboard employees 5x faster',
        features: [
            'Document collection',
            'Training sequences',
            'Task automation',
            'Compliance tracking'
        ]
    },
    websiteBuilding: {
        id: 'website-building',
        name: 'Website Building & Hosting',
        description: 'Custom website design, development, hosting, and maintenance.',
        icon: 'Globe',
        setupFee: 1997,
        tiers: {
            starter: { price: 197, name: 'Starter' },
            professional: { price: 347, name: 'Professional' },
            business: { price: 547, name: 'Business' }
        },
        highlight: 'Live in 14 days or less',
        features: [
            'Custom responsive design',
            'Fast secure hosting',
            'SSL certificate included',
            'Analytics dashboard'
        ]
    }
};

export const ALL_AUTOMATIONS = {
    ...STANDARD_AUTOMATIONS,
    ...PREMIUM_AUTOMATIONS
};

export type TierType = 'starter' | 'professional' | 'business';
export type CurrencyType = 'usd' | 'cad';

export interface AutomationProduct {
    id: string;
    name: string;
    description: string;
    icon: string;
    setupFee: number;
    tiers: {
        starter: { price: number; name: string };
        professional: { price: number; name: string };
        business: { price: number; name: string };
    };
    highlight: string;
    features: string[];
}

export interface BundleProduct {
    id: string;
    name: string;
    tag: string;
    description: string;
    setupFee: number;
    monthlyFee: number;
    features: string[];
    idealFor: string;
    cta: string;
    roi?: string;
}

// Helper function to get pricing
export function getAutomationPricing(
    automationId: string,
    tier: TierType
): { setupFee: number; monthlyFee: number } | null {
    const automation = ALL_AUTOMATIONS[automationId as keyof typeof ALL_AUTOMATIONS];
    if (!automation) return null;

    return {
        setupFee: automation.setupFee,
        monthlyFee: automation.tiers[tier].price
    };
}

export function getBundlePricing(
    bundleId: string
): { setupFee: number; monthlyFee: number } | null {
    const bundle = BUNDLES[bundleId as keyof typeof BUNDLES];
    if (!bundle) return null;

    return {
        setupFee: bundle.setupFee,
        monthlyFee: bundle.monthlyFee
    };
}
