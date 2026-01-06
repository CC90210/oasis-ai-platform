import { useState } from 'react';

// Direct import - no aliases
import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials
const SUPABASE_URL = 'https://skgrbweyscysyetubemg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZ3Jid2V5c2N5c3lldHViZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNTI0MTcsImV4cCI6MjA1MTcyODQxN30.VawWeg_UCTPutIosfOaVyF8IgVT4iSIiXArhX2XxZn0';

export default function TestConnection() {
    const [status, setStatus] = useState<string>('Not tested yet');
    const [details, setDetails] = useState<string>('');

    const testConnection = async () => {
        setStatus('Testing...');
        setDetails('');

        try {
            // Step 1: Create client
            setDetails(prev => prev + '\n1. Creating Supabase client...');
            const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            setDetails(prev => prev + ' ✓ Client created');

            // Step 2: Test a simple query
            setDetails(prev => prev + '\n2. Testing database query...');
            const { data, error } = await supabase
                .from('profiles')
                .select('count')
                .limit(1);

            if (error) {
                setDetails(prev => prev + ` ✗ Query error: ${error.message}`);
                setStatus('Database query failed');
                return;
            }
            setDetails(prev => prev + ' ✓ Database connected');

            // Step 3: Test auth
            setDetails(prev => prev + '\n3. Testing auth service...');
            const { data: authData, error: authError } = await supabase.auth.getSession();

            if (authError) {
                setDetails(prev => prev + ` ✗ Auth error: ${authError.message}`);
            } else {
                setDetails(prev => prev + ' ✓ Auth service connected');
            }

            setStatus('All connections successful! ✓');

        } catch (err: any) {
            setStatus('Connection failed');
            setDetails(prev => prev + `\n\nError: ${err.message}\n\nStack: ${err.stack}`);
        }
    };

    const testSignup = async () => {
        setStatus('Testing signup...');
        setDetails('');

        try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

            const testEmail = `test${Date.now()}@example.com`;
            const testPassword = 'testpassword123';

            setDetails(`Attempting signup with: ${testEmail}`);

            const { data, error } = await supabase.auth.signUp({
                email: testEmail,
                password: testPassword,
                options: {
                    data: {
                        full_name: 'Test User',
                    },
                },
            });

            if (error) {
                setStatus('Signup failed');
                setDetails(prev => prev + `\n\nError: ${error.message}\nCode: ${error.status}`);
            } else {
                setStatus('Signup successful! ✓');
                setDetails(prev => prev + `\n\nUser created: ${data.user?.id}\nEmail: ${data.user?.email}`);
            }

        } catch (err: any) {
            setStatus('Signup exception');
            setDetails(`Error: ${err.message}\n\nThis usually means:\n- Network/CORS issue\n- Supabase URL incorrect\n- Package not installed properly`);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            color: '#fff',
            padding: '40px',
            fontFamily: 'monospace'
        }}>
            <h1 style={{ color: '#00D4FF' }}>Supabase Connection Test</h1>

            <div style={{ marginBottom: '20px' }}>
                <p><strong>URL:</strong> {SUPABASE_URL}</p>
                <p><strong>Key:</strong> {SUPABASE_ANON_KEY.substring(0, 50)}...</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button
                    onClick={testConnection}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#00D4FF',
                        color: '#000',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Test Connection
                </button>

                <button
                    onClick={testSignup}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#10B981',
                        color: '#000',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Test Signup
                </button>
            </div>

            <div style={{
                padding: '20px',
                backgroundColor: status.includes('✓') ? '#064E3B' : status.includes('failed') ? '#7F1D1D' : '#1F2937',
                borderRadius: '10px',
                marginBottom: '20px'
            }}>
                <h2>Status: {status}</h2>
            </div>

            <pre style={{
                padding: '20px',
                backgroundColor: '#1F2937',
                borderRadius: '10px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
            }}>
                {details || 'Click a button to test...'}
            </pre>

            <div style={{ marginTop: '40px', color: '#6B7280' }}>
                <h3>Troubleshooting Guide:</h3>
                <ul>
                    <li><strong>"Failed to fetch"</strong> = Network/CORS issue or wrong URL</li>
                    <li><strong>"Invalid API key"</strong> = Wrong anon key</li>
                    <li><strong>"relation does not exist"</strong> = Table not created in Supabase</li>
                    <li><strong>"JWT expired"</strong> = Key is invalid</li>
                </ul>
            </div>
        </div>
    );
}
