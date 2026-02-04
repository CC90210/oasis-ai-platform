import { supabase, AutomationLog } from './supabase';

// ============================================
// TYPES
// ============================================

export interface DashboardMetrics {
    // Core counts
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;

    // Time-based counts
    executionsThisWeek: number;
    executionsThisMonth: number;
    executionsToday: number;

    // Calculated metrics
    successRate: number;
    hoursSaved: number;
    moneySaved: number;

    // Comparison metrics
    avgResponseTime: string;
    costReduction: number;
    humanCostEquivalent: number;
}

export interface AutomationMetrics {
    automationId: string;
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    reliability: number;
    lastRunAt: string | null;
    runsThisWeek: number;
    avgExecutionTime: number;
}

// ============================================
// CONSTANTS - Calculation Parameters
// ============================================

export const METRICS_CONFIG = {
    // Time saved per successful execution (in hours)
    HOURS_SAVED_PER_EXECUTION: 0.25, // 15 minutes

    // Hourly rate for cost calculations
    HOURLY_RATE: 25, // $25/hour

    // Human agent comparison metrics
    HUMAN_AVG_RESPONSE_TIME_HOURS: 24,
    AI_AVG_RESPONSE_TIME_MINUTES: 2,

    // Cost reduction calculation
    HUMAN_COST_PER_TICKET: 15, // $15 per ticket for human agent
    AI_COST_PER_TICKET: 2, // $2 per ticket for AI

    // Monthly human cost equivalent
    HUMAN_MONTHLY_SALARY: 4000, // $4,000/month for human employee
};

// ============================================
// DATE HELPERS
// ============================================

const getStartOfWeek = (): Date => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
};

const getStartOfMonth = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
};

const getStartOfToday = (): Date => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
};

// ============================================
// CORE METRICS FUNCTIONS
// ============================================

/**
 * Fetch all metrics for the current user's dashboard
 * This is the SINGLE SOURCE OF TRUTH for all dashboard metrics
 */
export async function fetchDashboardMetrics(userId: string): Promise<DashboardMetrics> {
    // Fetch ALL logs for this user (single query for consistency)
    const { data: allLogs, error } = await supabase
        .from('automation_logs')
        .select('id, status, created_at, metadata')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching metrics:', error);
        throw error;
    }

    const logs = allLogs || [];

    // Calculate all metrics from this single dataset
    const totalExecutions = logs.length;
    const successfulExecutions = logs.filter(l => l.status === 'success').length;
    const failedExecutions = logs.filter(l => l.status === 'error').length;

    // Time-based filtering
    const startOfWeek = getStartOfWeek();
    const startOfMonth = getStartOfMonth();
    const startOfToday = getStartOfToday();

    const executionsThisWeek = logs.filter(l => new Date(l.created_at) >= startOfWeek).length;
    const executionsThisMonth = logs.filter(l => new Date(l.created_at) >= startOfMonth).length;
    const executionsToday = logs.filter(l => new Date(l.created_at) >= startOfToday).length;

    // Calculated metrics
    const successRate = totalExecutions > 0
        ? Math.round((successfulExecutions / totalExecutions) * 100)
        : 100;

    const hoursSaved = Math.round(successfulExecutions * METRICS_CONFIG.HOURS_SAVED_PER_EXECUTION * 10) / 10;
    const moneySaved = Math.round(hoursSaved * METRICS_CONFIG.HOURLY_RATE);

    // Cost reduction percentage
    const humanCost = totalExecutions * METRICS_CONFIG.HUMAN_COST_PER_TICKET;
    const aiCost = totalExecutions * METRICS_CONFIG.AI_COST_PER_TICKET;
    const costReduction = humanCost > 0
        ? Math.round(((humanCost - aiCost) / humanCost) * 100)
        : 87; // Default 87% if no data

    // Human cost equivalent based on hours saved
    const humanCostEquivalent = Math.round(hoursSaved * METRICS_CONFIG.HOURLY_RATE * 1.5); // 1.5x for benefits/overhead

    return {
        totalExecutions,
        successfulExecutions,
        failedExecutions,
        executionsThisWeek,
        executionsThisMonth,
        executionsToday,
        successRate,
        hoursSaved,
        moneySaved,
        avgResponseTime: `<${METRICS_CONFIG.AI_AVG_RESPONSE_TIME_MINUTES} min`,
        costReduction,
        humanCostEquivalent,
    };
}

/**
 * Fetch metrics for a specific automation
 * Used on My Automations page when viewing an automation
 */
export async function fetchAutomationMetrics(automationId: string, userId: string): Promise<AutomationMetrics> {
    // Fetch logs for this specific automation
    const { data: logs, error } = await supabase
        .from('automation_logs')
        .select('id, status, created_at, metadata')
        .eq('automation_id', automationId)
        .eq('user_id', userId) // Security: ensure user owns this automation
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching automation metrics:', error);
        throw error;
    }

    const allLogs = logs || [];
    const totalRuns = allLogs.length;
    const successfulRuns = allLogs.filter(l => l.status === 'success').length;
    const failedRuns = allLogs.filter(l => l.status === 'error').length;

    const reliability = totalRuns > 0
        ? Math.round((successfulRuns / totalRuns) * 100)
        : 100;

    const lastRunAt = allLogs.length > 0 ? allLogs[0].created_at : null;

    const startOfWeek = getStartOfWeek();
    const runsThisWeek = allLogs.filter(l => new Date(l.created_at) >= startOfWeek).length;

    return {
        automationId,
        totalRuns,
        successfulRuns,
        failedRuns,
        reliability,
        lastRunAt,
        runsThisWeek,
        avgExecutionTime: 2, // Default 2 seconds
    };
}

/**
 * Fetch metrics for ALL automations belonging to the user
 * Returns a map of automationId -> metrics
 */
export async function fetchAllAutomationMetrics(userId: string): Promise<Map<string, AutomationMetrics>> {
    // Fetch all automations for this user
    const { data: automations, error: automationsError } = await supabase
        .from('automations')
        .select('id')
        .eq('user_id', userId);

    if (automationsError) throw automationsError;

    // Fetch ALL logs for this user in one query (efficient)
    const { data: allLogs, error: logsError } = await supabase
        .from('automation_logs')
        .select('id, automation_id, status, created_at')
        .eq('user_id', userId);

    if (logsError) throw logsError;

    const logs = allLogs || [];
    const metricsMap = new Map<string, AutomationMetrics>();
    const startOfWeek = getStartOfWeek();

    // Calculate metrics for each automation
    for (const automation of automations || []) {
        const automationLogs = logs.filter(l => l.automation_id === automation.id);
        const totalRuns = automationLogs.length;
        const successfulRuns = automationLogs.filter(l => l.status === 'success').length;
        const failedRuns = automationLogs.filter(l => l.status === 'error').length;
        const reliability = totalRuns > 0 ? Math.round((successfulRuns / totalRuns) * 100) : 100;

        const sortedLogs = [...automationLogs].sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        const lastRunAt = sortedLogs.length > 0 ? sortedLogs[0].created_at : null;
        const runsThisWeek = automationLogs.filter(l => new Date(l.created_at) >= startOfWeek).length;

        metricsMap.set(automation.id, {
            automationId: automation.id,
            totalRuns,
            successfulRuns,
            failedRuns,
            reliability,
            lastRunAt,
            runsThisWeek,
            avgExecutionTime: 2,
        });
    }

    return metricsMap;
}

// ============================================
// DISPLAY FORMATTERS
// ============================================

export function formatMoneySaved(amount: number): string {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toFixed(0)}`;
}

export function formatHoursSaved(hours: number): string {
    if (hours < 1) return '<1';
    return hours.toString();
}

export function formatPercentage(value: number): string {
    return `${value}%`;
}

export function formatNumber(value: number): string {
    return value.toLocaleString();
}

// ============================================
// AUTOMATION TYPE CONFIG
// ============================================

export interface AutomationTypeConfig {
    hourlyRate: number;
    minutesPerTask: number;
    humanCostPerMonth: number;
    industryAvgResponse: string;
    icon: string;
    color: string;
    insights: {
        label: string;
        unit: string;
        color: string;
    }[];
}

export const AUTOMATION_TYPES: Record<string, AutomationTypeConfig> = {
    'customer-support': {
        hourlyRate: 25,
        minutesPerTask: 15,
        humanCostPerMonth: 4000,
        industryAvgResponse: '24h',
        icon: 'Mail',
        color: 'cyan',
        insights: [
            { label: 'Tickets Resolved', unit: 'this week', color: 'green' },
            { label: 'Avg Response', unit: 'vs 24h human', color: 'purple' },
            { label: 'Cost Reduction', unit: 'vs human agent', color: 'emerald' },
        ],
    },
    'appointment-scheduling': {
        hourlyRate: 22,
        minutesPerTask: 10,
        humanCostPerMonth: 3500,
        industryAvgResponse: '4h',
        icon: 'Calendar',
        color: 'purple',
        insights: [
            { label: 'Appointments Set', unit: 'this month', color: 'purple' },
            { label: 'No-Show Reduction', unit: 'with reminders', color: 'green' },
            { label: 'Booking Speed', unit: 'vs manual', color: 'yellow' },
        ],
    },
    'lead-generation': {
        hourlyRate: 35,
        minutesPerTask: 30,
        humanCostPerMonth: 5500,
        industryAvgResponse: '48h',
        icon: 'Target',
        color: 'orange',
        insights: [
            { label: 'Leads Captured', unit: 'qualified', color: 'orange' },
            { label: 'Qualification Rate', unit: 'AI-scored', color: 'cyan' },
            { label: 'Cost Per Lead', unit: 'vs $50 avg', color: 'green' },
        ],
    },
    'phone-agent': {
        hourlyRate: 30,
        minutesPerTask: 8,
        humanCostPerMonth: 4500,
        industryAvgResponse: '3min',
        icon: 'Phone',
        color: 'green',
        insights: [
            { label: 'Calls Handled', unit: 'this week', color: 'green' },
            { label: 'First Call Resolution', unit: 'no transfers', color: 'purple' },
            { label: 'Availability', unit: '24/7 coverage', color: 'cyan' },
        ],
    },
    'default': {
        hourlyRate: 25,
        minutesPerTask: 15,
        humanCostPerMonth: 4000,
        industryAvgResponse: '24h',
        icon: 'Bot',
        color: 'cyan',
        insights: [
            { label: 'Tasks Completed', unit: 'this week', color: 'green' },
            { label: 'Processing Speed', unit: 'avg per task', color: 'purple' },
            { label: 'Uptime', unit: 'reliability', color: 'cyan' },
        ],
    },
};

export function getAutomationTypeConfig(automationType: string): AutomationTypeConfig {
    return AUTOMATION_TYPES[automationType] || AUTOMATION_TYPES['default'];
}
