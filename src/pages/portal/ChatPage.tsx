import React, { useState } from 'react';
import { Send, Paperclip, Bot, User, FileText, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/authStore';

const ChatPage = () => {
    const { discountCode } = useAuth();
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: "Hello! I'm your OASIS AI assistant. I have access to your automations and knowledge base. How can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages([...messages, newMessage]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                role: 'assistant',
                content: "I'm processing your request. As this is a demo, I can't actually execute actions yet, but I'm ready to be connected to your backend!",
                timestamp: new Date()
            }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-bg-secondary rounded-xl border border-white/10 shadow-sm overflow-hidden">

            {/* Discount Banner */}
            {discountCode && (
                <div className="bg-gradient-to-r from-oasis-cyan/20 to-blue-600/20 border-b border-oasis-cyan/20 p-3 flex items-center justify-center gap-4 animate-pulse-glow">
                    <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-oasis-cyan" />
                        <span className="text-white font-medium text-sm">Welcome! Here is your 10% discount code:</span>
                    </div>
                    <div className="bg-bg-primary border border-oasis-cyan/30 px-4 py-1 rounded font-mono text-oasis-cyan font-bold tracking-wider select-all cursor-pointer hover:bg-oasis-cyan/10 transition-colors">
                        {discountCode}
                    </div>
                </div>
            )}

            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-bg-tertiary">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-oasis-cyan to-blue-600 flex items-center justify-center text-bg-primary">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-white">OASIS Assistant</h2>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
                            Online • GPT-4 Turbo
                        </div>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs border-white/10 text-text-secondary hover:text-white hover:bg-white/5">
                    <FileText className="h-3 w-3 mr-2" />
                    View Context
                </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 
              ${msg.role === 'assistant' ? 'bg-oasis-cyan/10 text-oasis-cyan' : 'bg-bg-tertiary text-white'}`}>
                            {msg.role === 'assistant' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </div>
                        <div className={`max-w-[80%] rounded-2xl p-4 
              ${msg.role === 'assistant'
                                ? 'bg-bg-tertiary text-white rounded-tl-none'
                                : 'bg-oasis-cyan text-bg-primary rounded-tr-none'}`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-bg-secondary">
                <form onSubmit={handleSend} className="flex gap-4">
                    <Button type="button" variant="ghost" size="icon" className="text-text-secondary hover:text-oasis-cyan hover:bg-white/5">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-bg-tertiary border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-oasis-cyan/50 placeholder-text-tertiary"
                    />
                    <Button type="submit" className="bg-oasis-cyan hover:bg-oasis-cyan/80 text-bg-primary font-bold" disabled={!input.trim()}>
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
