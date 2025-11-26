import React, { useState } from 'react';
import { Send, Paperclip, Bot, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatPage = () => {
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
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl border border-oasis-slate/10 shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-oasis-slate/10 flex items-center justify-between bg-oasis-pearl/30">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-oasis-teal to-oasis-deep-ocean flex items-center justify-center text-white">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-oasis-midnight">OASIS Assistant</h2>
                        <div className="flex items-center gap-2 text-xs text-oasis-slate">
                            <span className="h-2 w-2 rounded-full bg-oasis-mint animate-pulse"></span>
                            Online • GPT-4 Turbo
                        </div>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
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
              ${msg.role === 'assistant' ? 'bg-oasis-teal/10 text-oasis-teal' : 'bg-oasis-midnight text-white'}`}>
                            {msg.role === 'assistant' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </div>
                        <div className={`max-w-[80%] rounded-2xl p-4 
              ${msg.role === 'assistant'
                                ? 'bg-oasis-pearl text-oasis-midnight rounded-tl-none'
                                : 'bg-oasis-teal text-white rounded-tr-none'}`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-oasis-slate/10 bg-white">
                <form onSubmit={handleSend} className="flex gap-4">
                    <Button type="button" variant="ghost" size="icon" className="text-oasis-slate hover:text-oasis-teal">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-oasis-pearl/50 border border-oasis-slate/20 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-oasis-teal/50"
                    />
                    <Button type="submit" className="bg-oasis-teal hover:bg-oasis-deep-ocean text-white" disabled={!input.trim()}>
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
