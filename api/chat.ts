import type { VercelRequest, VercelResponse } from '@vercel/node';

const N8N_WEBHOOK_URL = 'https://n8n.srv993801.hstgr.cloud/webhook/fdf7476a-94e7-41e5-a558-9058fed6987b';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://oasisai.work');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Forward request to n8n
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.text();

        // Return n8n's response
        return res.status(response.status).send(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({
            error: 'Failed to connect to chat service',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
