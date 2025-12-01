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
                    <h1 className="text-2xl font-display font-bold text-white">Team Management</h1>
                    <p className="text-text-secondary">Manage access and permissions for your team.</p>
                </div>
                <Button className="bg-oasis-cyan hover:bg-oasis-cyan/80 text-bg-primary font-bold">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Member
                </Button>
            </div>

            <div className="bg-bg-secondary rounded-xl border border-white/10 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-bg-tertiary text-text-secondary font-medium">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Last Active</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {members.map((member) => (
                            <tr key={member.id} className="hover:bg-white/5">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-oasis-cyan/10 text-oasis-cyan flex items-center justify-center font-bold text-xs">
                                            {member.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{member.name}</div>
                                            <div className="text-xs text-text-secondary">{member.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-white">
                                        <Shield className="h-3 w-3 text-text-secondary" />
                                        {member.role}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${member.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-text-secondary">{member.lastActive}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-text-secondary hover:text-white">
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
