import React from 'react';
import {
    Activity,
    Clock,
    DollarSign,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const DashboardPage = () => {
    // Mock Data
    const performanceData = [
        { name: 'Mon', executions: 40 },
        { name: 'Tue', executions: 55 },
        { name: 'Wed', executions: 85 },
        { name: 'Thu', executions: 60 },
        { name: 'Fri', executions: 95 },
        { name: 'Sat', executions: 30 },
        { name: 'Sun', executions: 25 },
    ];

    const pieData = [
        { name: 'Success', value: 92, color: '#00D4FF' }, // oasis-cyan
        { name: 'Error', value: 8, color: '#EF4444' },   // error
    ];

    const recentActivity = [
        { id: 1, name: 'Lead Qualification', status: 'success', time: '2 mins ago', duration: '1.2s' },
        { id: 2, name: 'Email Outreach', status: 'success', time: '15 mins ago', duration: '0.8s' },
        { id: 3, name: 'CRM Sync', status: 'error', time: '1 hour ago', duration: '2.5s' },
        { id: 4, name: 'Invoice Generation', status: 'success', time: '2 hours ago', duration: '3.1s' },
        { id: 5, name: 'Weekly Report', status: 'success', time: '5 hours ago', duration: '5.5s' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
                    <p className="text-text-secondary">Welcome back, CC. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 text-text-secondary hover:text-white hover:bg-white/5">
                        View Reports
                    </Button>
                    <Button className="bg-oasis-cyan hover:bg-oasis-cyan/80 text-bg-primary font-bold">
                        <Zap className="mr-2 h-4 w-4" />
                        New Automation
                    </Button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Active Automations', value: '12', icon: Zap, change: '+2', trend: 'up' },
                    { label: 'Total Executions', value: '1,248', icon: Activity, change: '+15%', trend: 'up' },
                    { label: 'Time Saved', value: '156h', icon: Clock, change: '+12h', trend: 'up' },
                    { label: 'Cost Savings', value: '$4,680', icon: DollarSign, change: '+8%', trend: 'up' },
                ].map((metric, i) => (
                    <div key={i} className="bg-bg-secondary p-6 rounded-xl border border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 rounded-lg bg-bg-tertiary flex items-center justify-center text-oasis-cyan">
                                <metric.icon className="h-5 w-5" />
                            </div>
                            <div className={`flex items-center text-xs font-medium ${metric.trend === 'up' ? 'text-success' : 'text-error'}`}>
                                {metric.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                {metric.change}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-sm text-text-secondary">{metric.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-bg-secondary p-6 rounded-xl border border-white/10 shadow-sm">
                    <h3 className="text-lg font-bold text-white mb-6">Execution Volume</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1A1F2E', color: '#fff' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="executions"
                                    stroke="#00D4FF"
                                    strokeWidth={3}
                                    dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Success Rate & System Health */}
                <div className="space-y-6">
                    <div className="bg-bg-secondary p-6 rounded-xl border border-white/10 shadow-sm">
                        <h3 className="text-lg font-bold text-white mb-4">Success Rate</h3>
                        <div className="h-[200px] w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-2">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-oasis-cyan"></div>
                                <span className="text-sm text-text-secondary">Success (92%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-error"></div>
                                <span className="text-sm text-text-secondary">Error (8%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-bg-secondary rounded-xl border border-white/10 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                    <Link to="/portal/automations" className="text-sm text-oasis-cyan hover:underline">View All</Link>
                </div>
                <div className="divide-y divide-white/10">
                    {recentActivity.map((item) => (
                        <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`h-2 w-2 rounded-full ${item.status === 'success' ? 'bg-success' : 'bg-error'}`}></div>
                                <div>
                                    <div className="font-medium text-white">{item.name}</div>
                                    <div className="text-xs text-text-secondary">{item.time}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-mono text-text-tertiary">{item.duration}</span>
                                {item.status === 'success' ? (
                                    <div className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">Success</div>
                                ) : (
                                    <div className="px-2 py-1 rounded-full bg-error/10 text-error text-xs font-medium">Error</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
