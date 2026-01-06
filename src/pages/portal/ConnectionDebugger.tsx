import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Shield, CheckCircle, XCircle, AlertTriangle, Globe, Key } from 'lucide-react';

// Access the global constants injected by Vite
// @ts-ignore
const CURRENT_URL = __SUPABASE_URL__;
// @ts-ignore
const CURRENT_KEY = __SUPABASE_ANON_KEY__;

export default function ConnectionDebugger() {
    const [testUrl, setTestUrl] = useState(CURRENT_URL);
    const [testKey, setTestKey] = useState(CURRENT_KEY);
    const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

    const testConnection = async () => {
        setStatus('testing');
        setLogs([]);
        addLog('Starting connection test...');
        addLog(`Target URL: ${testUrl}`);
        addLog(`Key Length: ${testKey?.length || 0} chars`);

        // 1. Basic format check
        if (!testUrl || !testUrl.startsWith('http')) {
            addLog('❌ Error: Invalid URL format. Must start with http:// or https://');
            setStatus('error');
            return;
        }
        if (!testKey || testKey.length < 20) {
            addLog('❌ Error: Invalid Key format. Too short.');
            setStatus('error');
            return;
        }

        try {
            // 2. Direct Fetch Test (Bypassing Library)
            addLog('Attempting direct fetch to Supabase...');
            const response = await fetch(`${testUrl}/auth/v1/settings`, {
                headers: {
                    'apikey': testKey,
                    'Authorization': `Bearer ${testKey}`
                }
            });

            addLog(`Fetch Status: ${response.status} ${response.statusText}`);

            if (response.status === 200) {
                addLog('✅ SUCCESS: Direct fetch accepted! Key and URL are valid.');
                setStatus('success');
            } else {
                const data = await response.json();
                addLog(`❌ FAILED: Server responded with error: ${JSON.stringify(data)}`);

                if (response.status === 401) {
                    addLog('⚠️ DIAGNOSIS: The API Key is incorrect for this URL.');
                    addLog('ACTION: Check that you are using the "anon" key, NOT the service_role key.');
                } else if (response.status === 404) {
                    addLog('⚠️ DIAGNOSIS: The URL is incorrect. Project not found.');
                }
                setStatus('error');
                return;
            }

            // 3. Client Library Test
            addLog('Initializing Supabase Client...');
            const supabase = createClient(testUrl, testKey);
            const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });

            if (error) {
                // It's possible profiles table doesn't exist or is locked, but connection might be auth-ok.
                // We basically trust the fetch test more for 'connection' validity.
                addLog(`Library Warning: ${error.message} (This might just be RLS, which is fine)`);
            } else {
                addLog('✅ Client Library connected successfully.');
            }

        } catch (err: any) {
            addLog(`❌ CRITICAL ERROR: ${err.message}`);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-300 p-8 font-mono">
            <div className="max-w-3xl mx-auto space-y-8">

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="text-cyan-400 w-8 h-8" />
                        <h1 className="text-2xl font-bold text-white">Supabase Connection Debugger</h1>
                    </div>
                    <p className="mb-6">
                        Use this tool to find the correct working combination of URL and API Key for your project.
                        When the test passes, copy the working values into your Vercel Environment Variables.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Supabase Project URL
                            </label>
                            <input
                                type="text"
                                value={testUrl}
                                onChange={e => setTestUrl(e.target.value)}
                                className="w-full bg-gray-950 border border-gray-700 rounded p-3 text-white focus:border-cyan-500 outline-none transition"
                                placeholder="https://your-project.supabase.co"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                                <Key className="w-4 h-4" /> Supabase Anon Key (public)
                            </label>
                            <textarea
                                value={testKey}
                                onChange={e => setTestKey(e.target.value)}
                                className="w-full bg-gray-950 border border-gray-700 rounded p-3 text-white focus:border-cyan-500 outline-none transition h-24"
                                placeholder="eyJ..."
                            />
                        </div>

                        <button
                            onClick={testConnection}
                            disabled={status === 'testing'}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2
                    ${status === 'testing' ? 'bg-gray-700 cursor-wait' :
                                    status === 'success' ? 'bg-green-600 hover:bg-green-500' :
                                        status === 'error' ? 'bg-red-600 hover:bg-red-500' :
                                            'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
                        >
                            {status === 'testing' && <span className="animate-spin">⏳</span>}
                            {status === 'idle' && 'Test Connection'}
                            {status === 'testing' && 'Testing...'}
                            {status === 'success' && 'Connection Verified!'}
                            {status === 'error' && 'Connection Failed'}
                        </button>
                    </div>
                </div>

                {/* Logs Console */}
                <div className="bg-black border border-gray-800 rounded-xl p-4 h-96 overflow-y-auto font-mono text-sm">
                    <div className="text-gray-500 mb-2 border-b border-gray-900 pb-2">Debug Log Output</div>
                    {logs.length === 0 && <span className="text-gray-700 italic">Ready to test...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className={`mb-1 ${log.includes('✅') ? 'text-green-400' :
                                log.includes('❌') ? 'text-red-400 font-bold' :
                                    log.includes('⚠️') ? 'text-yellow-400' :
                                        'text-gray-400'
                            }`}>
                            {log}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
