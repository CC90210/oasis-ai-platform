import { LucideIcon, MessageSquare, Phone, Mail, Calendar, Database, Star, Share2, DollarSign, FileText, Users, Rocket, Zap, Briefcase, Building2 } from 'lucide-react';

export interface Tier {
    name: string;
    price: number;
    description?: string;
    features: string[];
    isPopular?: boolean;
}

export interface Automation {
    id: string;
    name: string;
    icon: LucideIcon;
    setupFee: number;
    description: string;
    tag: string;
    monthlyFrom: number;
    features: string[];
    tiers: Tier[];
}

export interface Bundle {
    name: string;
    price: number;
    isOneTime: boolean;
    tag?: string;
    description?: string;
    features: string[];
    ctaText: string;
    roiHighlight?: string;
    idealFor?: string;
}

export const BUNDLES: Bundle[] = [
    {
        name: "OASIS Launchpad",
        price: 1497,
        isOneTime: true,
        tag: "Best for getting started",
        features: [
            "90-minute discovery consultation",
            "Custom automation roadmap",
            "1 automation of your choice",
            "First month included",
            "7-day priority implementation",
            "Monthly ROI documentation"
        ],
        ctaText: "Get Started",
        idealFor: "Small businesses testing automation for the first time."
    },
    {
        name: "Integration Suite",
        price: 4997,
        isOneTime: true,
        tag: "MOST POPULAR",
        features: [
            "Half-day strategy workshop",
            "3 core automations (client's choice)",
            "CRM integration setup",
            "Cross-automation data flows",
            "First 2 months of subscription included",
            "Dedicated implementation manager",
            "Bi-weekly optimization calls (first 90 days)",
            "Monthly ROI documentation"
        ],
        ctaText: "Book Consultation",
        roiHighlight: "Average 312% ROI within 90 days or we rebuild for free."
    }
];

export const AUTOMATIONS: Automation[] = [
    {
        id: "website-chat",
        name: "Website Chat Automation",
        icon: MessageSquare,
        setupFee: 997,
        description: "24/7 intelligent chat that captures leads and answers questions.",
        tag: "Converts 3x more visitors",
        monthlyFrom: 149,
        features: ["AI-trained on your business", "Lead qualification", "CRM sync", "Human handoff"],
        tiers: [
            {
                name: "Starter",
                price: 149,
                features: ["Up to 500 conversations/month", "1 website", "Basic analytics", "Email support"]
            },
            {
                name: "Professional",
                price: 297,
                features: ["Up to 2,000 conversations/month", "3 websites", "Lead scoring", "CRM sync", "Priority support"]
            },
            {
                name: "Business",
                price: 497,
                features: ["Unlimited conversations", "10 websites", "Advanced analytics", "Custom integrations", "Dedicated support"]
            }
        ]
    },
    {
        id: "voice-ai",
        name: "Voice AI Automation",
        icon: Phone,
        setupFee: 1497,
        description: "Never miss a call. AI receptionist that books appointments and answers questions.",
        tag: "Handles 500+ calls/month",
        monthlyFrom: 197,
        features: ["Custom voice persona", "Call transcription", "SMS follow-ups", "Appointment booking"],
        tiers: [
            {
                name: "Starter",
                price: 197,
                features: ["200 minutes/month", "100 SMS", "Basic call routing", "Voicemail transcription"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["750 minutes/month", "500 SMS", "Call transcription", "CRM integration", "5 workflow automations"],
                isPopular: true
            },
            {
                name: "Business",
                price: 547,
                features: ["2,000 minutes/month", "1,500 SMS", "Advanced analytics", "Multi-location routing", "Priority support"]
            }
        ]
    },
    {
        id: "email-automation", // Changed ID to match prompt keys if unique, but prompt used 'email'. Will align in Page.
        name: "Email Automation",
        icon: Mail,
        setupFee: 997,
        description: "Categorize, draft, and route emails automatically. Inbox zero on autopilot.",
        tag: "Saves 15+ hours/week",
        monthlyFrom: 149,
        features: ["Smart categorization", "Auto-drafting", "Priority flagging", "Human-in-loop"],
        tiers: [
            {
                name: "Starter",
                price: 149,
                features: ["500 emails/month", "1 inbox", "Auto-categorization", "Draft responses"]
            },
            {
                name: "Professional",
                price: 297,
                features: ["2,000 emails/month", "3 inboxes", "Sentiment analysis", "CRM sync", "Follow-up sequences"]
            },
            {
                name: "Business",
                price: 497,
                features: ["Unlimited emails", "Unlimited inboxes", "Advanced workflows", "Custom integrations", "Dedicated support"]
            }
        ]
    },
    {
        id: "appointment-booking",
        name: "Appointment & Booking Automation",
        icon: Calendar,
        setupFee: 897,
        description: "Automated scheduling with zero double-bookings or no-shows.",
        tag: "Reduces no-shows by 60%",
        monthlyFrom: 149,
        features: ["Calendar sync", "SMS reminders", "Rescheduling flows", "Waitlist management"],
        tiers: [
            {
                name: "Starter",
                price: 149,
                features: ["100 bookings/month", "Calendar sync", "SMS reminders", "Rescheduling flows"]
            },
            {
                name: "Professional",
                price: 297,
                features: ["500 bookings/month", "Multi-calendar", "CRM sync", "No-show reduction"]
            },
            {
                name: "Business",
                price: 497,
                features: ["Unlimited bookings", "Team calendars", "Resource allocation", "Custom workflows"]
            }
        ]
    },
    {
        id: "lead-generation",
        name: "Lead Generation Automation",
        icon: Database,
        setupFee: 1497,
        description: "Find, enrich, and qualify leads on autopilot.",
        tag: "1000+ qualified leads/month",
        monthlyFrom: 197,
        features: ["Multi-source scraping", "Data enrichment", "Lead scoring", "CRM population"],
        tiers: [
            {
                name: "Starter",
                price: 197,
                features: ["200 leads/month", "Multi-source scraping", "Data enrichment", "Basic CRM sync"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["1,000 leads/month", "Lead scoring", "Hot lead alerts", "Pipeline tracking"]
            },
            {
                name: "Business",
                price: 547,
                features: ["Unlimited leads", "Advanced scoring", "Custom workflows", "Dedicated support"]
            }
        ]
    },
    {
        id: "google-reviews", // Prompt uses 'google-review'. Will handle mapping in page.
        name: "Google Review Automation",
        icon: Star,
        setupFee: 797,
        description: "Automate review requests and respond to reviews intelligently.",
        tag: "Boost ratings by 1.5 stars",
        monthlyFrom: 149,
        features: ["Automated review requests", "AI responses", "Sentiment monitoring", "Multi-location"],
        tiers: [
            {
                name: "Starter",
                price: 149,
                features: ["1 location", "Automated review requests", "AI responses", "Weekly reports"]
            },
            {
                name: "Professional",
                price: 297,
                features: ["5 locations", "Sentiment analysis", "Smart AI responses", "Review monitoring"]
            },
            {
                name: "Business",
                price: 497,
                features: ["Unlimited locations", "Competitor monitoring", "Advanced analytics", "Reputation scoring"]
            }
        ]
    },
    {
        id: "social-media",
        name: "Social Media Content Automation",
        icon: Share2,
        setupFee: 1197,
        description: "AI-generated content, scheduled and posted across all platforms.",
        tag: "60 posts/month on autopilot",
        monthlyFrom: 197,
        features: ["AI copywriting", "Cross-platform posting", "Optimal timing", "Performance tracking"],
        tiers: [
            {
                name: "Starter",
                price: 197,
                features: ["3 platforms", "30 posts/month", "AI captions", "Content calendar"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["5 platforms", "90 posts/month", "Engagement automation", "Hashtag optimization"]
            },
            {
                name: "Business",
                price: 547,
                features: ["Unlimited platforms", "Unlimited posts", "Trend analysis", "Team collaboration"]
            }
        ]
    },
    {
        id: "revenue-operations", // Prompt 'revenue-ops'
        name: "Revenue Operations Automation",
        icon: DollarSign,
        setupFee: 1497,
        description: "Automated invoicing, payment reminders, and pipeline management.",
        tag: "Collect payments 40% faster",
        monthlyFrom: 197,
        features: ["Invoice generation", "Payment reminders", "Pipeline automation", "Revenue reporting"],
        tiers: [
            {
                name: "Starter",
                price: 197,
                features: ["50 invoices/month", "Auto-generation", "Payment reminders", "Basic reporting"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["200 invoices/month", "Pipeline tracking", "Revenue forecasting", "CRM sync"]
            },
            {
                name: "Business",
                price: 547,
                features: ["Unlimited invoices", "Advanced analytics", "Multi-entity", "CFO dashboards"]
            }
        ]
    },
    {
        id: "document-processing",
        name: "Data Entry & Document Processing",
        icon: FileText,
        setupFee: 1697,
        description: "Extract data from documents and build searchable knowledge bases.",
        tag: "Process 500+ docs/month",
        monthlyFrom: 197,
        features: ["PDF/image OCR", "Data extraction", "Knowledge base (RAG)", "Database sync"],
        tiers: [
            {
                name: "Starter",
                price: 197,
                features: ["100 documents", "PDF/image OCR", "Basic search", "Data extraction"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["500 documents", "Semantic search", "AI Q&A", "Database integrations"]
            },
            {
                name: "Business",
                price: 547,
                features: ["Unlimited documents", "Advanced RAG", "Custom AI training", "API access"]
            }
        ]
    },
    {
        id: "hr-onboarding",
        name: "HR & Onboarding Automation",
        icon: Users,
        setupFee: 1497,
        description: "Automate hiring paperwork, training, and employee onboarding.",
        tag: "Onboard employees 5x faster",
        monthlyFrom: 197,
        features: ["Document collection", "Training sequences", "Task automation", "Compliance tracking"],
        tiers: [
            {
                name: "Starter",
                price: 197,
                features: ["10 hires/month", "Document collection", "Training sequences", "Task checklists"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["5 hires/month", "Compliance tracking", "HRIS integration", "Performance workflows"]
            },
            {
                name: "Business",
                price: 547,
                features: ["Unlimited hires", "Multi-department", "Advanced compliance", "Custom integrations"]
            }
        ]
    }
];

export const COMMON_INCLUSIONS = [
    "Personalized setup consultation (within 1 hour)",
    "Custom configuration for your business",
    "Monthly ROI documentation & reporting",
    "Ongoing support & optimization",
    "No long-term contracts"
];

// ============================================
// SHARED CHECKOUT CONSTANTS
// ============================================

export const PAYPAL_PLANS = {
    'website-chat': {
        starter: 'P-3MU772138J745370HNFBORQQ',
        professional: 'P-34X70663DW975844ENFBOTLY',
        business: 'P-4N848268TU200611TNFBOULA'
    },
    'voice-ai': {
        starter: 'P-8AA36889FE4145123NFBOVNY',
        professional: 'P-6GW71565GV6872430NFBOWLA',
        business: 'P-3M350623LL174160ANFBOXHQ'
    },
    'email-automation': {
        starter: 'P-38U955341J3788902NFBOY2I',
        professional: 'P-6EC32104UL148643DNFBO2DY',
        business: 'P-3T256879KB967200YNFBO3BI'
    },
    'google-reviews': {
        starter: 'P-0C689255MH1942725NFBO35Q',
        professional: 'P-4DX979653S442763WNFBO44A',
        business: 'P-0DH09386DL357525PNFBO5VA'
    },
    'appointment-booking': {
        starter: 'P-10H56950L98762244NFBO6QA',
        professional: 'P-9MR83590K0954492VNFBPAUA',
        business: 'P-8HH62401LB383442HNFBPBWI'
    },
    'lead-generation': {
        starter: 'P-3R38681176137723ENFBPDBA',
        professional: 'P-4FW362845Y445354GNFBPE2I',
        business: 'P-4L012312D7266721CNFBPFXA'
    },
    'social-media': {
        starter: 'P-8MG15398V65559146NFBPGWQ',
        professional: 'P-9KP89996T09139046NFBPHWI',
        business: 'P-2DE59570SY590582ENFBPIUI'
    },
    'revenue-operations': {
        starter: 'P-83574318L54780141NFBPJQA',
        professional: 'P-6VL47228M50625940NFBPKQI',
        business: 'P-1T502693V7759174XNFBPLJI'
    },
    'document-processing': {
        starter: 'P-0LA414447U601032LNFBPMIA',
        professional: 'P-8FG34938UG3911643NFBPNDI',
        business: 'P-3C3195031M3359345NFBPOGQ'
    },
    'hr-onboarding': {
        starter: 'P-03P5988802602403ANFBPPHA',
        professional: 'P-7GC16284GR277112BNFBPQAA',
        business: 'P-7SG838516L967791YNFBPQ2I'
    }
} as const;

export const CHECKOUT_PRICING = {
    'website-chat': { setup: 997, monthly: { starter: 149, professional: 297, business: 497 } },
    'voice-ai': { setup: 1497, monthly: { starter: 197, professional: 347, business: 547 } },
    'email-automation': { setup: 997, monthly: { starter: 149, professional: 297, business: 497 } },
    'google-reviews': { setup: 797, monthly: { starter: 149, professional: 297, business: 497 } },
    'appointment-booking': { setup: 897, monthly: { starter: 149, professional: 297, business: 497 } },
    'lead-generation': { setup: 1497, monthly: { starter: 197, professional: 347, business: 547 } },
    'social-media': { setup: 1197, monthly: { starter: 197, professional: 347, business: 547 } },
    'revenue-operations': { setup: 1497, monthly: { starter: 197, professional: 347, business: 547 } },
    'document-processing': { setup: 1697, monthly: { starter: 197, professional: 347, business: 547 } },
    'hr-onboarding': { setup: 1497, monthly: { starter: 197, professional: 347, business: 547 } }
} as const;

export const CHECKOUT_FEATURES = {
    'website-chat': {
        starter: ['Up to 500 conversations/month', '1 website', 'Basic analytics', 'Email support'],
        professional: ['Up to 2,000 conversations/month', '3 websites', 'Lead scoring', 'CRM sync', 'Priority support'],
        business: ['Unlimited conversations', '10 websites', 'Advanced analytics', 'Custom integrations', 'Dedicated support']
    },
    'voice-ai': {
        starter: ['200 minutes/month', '100 SMS', 'Basic call routing', 'Voicemail transcription'],
        professional: ['750 minutes/month', '500 SMS', 'Call transcription', 'CRM integration', '5 workflow automations'],
        business: ['2,000 minutes/month', '1,500 SMS', 'Advanced analytics', 'Multi-location routing', 'Priority support']
    },
    'email-automation': {
        starter: ['500 emails/month', '1 inbox', 'Auto-categorization', 'Draft responses'],
        professional: ['2,000 emails/month', '3 inboxes', 'Sentiment analysis', 'CRM sync', 'Follow-up sequences'],
        business: ['Unlimited emails', 'Unlimited inboxes', 'Advanced workflows', 'Custom integrations', 'Dedicated support']
    },
    'google-reviews': {
        starter: ['1 location', 'Automated review requests', 'AI responses', 'Weekly reports'],
        professional: ['5 locations', 'Sentiment analysis', 'Smart AI responses', 'Review monitoring'],
        business: ['Unlimited locations', 'Competitor monitoring', 'Advanced analytics', 'Reputation scoring']
    },
    'appointment-booking': {
        starter: ['100 bookings/month', 'Calendar sync', 'SMS reminders', 'Rescheduling flows'],
        professional: ['500 bookings/month', 'Multi-calendar', 'CRM sync', 'No-show reduction'],
        business: ['Unlimited bookings', 'Team calendars', 'Resource allocation', 'Custom workflows']
    },
    'lead-generation': {
        starter: ['200 leads/month', 'Multi-source scraping', 'Data enrichment', 'Basic CRM sync'],
        professional: ['1,000 leads/month', 'Lead scoring', 'Hot lead alerts', 'Pipeline tracking'],
        business: ['Unlimited leads', 'Advanced scoring', 'Custom workflows', 'Dedicated support']
    },
    'social-media': {
        starter: ['3 platforms', '30 posts/month', 'AI captions', 'Content calendar'],
        professional: ['5 platforms', '90 posts/month', 'Engagement automation', 'Hashtag optimization'],
        business: ['Unlimited platforms', 'Unlimited posts', 'Trend analysis', 'Team collaboration']
    },
    'revenue-operations': {
        starter: ['50 invoices/month', 'Auto-generation', 'Payment reminders', 'Basic reporting'],
        professional: ['200 invoices/month', 'Pipeline tracking', 'Revenue forecasting', 'CRM sync'],
        business: ['Unlimited invoices', 'Advanced analytics', 'Multi-entity', 'CFO dashboards']
    },
    'document-processing': {
        starter: ['100 documents', 'PDF/image OCR', 'Basic search', 'Data extraction'],
        professional: ['500 documents', 'Semantic search', 'AI Q&A', 'Database integrations'],
        business: ['Unlimited documents', 'Advanced RAG', 'Custom AI training', 'API access']
    },
    'hr-onboarding': {
        starter: ['10 hires/month', 'Document collection', 'Training sequences', 'Task checklists'],
        professional: ['5 hires/month', 'Compliance tracking', 'HRIS integration', 'Performance workflows'],
        business: ['Unlimited hires', 'Multi-department', 'Advanced compliance', 'Custom integrations']
    }
} as const;
