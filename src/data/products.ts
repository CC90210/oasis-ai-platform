import {
    MessageSquare, Star, Mail, Calendar, Target, Phone, Layers, Zap,
    Database, Users, BarChart3, Share2, Box, FileText, ThumbsUp
} from 'lucide-react';

export const agents = {
    'website-chat': {
        title: 'Website Chat Widget Agent',
        price: 997,
        description: '24/7 AI-powered chat assistant that qualifies leads and books appointments.',
        icon: MessageSquare,
        features: ['Custom Knowledge Base', 'Lead Capture', '24/7 Availability'],
        roi: 'Increase leads by 40%'
    },
    'google-review': {
        title: 'Google Review Automation',
        price: 797,
        description: 'Automatically monitors and responds to reviews and manages social engagement.',
        icon: Star,
        features: ['Auto-Response', 'Sentiment Analysis', 'Reputation Monitoring'],
        roi: 'Save 5+ hours/week'
    },
    'email': {
        title: 'Email Automation',
        price: 997,
        description: 'Intelligent email processing, categorization, drafting, and follow-ups.',
        icon: Mail,
        features: ['Inbox Management', 'Auto-Drafting', 'Priority Sorting'],
        roi: 'Save 15+ hours/week'
    },
    'appointment-booking': {
        title: 'Appointment & Booking Automation',
        price: 897,
        description: 'Handles scheduling requests, reminders, and calendar syncing automatically.',
        icon: Calendar,
        features: ['Calendar Sync', 'Reminders', 'Rescheduling Handling'],
        roi: 'Reduce no-shows by 70%'
    },
    'lead-generation': {
        title: 'Lead Generation Automation',
        price: 1497,
        description: 'Engages visitors across channels, qualifies them, and routes hot leads to sales.',
        icon: Target,
        features: ['Lead Scoring', 'CRM Integration', 'Instant Notifications'],
        roi: '340% increase in qualified leads'
    },
    'voice-ai': {
        title: 'Voice AI Phone Agent',
        price: 1497,
        description: 'Human-like voice agent for inbound/outbound calls and support.',
        icon: Phone,
        features: ['Natural Voice', 'Call Routing', 'Transcription'],
        roi: 'Handle 1000+ calls simultaneously'
    },
    'social-media': {
        title: 'Social Media Content Automation',
        price: 1197,
        description: 'AI-generated content, scheduled and posted across all platforms.',
        icon: Share2,
        features: ['AI Copywriting', 'Cross-Platform Posting', 'Optimal Timing'],
        roi: '60 posts/month on autopilot'
    },
    'revenue-ops': {
        title: 'Revenue Operations Automation',
        price: 1497,
        description: 'Automated invoicing, payment reminders, and pipeline management.',
        icon: BarChart3,
        features: ['Pipeline Automation', 'Invoice Processing', 'Revenue Tracking'],
        roi: 'Accelerate cash flow by 45%'
    },
    'document-processing': {
        title: 'Data Entry & Document Processing',
        price: 1697,
        description: 'Automated data extraction, form processing, and database synchronization.',
        icon: Database,
        features: ['Data Extraction', 'Form Validation', 'Database Sync'],
        roi: 'Eliminate 90% of manual entry'
    },
    'hr-onboarding': {
        title: 'HR & Onboarding Automation',
        price: 1497,
        description: 'Streamline employee onboarding, document collection, and training.',
        icon: FileText,
        features: ['Onboarding Workflows', 'Document Collection', 'Training Sequences'],
        roi: 'Cut onboarding time by 50%'
    },
    'invoice-handling': {
        title: 'Invoice Handling Automation',
        price: 1197,
        description: 'Process inbound/outbound invoices with personalized creation and tracking.',
        icon: Box,
        features: ['Inbound invoice processing', 'Personalized invoice creation', 'Payment tracking'],
        roi: 'Zero manual data entry'
    },
    'website-building': {
        title: 'Website Building & Hosting',
        price: 997,
        description: 'Custom website design, development, hosting, and maintenance.',
        icon: Layers,
        features: ['Custom responsive design', 'Fast secure hosting', 'SSL certificate included'],
        roi: 'Live in 14 days or less'
    }
};

export const bundles = {
    'launchpad': {
        title: 'OASIS Launchpad',
        price: 1497,
        description: 'Get started with one custom workflow and essential automation.',
        icon: Zap,
        features: ['1 Custom Workflow', 'Website Chat Widget', '30 Days Support'],
        roi: 'Perfect for starters'
    },
    'integration-suite': {
        title: 'Integration Suite',
        price: 4997,
        description: 'Comprehensive multi-channel automation for scaling businesses.',
        icon: Layers,
        features: ['3-5 Custom Agents', 'Voice AI + Chat', 'CRM Integration', '90 Days Support'],
        roi: 'Average 312% ROI in 90 days'
    }
};

export const retainers = {
    'essentials': {
        name: 'OASIS Essentials',
        price: 297,
        description: 'Basic support & monitoring'
    },
    'standard': {
        name: 'OASIS Standard',
        price: 497,
        description: 'Priority support & optimization (Recommended)'
    },
    'priority': {
        name: 'OASIS Priority',
        price: 797,
        description: 'Dedicated account manager & premium support'
    }
};
