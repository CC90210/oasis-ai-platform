import React from 'react';
import { Mail, MoreHorizontal, Shield, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeamPage = () => {
    const members = [
        { id: 1, name: "CC Admin", email: "cc@oasis-ai.com", role: "Admin", status: "active", lastActive: "Now" },
        { id: 2, name: "Adan Partner", email: "adan@oasis-ai.com", role: "Admin", status: "active", lastActive: "2 hours ago" },
        { id: 3, name: "Sarah Manager", email: "sarah@client.com", role: "Member", status: "active", lastActive: "1 day ago" },
        { id: 4, name: "John Viewer", email: "john@client.com", role: "Viewer", status: "invited", lastActive: "-" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-oasis-midnight">Team Management</h1>
                    <p className="text-oasis-slate">Manage access and permissions for your team.</p>
                </div>
                <Button className="bg-oasis-teal hover:bg-oasis-deep-ocean text-white">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Member
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-oasis-slate/10 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-oasis-pearl/50 text-oasis-slate font-medium">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Last Active</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-oasis-slate/10">
                        {members.map((member) => (
                            <tr key={member.id} className="hover:bg-oasis-pearl/30">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-oasis-teal/10 text-oasis-teal flex items-center justify-center font-bold text-xs">
                                            {member.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-oasis-midnight">{member.name}</div>
                                            <div className="text-xs text-oasis-slate">{member.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-oasis-midnight">
                                        <Shield className="h-3 w-3 text-oasis-slate" />
                                        {member.role}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${member.status === 'active' ? 'bg-oasis-mint/10 text-oasis-mint' : 'bg-oasis-amber/10 text-oasis-amber'}`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-oasis-slate">{member.lastActive}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-oasis-slate hover:text-oasis-midnight">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamPage;
