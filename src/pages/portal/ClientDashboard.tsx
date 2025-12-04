import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Activity,
    Clock,
    DollarSign,
    Zap,
    ArrowUpRight,
    Bot,
    Send,
    Home,
    LogOut,
    User,
    Settings,
    BarChart3,
    MessageSquare,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/authStore';
import { motion } from 'framer-motion';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const ClientDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'chat'>('overview');
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: "Hello! I'm your OASIS AI assistant. I have access to your automations and can help you track performance, troubleshoot issues, or answer questions. How can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');

    // Mock performance data
    const performanceData = [
        { name: 'Mon', executions: 40, leads: 12 },
        { name: 'Tue', executions: 55, leads: 18 },
        { name: 'Wed', executions: 85, leads: 25 },
        { name: 'Thu', executions: 60, leads: 15 },
        { name: 'Fri', executions: 95, leads: 32 },
        { name: 'Sat', executions: 30, leads: 8 },
        { name: 'Sun', executions: 25, leads: 6 },
    ];

    const activeAutomations = [
        { id: 1, name: 'Website Chat Widget', status: 'active', executions: 156, lastRun: '2 mins ago' },
        { id: 2, name: 'Lead Capture Agent', status: 'active', executions: 89, lastRun: '15 mins ago' },
        { id: 3, name: 'Email Follow-up', status: 'active', executions: 234, lastRun: '1 hour ago' },
    ];

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            role: 'user' as const,
            content: input,
            timestamp: new Date()
        };

        setMessages([...messages, newMessage]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                role: 'assistant' as const,
                content: "I'm checking your automation metrics. Based on the current data, your chatbot has captured 116 leads this week with a 92% response rate. Would you like me to provide more detailed analytics or help with something else?",
                timestamp: new Date()
            }]);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            {/* Header */}
            <header className="bg-bg-secondary border-b border-white/5 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/images/oasis-logo.jpg"
                                alt="OASIS AI"
                                className="w-10 h-10 rounded-xl shadow-lg"
                            />
                            <span className="font-display font-bold text-xl text-white">
                                OASIS <span className="text-oasis-cyan">AI</span>
                            </span>
                        </Link>

                        {/* Tabs */}
                        <div className="hidden sm:flex items-center gap-1 bg-bg-tertiary rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview'
                                        ? 'bg-oasis-cyan text-bg-primary'
                                        : 'text-text-secondary hover:text-white'
                                    }`}
                            >
                                <BarChart3 className="w-4 h-4 inline mr-2" />
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'chat'
                                        ? 'bg-oasis-cyan text-bg-primary'
                                        : 'text-text-secondary hover:text-white'
                                    }`}
                            >
                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                AI Support
                            </button>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Main Website</span>
                            </Link>

                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                <div className="w-8 h-8 rounded-full bg-oasis-cyan/20 flex items-center justify-center">
                                    <User className="w-4 h-4 text-oasis-cyan" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-white">{user?.name}</p>
                                    <p className="text-xs text-text-tertiary">{user?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={logout}
                                className="p-2 text-text-tertiary hover:text-white transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Tabs */}
            <div className="sm:hidden flex items-center gap-1 bg-bg-secondary p-2 border-b border-white/5">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview'
                            ? 'bg-oasis-cyan text-bg-primary'
                            : 'text-text-secondary hover:text-white'
                        }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'chat'
                            ? 'bg-oasis-cyan text-bg-primary'
                            : 'text-text-secondary hover:text-white'
                        }`}
                >
                    AI Support
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* Welcome */}
                        <div>
                            <h1 className="text-2xl font-display font-bold text-white mb-2">
                                Welcome back, {user?.name?.split(' ')[0]}!
                            </h1>
                            <p className="text-text-secondary">Here's how your automations are performing.</p>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: 'Active Automations', value: '3', icon: Zap, color: 'text-oasis-cyan' },
                                { label: 'This Week', value: '479', icon: Activity, color: 'text-green-400' },
                                { label: 'Time Saved', value: '24h', icon: Clock, color: 'text-blue-400' },
                                { label: 'Est. ROI', value: '$2,450', icon: DollarSign, color: 'text-yellow-400' },
                            ].map((metric, i) => (
                                <div key={i} className="glass-card p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                                    <div className="text-sm text-text-secondary">{metric.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Weekly Performance</h3>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={performanceData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                        <XAxis dataKey="name" tick={{ fill: '#94A3B8' }} axisLine={false} />
                                        <YAxis tick={{ fill: '#94A3B8' }} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1A1F2E',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Line type="monotone" dataKey="executions" stroke="#00D4FF" strokeWidth={2} dot={{ fill: '#00D4FF' }} />
                                        <Line type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-oasis-cyan" />
                                    <span className="text-sm text-text-secondary">Executions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-sm text-text-secondary">Leads Captured</span>
                                </div>
                            </div>
                        </div>

                        {/* Active Automations */}
                        <div className="glass-card overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Your Automations</h3>
                                <Link to="/pricing" className="text-sm text-oasis-cyan hover:text-white transition-colors">
                                    + Add More
                                </Link>
                            </div>
                            <div className="divide-y divide-white/10">
                                {activeAutomations.map((auto) => (
                                    <div key={auto.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-oasis-cyan/10 flex items-center justify-center">
                                                <Bot className="w-5 h-5 text-oasis-cyan" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{auto.name}</div>
                                                <div className="text-sm text-text-secondary">Last run: {auto.lastRun}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="font-bold text-white">{auto.executions}</div>
                                                <div className="text-xs text-text-tertiary">executions</div>
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* Chat Tab */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[calc(100vh-12rem)]"
                    >
                        <div className="glass-card h-full flex flex-col overflow-hidden">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-bg-tertiary">
                                <div className="w-10 h-10 rounded-lg bg-oasis-cyan/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-oasis-cyan" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">OASIS AI Support</h3>
                                    <p className="text-xs text-text-secondary flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        Online • Connected to your automations
                                    </p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-oasis-cyan/20' : 'bg-bg-tertiary'
                                            }`}>
                                            {msg.role === 'assistant' ? (
                                                <Bot className="w-4 h-4 text-oasis-cyan" />
                                            ) : (
                                                <User className="w-4 h-4 text-white" />
                                            )}
                                        </div>
                                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'assistant'
                                                ? 'bg-bg-tertiary text-white rounded-tl-none'
                                                : 'bg-oasis-cyan text-bg-primary rounded-tr-none'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-white/10 bg-bg-secondary">
                                <form onSubmit={handleSend} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about your automations..."
                                        className="flex-1 bg-bg-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-oasis-cyan/50 placeholder-text-tertiary"
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-oasis-cyan hover:bg-oasis-cyan/80 text-bg-primary"
                                        disabled={!input.trim()}
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default ClientDashboard;
