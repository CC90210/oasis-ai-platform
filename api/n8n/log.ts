import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key to bypass RLS
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, x-webhook-secret');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate API key
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.N8N_API_KEY) {
        console.error('Invalid API key provided');
        return res.status(401).json({ error: 'Invalid API key' });
    }

    try {
        const {
            automation_id,
            event_type,
            event_name,
            status = 'success',
            metrics = {},
            metadata = {}
        } = req.body;

        // Validate required fields
        if (!automation_id) {
            return res.status(400).json({ error: 'Missing required field: automation_id' });
        }
        if (!event_type) {
            return res.status(400).json({ error: 'Missing required field: event_type' });
        }
        if (!event_name) {
            return res.status(400).json({ error: 'Missing required field: event_name' });
        }

        // Get automation to find user_id and verify webhook secret
        const { data: automation, error: autoError } = await supabase
            .from('client_automations')
            .select('id, user_id, webhook_secret, display_name')
            .eq('id', automation_id)
            .single();

        if (autoError || !automation) {
            console.error('Automation not found:', automation_id, autoError);
            return res.status(404).json({ error: 'Automation not found' });
        }

        // Verify webhook secret if provided
        const webhookSecret = req.headers['x-webhook-secret'];
        if (webhookSecret && webhookSecret !== automation.webhook_secret) {
            console.error('Invalid webhook secret for automation:', automation_id);
            return res.status(401).json({ error: 'Invalid webhook secret' });
        }

        // Insert log entry
        const { data: logData, error: logError } = await supabase
            .from('automation_logs')
            .insert({
                automation_id,
                user_id: automation.user_id,
                event_type,
                event_name,
                status,
                metadata,
                description: metadata.description || null
            })
            .select()
            .single();

        if (logError) {
            console.error('Failed to insert log:', logError);
            return res.status(500).json({ error: 'Failed to insert log', details: logError.message });
        }

        // Insert metrics if provided
        if (metrics && typeof metrics === 'object' && Object.keys(metrics).length > 0) {
            const metricRows = Object.entries(metrics).map(([name, value]) => ({
                automation_id,
                user_id: automation.user_id,
                metric_name: name,
                metric_category: metadata.metric_category || 'general',
                value_numeric: typeof value === 'number' ? value : null,
                value_text: typeof value === 'string' ? value : null,
                value_json: (typeof value === 'object' && value !== null) ? value : null,
                recorded_at: new Date().toISOString()
            }));

            const { error: metricsError } = await supabase
                .from('automation_metrics')
                .insert(metricRows);

            if (metricsError) {
                console.error('Failed to insert metrics:', metricsError);
                // Don't fail the request, just log the error
            }
        }

        // Update last_run_at on the automation
        const { error: updateError } = await supabase
            .from('client_automations')
            .update({ last_run_at: new Date().toISOString() })
            .eq('id', automation_id);

        if (updateError) {
            console.error('Failed to update last_run_at:', updateError);
        }

        // Return success
        return res.status(200).json({
            success: true,
            log_id: logData.id,
            automation: automation.display_name,
            message: `Logged: ${event_name}`
        });

    } catch (error: any) {
        console.error('n8n log endpoint error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
