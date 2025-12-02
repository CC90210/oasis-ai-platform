import { MessageSquare, Star, Mail, Calendar, Target, Phone, Layers, Zap } from 'lucide-react';

export const agents = {
    'chat-widget': {
        title: 'Website Chat Widget Agent',
        price: 797,
        description: '24/7 AI-powered chat assistant that qualifies leads and books appointments.',
        icon: MessageSquare,
        features: ['Custom Knowledge Base', 'Lead Capture', '24/7 Availability']
    },
    'google-reviews': {
        title: 'Google Review Manager',
        price: 597,
        description: 'Automatically monitors and responds to Google reviews with your brand voice.',
        icon: Star,
        features: ['Auto-Response', 'Sentiment Analysis', 'Negative Review Alerts']
    },
    'email-automation': {
        title: 'Email Automation Agent',
        price: 997,
        description: 'Intelligent email processing, categorization, and drafting.',
        icon: Mail,
        features: ['Inbox Management', 'Auto-Drafting', 'Priority Sorting']
    },
    'appointment-booking': {
        title: 'Appointment Setter',
        price: 897,
        description: 'Handles scheduling requests and syncs with your calendar automatically.',
        icon: Calendar,
        features: ['Calendar Sync', 'Reminders', 'Rescheduling Handling']
    },
    'lead-capture': {
        title: 'Lead Capture & Qualify',
        price: 897,
        description: 'Engages visitors, qualifies them, and routes hot leads to sales.',
        icon: Target,
        features: ['Lead Scoring', 'CRM Integration', 'Instant Notifications']
    },
    'voice-ai': {
        title: 'Voice AI Phone Agent',
        price: 2497,
        description: 'Human-like voice agent for inbound/outbound calls.',
        icon: Phone,
        features: ['Natural Voice', 'Call Routing', 'Transcription']
    }
};

export const bundles = {
    'launchpad': {
        title: 'OASIS Launchpad',
        price: 997,
        description: 'Get started with one custom workflow and essential automation.',
        icon: Zap,
        features: ['1 Custom Workflow', 'Website Chat Widget', '30 Days Support']
    },
    'integration-suite': {
        title: 'Integration Suite',
        price: 3500,
        description: 'Comprehensive multi-channel automation for scaling businesses.',
        icon: Layers,
        features: ['3-5 Custom Agents', 'Voice AI + Chat', 'CRM Integration', '90 Days Support']
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
