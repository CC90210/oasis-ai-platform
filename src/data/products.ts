import {
    MessageSquare, Star, Mail, Calendar, Target, Phone, Layers, Zap,
    Database, Users, BarChart3, Share2, Box, FileText, ThumbsUp
} from 'lucide-react';

export const agents = {
    'chat-widget': {
        title: 'Website Chat Widget Agent',
        price: 997,
        description: '24/7 AI-powered chat assistant that qualifies leads and books appointments.',
        icon: MessageSquare,
        features: ['Custom Knowledge Base', 'Lead Capture', '24/7 Availability'],
        roi: 'Increase leads by 40%'
    },
    'google-reviews': {
        title: 'Social Media & Review Manager',
        price: 797,
        description: 'Automatically monitors and responds to reviews and manages social engagement.',
        icon: Star,
        features: ['Auto-Response', 'Sentiment Analysis', 'Reputation Monitoring'],
        roi: 'Save 5+ hours/week'
    },
    'email-automation': {
        title: 'Email Intelligence Processor',
        price: 1297,
        description: 'Intelligent email processing, categorization, drafting, and follow-ups.',
        icon: Mail,
        features: ['Inbox Management', 'Auto-Drafting', 'Priority Sorting'],
        roi: 'Save 15+ hours/week'
    },
    'appointment-booking': {
        title: 'Appointment & Booking Automation',
        price: 1197,
        description: 'Handles scheduling requests, reminders, and calendar syncing automatically.',
        icon: Calendar,
        features: ['Calendar Sync', 'Reminders', 'Rescheduling Handling'],
        roi: 'Reduce no-shows by 70%'
    },
    'lead-capture': {
        title: 'Lead Generation Automation',
        price: 1197,
        description: 'Engages visitors across channels, qualifies them, and routes hot leads to sales.',
        icon: Target,
        features: ['Lead Scoring', 'CRM Integration', 'Instant Notifications'],
        roi: '340% increase in qualified leads'
    },
    'voice-ai': {
        title: 'Voice AI Phone Agent',
        price: 2497,
        description: 'Human-like voice agent for inbound/outbound calls and support.',
        icon: Phone,
        features: ['Natural Voice', 'Call Routing', 'Transcription'],
        roi: 'Handle 1000+ calls simultaneously'
    },
    'customer-support': {
        title: 'Customer Support AI Agent',
        price: 1497,
        description: '24/7 intelligent chatbot support for ticket routing and FAQ automation.',
        icon: Users,
        features: ['Ticket Routing', 'FAQ Automation', 'Knowledge Base Integration'],
        roi: 'Reduce support costs by 60%'
    },
    'google-review-agent': {
        title: 'Google Review Agent',
        price: 797,
        description: 'Dedicated agent to skyrocket your Google business ratings and manage reputation.',
        icon: ThumbsUp,
        features: ['Review Generation', 'Smart Responses', 'Rating Growth'],
        roi: 'Boost rating to 4.9 stars'
    },
    'revenue-ops': {
        title: 'Revenue Operations Automation',
        price: 1997,
        description: 'Automate sales pipelines, invoicing, and payment processing.',
        icon: BarChart3,
        features: ['Pipeline Automation', 'Invoice Processing', 'Revenue Tracking'],
        roi: 'Accelerate cash flow by 45%'
    },
    'data-entry': {
        title: 'Data Entry & Document Processing',
        price: 1297,
        description: 'Automated data extraction, form processing, and database synchronization.',
        icon: Database,
        features: ['Data Extraction', 'Form Validation', 'Database Sync'],
        roi: 'Eliminate 90% of manual entry'
    },
    'multi-channel': {
        title: 'Multi-Channel Communication Hub',
        price: 1797,
        description: 'Unified inbox for email, SMS, chat, and social with automated routing.',
        icon: Share2,
        features: ['Unified Inbox', 'Response Routing', 'History Tracking'],
        roi: 'Never miss a customer message'
    },
    'inventory-management': {
        title: 'Inventory & Order Management',
        price: 1597,
        description: 'Monitor stock levels and automate reorder triggers and processing.',
        icon: Box,
        features: ['Stock Monitoring', 'Auto-Reorder', 'Order Processing'],
        roi: 'Reduce stockouts by 85%'
    },
    'hr-onboarding': {
        title: 'HR & Onboarding Automation',
        price: 1497,
        description: 'Streamline employee onboarding, document collection, and training.',
        icon: FileText,
        features: ['Onboarding Workflows', 'Document Collection', 'Training Sequences'],
        roi: 'Cut onboarding time by 50%'
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
        price: 5000,
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
