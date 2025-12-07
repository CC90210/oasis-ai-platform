import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogOut, Zap, BarChart3, Clock, TrendingUp, Mail, MessageSquare, Mic, AlertCircle } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

const ClientDashboard = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Auth & Data Fetching
    useEffect(() => {
        const storedClientId = sessionStorage.getItem('clientId');

        // Security Check
        if (!storedClientId || storedClientId !== clientId) {
            navigate('/login');
            return;
        }

        // Fetch Data
        const fetchData = async () => {
            try {
                // In production, this would be an API call. 
                // Here we fetch the JSON file directly from public/client-data/
                const response = await fetch(`/client-data/${clientId}.json`);

                if (!response.ok) {
                    throw new Error('Client data not found');
                }

                const data = await response.json();
                setClientData(data);
            } catch (err) {
                console.error("Failed to load dashboard data:", err);
                setError("Failed to load dashboard data. Please contact support.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clientId, navigate]);

    // Handle Logout
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin text-cyan-500">
                    <Zap size={32} />
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                    <h2 className="text-xl font-bold mb-2">Error Loading Dashboard</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button onClick={handleLogout} className="text-cyan-500 hover:underline">
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    // Empty State Check
    if (clientData.stats.activeAutomations === 0) {
        return <EmptyState companyName={clientData.companyName} />;
    }

    // Full Dashboard
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">
                            {clientData.companyName} <span className="text-gray-500 font-normal text-lg">Dashboard</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Last updated: {clientData.lastUpdated}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <StatCard
                        label="Active Automations"
                        value={clientData.stats.activeAutomations}
                        icon={<Zap className="text-yellow-400" size={24} />}
                    />
                    <StatCard
                        label="This Month"
                        value={clientData.stats.monthlyExecutions}
                        sublabel="Total Executions"
                        icon={<BarChart3 className="text-blue-400" size={24} />}
                    />
                    <StatCard
                        label="Time Saved"
                        value={`${clientData.stats.timeSavedHours}h`}
                        icon={<Clock className="text-purple-400" size={24} />}
                    />
                    <StatCard
                        label="Est. ROI"
                        value={`$${clientData.stats.estimatedROI.toLocaleString()}`}
                        icon={<TrendingUp className="text-green-400" size={24} />}
                    />
                </div>

                {/* Monthly Performance */}
                {clientData.monthlyPerformance && clientData.monthlyPerformance.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Monthly Performance</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {clientData.monthlyPerformance.map((week, idx) => (
                                <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                    <div className="text-gray-400 text-sm mb-2">{week.week}</div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-2xl font-bold text-white">{week.executions}</div>
                                            <div className="text-xs text-gray-500">Executions</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-semibold text-cyan-400">{week.leads}</div>
                                            <div className="text-xs text-gray-500">Leads</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Automations List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Active Automations</h2>
                    <div className="grid gap-4">
                        {clientData.automations.map((automation, idx) => (
                            <AutomationCard key={idx} automation={automation} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

// Sub-components

const StatCard = ({ label, value, sublabel, icon }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
            <div className="text-gray-400 text-sm font-medium">{label}</div>
            <div className="p-2 bg-gray-700/50 rounded-lg">{icon}</div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        {sublabel && <div className="text-xs text-gray-500">{sublabel}</div>}
    </div>
);

const AutomationCard = ({ automation }) => {
    // Helper for icon
    const getIcon = (type) => {
        switch (type) {
            case 'email_automation': return <Mail size={20} />;
            case 'chatbot': return <MessageSquare size={20} />;
            case 'voice': return <Mic size={20} />;
            default: return <Zap size={20} />;
        }
    };

    // Helper for status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400';
            case 'paused': return 'bg-yellow-500/20 text-yellow-400';
            case 'error': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-700 text-gray-400';
        }
    };

    const formattedDate = new Date(automation.lastRun).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-cyan-400">
                    {getIcon(automation.type)}
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{automation.name}</h3>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                        <Clock size={14} className="mr-1" />
                        Last active: {formattedDate}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-700">
                <div className="text-center md:text-right">
                    <div className="text-2xl font-bold text-white">{automation.monthlyExecutions}</div>
                    <div className="text-xs text-gray-500">Runs this month</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(automation.status)}`}>
                    {automation.status}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
