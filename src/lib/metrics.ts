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
export async function fetchDashboardMetrics(userId: string, isAdmin: boolean = false): Promise<DashboardMetrics> {
    try {
        const startOfWeek = getStartOfWeek();
        const startOfMonth = getStartOfMonth();
        const startOfToday = getStartOfToday();

        // STEP 1: Fetch Live Counts from Logs (The Single Source of Truth)
        // We run these in parallel for maximum performance
        const [
            totalRes,
            successRes,
            weekRes,
            monthRes,
            todayRes
        ] = await Promise.all([
            supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
            supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId).in('status', ['success', 'completed', 'Success', 'Completed', '']),
            supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId).gte('created_at', startOfWeek.toISOString()),
            supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId).gte('created_at', startOfMonth.toISOString()),
            supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId).gte('created_at', startOfToday.toISOString()),
        ]);

        const totalExecutions = totalRes.count || 0;
        const successfulExecutions = successRes.count || 0;
        const executionsThisWeek = weekRes.count || 0;
        const executionsThisMonth = monthRes.count || 0;
        const executionsToday = todayRes.count || 0;

        // STEP 2: Calculate Derived Metrics
        const successRate = totalExecutions > 0 ? Math.round((successfulExecutions / totalExecutions) * 100) : 100;

        // Hours Saved: Based on real execution count * platform average
        // This ensures that deleting a log immediately updates time/money saved.
        const hoursSaved = parseFloat((totalExecutions * METRICS_CONFIG.HOURS_SAVED_PER_EXECUTION).toFixed(2));
        const moneySaved = Math.round(hoursSaved * METRICS_CONFIG.HOURLY_RATE);

        const humanCost = totalExecutions * METRICS_CONFIG.HUMAN_COST_PER_TICKET;
        const aiCost = totalExecutions * METRICS_CONFIG.AI_COST_PER_TICKET;
        const costReduction = humanCost > 0 ? Math.round(((humanCost - aiCost) / humanCost) * 100) : 87;
        const humanCostEquivalent = Math.round(hoursSaved * METRICS_CONFIG.HOURLY_RATE * 1.5);

        return {
            totalExecutions,
            successfulExecutions,
            failedExecutions: totalExecutions - successfulExecutions,
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
    } catch (err) {
        console.error('fetchDashboardMetrics failed:', err);
        return DEFAULT_DASHBOARD_METRICS;
    }
}


const DEFAULT_DASHBOARD_METRICS: DashboardMetrics = {
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
    executionsThisWeek: 0,
    executionsThisMonth: 0,
    executionsToday: 0,
    successRate: 100,
    hoursSaved: 0,
    moneySaved: 0,
    avgResponseTime: '<2 min',
    costReduction: 87,
    humanCostEquivalent: 0
};

/**
 * Fetch metrics for a specific automation
 * MASTER SOURCE: Count rows in automation_logs
 */
export async function fetchAutomationMetrics(automationId: string, userId: string, isAdmin: boolean = false): Promise<AutomationMetrics> {
    try {
        const startOfWeek = getStartOfWeek();

        // Parallel count queries for specific automation
        const [totalRes, successRes, weekRes] = await Promise.all([
            supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('automation_id', automationId),
            supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('automation_id', automationId).in('status', ['success', 'completed', 'Success', 'Completed', '']),
            supabase.from('automation_logs').select('*', { count: 'exact', head: true }).eq('automation_id', automationId).gte('created_at', startOfWeek.toISOString()),
        ]);

        const totalRuns = totalRes.count || 0;
        const successfulRuns = successRes.count || 0;
        const runsThisWeek = weekRes.count || 0;
        const reliability = totalRuns > 0 ? Math.round((successfulRuns / totalRuns) * 100) : 100;

        // Fetch last run date
        const { data: lastLog } = await supabase
            .from('automation_logs')
            .select('created_at')
            .eq('automation_id', automationId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        return {
            automationId,
            totalRuns,
            successfulRuns,
            failedRuns: totalRuns - successfulRuns,
            reliability,
            lastRunAt: lastLog?.created_at || null,
            runsThisWeek,
            avgExecutionTime: 2,
        };
    } catch (err) {
        console.error('fetchAutomationMetrics failed:', err);
        return {
            automationId,
            totalRuns: 0,
            successfulRuns: 0,
            failedRuns: 0,
            reliability: 100,
            lastRunAt: null,
            runsThisWeek: 0,
            avgExecutionTime: 0
        };
    }
}

/**
 * Fetch metrics for ALL automations belonging to the user
 * MASTER SOURCE: Count rows in automation_logs grouped by automation_id
 */
export async function fetchAllAutomationMetrics(userId: string, isAdmin: boolean = false): Promise<Map<string, AutomationMetrics>> {
    try {
        // STEP 1: Fetch list of automations
        let autoQuery = supabase.from('automations').select('id');
        if (!isAdmin) autoQuery = autoQuery.eq('user_id', userId);
        const { data: automations } = await autoQuery;
        const autos = automations || [];

        // STEP 2: Fetch ALL logs for stats calculation
        // Optimization: For huge datasets, we'd use grouped counts, but for standard user logs,
        // fetching all rows (id, automation_id, status) is fast and reliable.
        let logQuery = supabase.from('automation_logs').select('automation_id, status, created_at').eq('user_id', userId);
        const { data: allLogs } = await logQuery;
        const logs = allLogs || [];

        const metricsMap = new Map<string, AutomationMetrics>();
        const startOfWeek = getStartOfWeek();

        for (const auto of autos) {
            const autoLogs = logs.filter(l => l.automation_id === auto.id);
            const totalRuns = autoLogs.length;
            const successfulRuns = autoLogs.filter(l => ['success', 'completed', 'Success', 'Completed', ''].includes(l.status || '')).length;
            const reliability = totalRuns > 0 ? Math.round((successfulRuns / totalRuns) * 100) : 100;

            const sortedLogs = [...autoLogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            const lastRunAt = sortedLogs.length > 0 ? sortedLogs[0].created_at : null;
            const runsThisWeek = autoLogs.filter(l => new Date(l.created_at) >= startOfWeek).length;

            metricsMap.set(auto.id, {
                automationId: auto.id,
                totalRuns,
                successfulRuns,
                failedRuns: totalRuns - successfulRuns,
                reliability,
                lastRunAt,
                runsThisWeek,
                avgExecutionTime: 2,
            });
        }

        return metricsMap;
    } catch (err) {
        console.error('fetchAllAutomationMetrics failed:', err);
        return new Map();
    }
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
