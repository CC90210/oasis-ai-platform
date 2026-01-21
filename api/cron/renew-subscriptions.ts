import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/cron/renew-subscriptions
 * Automatically renew subscription periods that have expired
 * 
 * This should be triggered by Vercel Cron or an external cron service
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/renew-subscriptions",
 *     "schedule": "0 0 * * *"
 *   }]
 * }
 */

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Security: Only allow from Vercel Cron or with correct auth header
    const authHeader = req.headers.authorization;
    const cronSecret = process.env.CRON_SECRET;

    // Allow Vercel Cron (sends specific user-agent) or valid auth header
    const isVercelCron = req.headers['user-agent']?.includes('vercel-cron');
    const isAuthorized = cronSecret && authHeader === `Bearer ${cronSecret}`;

    if (!isVercelCron && !isAuthorized) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('🔄 Running subscription period renewal check...');

        // Find subscriptions that need renewal
        const { data: expiredSubs, error: fetchError } = await supabase
            .from('subscriptions')
            .select('id, user_id, product_name, billing_interval, current_period_end')
            .eq('status', 'active')
            .eq('cancel_at_period_end', false)
            .lte('current_period_end', new Date().toISOString());

        if (fetchError) {
            console.error('Error fetching subscriptions:', fetchError);
            return res.status(500).json({ error: 'Failed to fetch subscriptions' });
        }

        if (!expiredSubs || expiredSubs.length === 0) {
            console.log('✅ No subscriptions need renewal');
            return res.status(200).json({
                success: true,
                message: 'No subscriptions need renewal',
                renewed: 0
            });
        }

        console.log(`📋 Found ${expiredSubs.length} subscription(s) to renew`);

        let renewedCount = 0;

        for (const sub of expiredSubs) {
            const currentEnd = new Date(sub.current_period_end);
            let newEnd: Date;

            // Calculate new period end
            if (sub.billing_interval === 'year') {
                newEnd = new Date(currentEnd);
                newEnd.setFullYear(newEnd.getFullYear() + 1);
            } else {
                // Default to monthly
                newEnd = new Date(currentEnd);
                newEnd.setMonth(newEnd.getMonth() + 1);
            }

            // Update the subscription
            const { error: updateError } = await supabase
                .from('subscriptions')
                .update({
                    current_period_start: sub.current_period_end,
                    current_period_end: newEnd.toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .eq('id', sub.id);

            if (updateError) {
                console.error(`Error updating subscription ${sub.id}:`, updateError);
            } else {
                renewedCount++;
                console.log(`✅ Renewed "${sub.product_name}" - new end: ${newEnd.toISOString()}`);
            }
        }

        console.log(`🎉 Renewed ${renewedCount} subscription(s)`);

        return res.status(200).json({
            success: true,
            message: `Renewed ${renewedCount} subscription(s)`,
            renewed: renewedCount,
            timestamp: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error('Cron job error:', error);
        return res.status(500).json({ error: error.message || 'Internal error' });
    }
}
