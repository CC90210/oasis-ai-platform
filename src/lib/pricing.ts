export const BUNDLES = {
    launchpad: {
        id: 'launchpad',
        name: 'OASIS Launchpad',
        tag: 'BEST FOR GETTING STARTED',
        description: 'Best for getting started. Includes 90-min discovery consultation, custom automation roadmap, 1 automation of your choice, setup, configuration, and 30 days support.',
        setupFee: 2500,
        monthlyFee: 347,
        features: [
            '90-minute discovery consultation',
            'Custom automation roadmap',
            '1 automation of your choice',
            'Setup, configuration, and deployment',
            '7-day priority implementation',
            '30 days technical support'
        ],
        idealFor: 'Small businesses testing automation for the first time',
        cta: 'Get Started'
    },
    integrationSuite: {
        id: 'integration-suite',
        name: 'Integration Suite',
        tag: 'MOST POPULAR',
        description: 'Comprehensive transformation. 3-5 custom AI agents, Voice AI + Chat, CRM integration, and 90 days of dedicated support.',
        setupFee: 5000,
        monthlyFee: 497,
        features: [
            '3-5 custom AI agents',
            'AI-powered website chat widget',
            'Voice AI phone system',
            'CRM integration and synchronization',
            '90 days optimization and support',
            'Comprehensive documentation'
        ],
        roi: 'Average 312% ROI within 90 days',
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
    leadCapture: {
        id: 'lead-capture',
        name: 'Lead Capture & Qualification Automation',
        description: 'Captures and qualifies leads 24/7 from your website and social channels.',
        icon: 'Target',
        setupFee: 1497,
        tiers: {
            starter: { price: 197, name: 'Starter' },
            professional: { price: 347, name: 'Professional' },
            business: { price: 547, name: 'Business' }
        },
        highlight: 'Zero missed opportunities',
        features: [
            'AI qualification',
            'Instant hot lead alerts',
            'CRM integration',
            'Automated follow-up'
        ]
    }
};

export const PREMIUM_AUTOMATIONS = {
    voiceAI: {
        id: 'voice-ai',
        name: 'Voice AI Phone Agent',
        description: 'AI-powered phone system that answers calls 24/7, books appointments, and qualifies leads.',
        icon: 'Phone',
        setupFee: 2497,
        tiers: {
            starter: { price: 297, name: 'Starter' },
            professional: { price: 497, name: 'Professional' },
            business: { price: 797, name: 'Business' }
        },
        highlight: 'Handles 500+ calls/month',
        features: [
            'Twilio phone setup',
            'ElevenLabs natural voice',
            'CRM integration',
            'Appointment booking'
        ]
    },
    knowledgeBase: {
        id: 'knowledge-base',
        name: 'RAG Knowledge Base Agent',
        description: 'AI agent with instant access to your company knowledge, documents, and FAQs.',
        icon: 'Database',
        setupFee: 1997,
        tiers: {
            starter: { price: 297, name: 'Starter' },
            professional: { price: 497, name: 'Professional' },
            business: { price: 797, name: 'Business' }
        },
        highlight: 'Instant source citations',
        features: [
            'Vector database setup',
            'Document ingestion',
            'Semantic search',
            'Auto-refresh sync'
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
        setupFee: 997,
        tiers: {
            starter: { price: 149, name: 'Starter' },
            professional: { price: 297, name: 'Professional' },
            business: { price: 497, name: 'Business' }
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
