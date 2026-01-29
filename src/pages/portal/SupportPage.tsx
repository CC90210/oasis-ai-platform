import { useEffect, useState } from 'react';
import { supabase, SupportTicket, getCurrentUser } from '@/lib/supabase';
import { HelpCircle, MessageSquare, Mail, Plus, X, Loader2 } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatRelativeTime } from '@/lib/formatters';

export default function SupportPage() {
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newTicket, setNewTicket] = useState({ subject: '', description: '', priority: 'medium' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('support_tickets')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            setTickets(data || []);
        } catch (err) {
            console.error('Error loading tickets:', err);
        } finally {
            setLoading(false);
        }
    };

    const createTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('support_tickets')
                .insert({
                    user_id: user.id,
                    subject: newTicket.subject,
                    description: newTicket.description,
                    priority: newTicket.priority,
                    status: 'open',
                });

            if (error) throw error;

            setNewTicket({ subject: '', description: '', priority: 'medium' });
            setShowModal(false);
            loadTickets(); // Refresh list
        } catch (err) {
            console.error('Error creating ticket:', err);
            alert('Failed to create ticket.');
        } finally {
            setSubmitting(false);
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'text-red-400 bg-red-500/10 border-red-500/20';
            case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
            default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        }
    };

    if (loading) {
        return <PortalLayout><div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-cyan-500 w-8 h-8" /></div></PortalLayout>;
    }

    return (
        <PortalLayout>
            <div className="p-8 max-w-5xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                            <HelpCircle className="w-8 h-8 text-cyan-500" />
                            Support Center
                        </h1>
                        <p className="text-[var(--text-secondary)] mt-2">Get help with your automations and account.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-cyan-600 hover:bg-cyan-500 text-[var(--text-primary)] font-medium px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-900/20 transition hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        Create Ticket
                    </button>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-6 rounded-2xl">
                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Contact Options</h3>

                            <div className="space-y-4">
                                <a href="mailto:oasisaisolutions@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition border border-[var(--border)] group">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-primary)] font-medium">Email Support</p>
                                        <p className="text-xs text-[var(--text-muted)]">Usually 24h response</p>
                                    </div>
                                </a>

                                <a href="tel:+12403325062" className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition border border-[var(--border)] group">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-primary)] font-medium">Phone Support</p>
                                        <p className="text-xs text-[var(--text-muted)]">Mon-Fri, 9am-5pm EST</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Ticket List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Your Tickets</h3>

                        {tickets.length === 0 ? (
                            <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-12 rounded-2xl text-center border-dashed">
                                <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--border)]">
                                    <MessageSquare className="w-8 h-8 text-[var(--text-muted)]" />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Support Tickets</h3>
                                <p className="text-[var(--text-muted)]">You haven't submitted any support requests yet.</p>
                            </div>
                        ) : (
                            tickets.map(ticket => (
                                <div key={ticket.id} className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-6 rounded-xl hover:border-cyan-500/30 transition group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-[var(--text-primary)] font-bold text-lg group-hover:text-cyan-400 transition">{ticket.subject}</h4>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getPriorityColor(ticket.priority)}`}>
                                            {ticket.priority}
                                        </span>
                                    </div>
                                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">{ticket.description}</p>
                                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-t border-[var(--bg-tertiary)] pt-4">
                                        <span>ID: {ticket.id.slice(0, 8)}</span>
                                        <div className="flex items-center gap-4">
                                            <span>{formatRelativeTime(ticket.created_at)}</span>
                                            <span className={`capitalize px-2 py-0.5 rounded ${ticket.status === 'open' ? 'bg-blue-500/20 text-blue-400' :
                                                ticket.status === 'resolved' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-[var(--text-secondary)]'
                                                }`}>
                                                {ticket.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Create Ticket Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                        <div className="relative bg-[var(--bg-card-strong)] border border-[var(--border)] w-full max-w-lg rounded-2xl p-6 shadow-2xl">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Create Support Ticket</h2>

                            <form onSubmit={createTicket} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={newTicket.subject}
                                        onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                                        className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-cyan-500"
                                        placeholder="Brief summary of the issue"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Priority</label>
                                        <select
                                            value={newTicket.priority}
                                            onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                                            className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-cyan-500"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="urgent">Urgent</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={newTicket.description}
                                        onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                        className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 resize-none"
                                        placeholder="Please provide details about your request..."
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-[var(--text-primary)] rounded-lg font-medium transition disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Submit Ticket
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
