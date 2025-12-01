import React from 'react';
import {
    Play,
    Pause,
    Edit,
    Trash2,
    MoreHorizontal,
    Plus,
    Search,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AutomationsPage = () => {
    const automations = [
        {
            id: 1,
            name: "Lead Qualification & Enrichment",
            description: "Enriches new leads from Typeform with Clearbit data and syncs to HubSpot.",
            status: "active",
            lastRun: "2 mins ago",
            executions: 1243,
            successRate: "99.2%"
        },
        {
            id: 2,
            name: "Customer Support Ticket Routing",
            description: "Analyzes incoming emails with GPT-4 and routes to appropriate department.",
            status: "active",
            lastRun: "15 mins ago",
            executions: 856,
            successRate: "98.5%"
        },
        {
            id: 3,
            name: "Weekly Sales Report Generator",
            description: "Compiles sales data from Stripe and emails PDF report to management.",
            status: "paused",
            lastRun: "3 days ago",
            executions: 48,
            successRate: "100%"
        },
        {
            id: 4,
            name: "Social Media Content Scheduler",
            description: "Generates content ideas with Claude and schedules posts to LinkedIn.",
            status: "error",
            lastRun: "1 hour ago",
            executions: 12,
            successRate: "85.0%"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">Automations</h1>
                    <p className="text-text-secondary">Manage and monitor your intelligent workflows.</p>
                </div>
                <Button className="bg-oasis-cyan hover:bg-oasis-cyan/80 text-bg-primary font-bold">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Automation
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-bg-secondary p-4 rounded-xl border border-white/10 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-tertiary" />
                    <input
                        type="text"
                        placeholder="Search automations..."
                        className="w-full pl-9 pr-4 py-2 rounded-md border border-white/10 bg-bg-tertiary text-white focus:outline-none focus:ring-2 focus:ring-oasis-cyan/50 placeholder-text-tertiary"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none border-white/10 text-text-secondary hover:text-white hover:bg-white/5">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>

            {/* Automations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {automations.map((automation) => (
                    <div key={automation.id} className="bg-bg-secondary rounded-xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                  ${automation.status === 'active' ? 'bg-success/10 text-success' :
                                        automation.status === 'paused' ? 'bg-warning/10 text-warning' :
                                            'bg-error/10 text-error'}`}>
                                    {automation.status}
                                </div>
                                <button className="text-text-secondary hover:text-white">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2">{automation.name}</h3>
                            <p className="text-sm text-text-secondary mb-6 h-10 line-clamp-2">{automation.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <div className="text-xs text-text-tertiary uppercase tracking-wider">Executions</div>
                                    <div className="font-semibold text-white">{automation.executions}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-tertiary uppercase tracking-wider">Success Rate</div>
                                    <div className="font-semibold text-white">{automation.successRate}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                                <Button variant="ghost" size="sm" className="flex-1 text-text-secondary hover:text-oasis-cyan hover:bg-white/5">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                {automation.status === 'active' ? (
                                    <Button variant="ghost" size="sm" className="flex-1 text-text-secondary hover:text-warning hover:bg-white/5">
                                        <Pause className="h-4 w-4 mr-2" />
                                        Pause
                                    </Button>
                                ) : (
                                    <Button variant="ghost" size="sm" className="flex-1 text-text-secondary hover:text-success hover:bg-white/5">
                                        <Play className="h-4 w-4 mr-2" />
                                        Resume
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AutomationsPage;
