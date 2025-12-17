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
                features: ["Up to 500 conversations", "1 website", "Basic analytics"]
            },
            {
                name: "Professional",
                price: 297,
                features: ["Up to 2,000 conversations", "3 websites", "Lead scoring", "CRM sync"]
            },
            {
                name: "Business",
                price: 497,
                features: ["Unlimited conversations", "10 websites", "Advanced analytics", "Priority support"]
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
                features: ["200 minutes", "100 SMS", "Basic call routing", "Standard analytics"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["750 minutes", "500 SMS", "Call transcription", "CRM integration", "5 workflow automations"],
                isPopular: true
            },
            {
                name: "Business",
                price: 547,
                features: ["2,000 minutes", "1,500 SMS", "Advanced analytics", "Priority support"]
            }
        ]
    },
    {
        id: "email-automation",
        name: "Email Intelligent Automation",
        icon: Mail,
        setupFee: 1297,
        description: "Categorize, draft, and route emails automatically. Inbox zero on autopilot.",
        tag: "Saves 15+ hours/week",
        monthlyFrom: 149,
        features: ["Smart categorization", "Auto-drafting", "Priority flagging", "Human-in-loop"],
        tiers: [
            {
                name: "Starter",
                price: 149,
                features: ["Up to 500 emails/mo", "Auto-categorization", "Draft responses"]
            },
            {
                name: "Professional",
                price: 297,
                features: ["Up to 2,500 emails/mo", "Priority flagging", "Human-in-loop workflows", "CRM sync"]
            },
            {
                name: "Business",
                price: 497,
                features: ["Up to 10,000 emails/mo", "Multi-inbox", "Advanced routing", "Sentiment analysis"]
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
                features: ["1 calendar", "100 bookings/mo", "Email confirmations"]
            },
            {
                name: "Professional",
                price: 247,
                features: ["5 calendars", "500 bookings/mo", "SMS reminders", "Rescheduling flows"]
            },
            {
                name: "Business",
                price: 397,
                features: ["Unlimited calendars", "Unlimited bookings", "Zoom/Meet integration", "Waitlist management"]
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
                features: ["250 leads/mo", "Basic enrichment", "CRM push"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["1,000 leads/mo", "Multi-source scraping", "Lead scoring", "Automated sequences"]
            },
            {
                name: "Business",
                price: 547,
                features: ["5,000 leads/mo", "Custom criteria", "Intent signals", "Multi-channel outreach"]
            }
        ]
    },
    {
        id: "google-reviews",
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
                features: ["1 location", "Automated review requests", "Response templates"]
            },
            {
                name: "Professional",
                price: 247,
                features: ["5 locations", "Sentiment analysis", "Smart response drafting", "Review monitoring"]
            },
            {
                name: "Business",
                price: 397,
                features: ["Unlimited locations", "Competitor monitoring", "Review analytics dashboard"]
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
                features: ["2 platforms", "30 posts/mo", "Content calendar", "Basic analytics"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["4 platforms", "60 posts/mo", "AI content generation", "Hashtag optimization"]
            },
            {
                name: "Business",
                price: 547,
                features: ["Unlimited platforms", "120 posts/mo", "Trend monitoring", "Engagement automation"]
            }
        ]
    },
    {
        id: "revenue-operations",
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
                features: ["Automated invoicing", "Payment reminders", "Basic reporting"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["Pipeline automation", "Quote generation", "Payment processing integration"]
            },
            {
                name: "Business",
                price: 547,
                features: ["Full revenue cycle automation", "Forecasting", "Multi-currency", "Advanced analytics"]
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
                features: ["500 documents/mo", "Basic extraction", "Searchable archive"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["2,500 documents/mo", "Structured data output", "CRM/database sync"]
            },
            {
                name: "Business",
                price: 547,
                features: ["10,000 documents/mo", "Custom extraction models", "API access"]
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
                features: ["5 employees/mo", "Document collection", "Task checklists"]
            },
            {
                name: "Professional",
                price: 347,
                features: ["20 employees/mo", "Training sequences", "Compliance tracking"]
            },
            {
                name: "Business",
                price: 547,
                features: ["Unlimited employees", "Custom workflows", "Performance tracking"]
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
