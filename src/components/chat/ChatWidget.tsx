import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [sessionId, setSessionId] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const WEBHOOK_URL = 'https://n8n.srv993801.hstgr.cloud/webhook/fdf7476a-94e7-41e5-a558-9058fed6987b';

    // Generate/load session ID
    useEffect(() => {
        const stored = sessionStorage.getItem('oasis_chat_session');
        if (stored) {
            setSessionId(stored);
            // Load conversation history
            const history = sessionStorage.getItem('oasis_chat_history');
            if (history) {
                setMessages(JSON.parse(history));
            }
        } else {
            const newId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('oasis_chat_session', newId);
            setSessionId(newId);
            // Add initial greeting
            const greeting: Message = {
                role: 'assistant',
                content: "Hey! 👋 I'm Archer from OASIS AI. How can I help you today?"
            };
            setMessages([greeting]);
            sessionStorage.setItem('oasis_chat_history', JSON.stringify([greeting]));
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const saveHistory = (newMessages: Message[]) => {
        const recentMessages = newMessages.slice(-20);
        sessionStorage.setItem('oasis_chat_history', JSON.stringify(recentMessages));
    };

    const sendMessage = async () => {
        const message = inputValue.trim();
        if (!message || isLoading) return;

        // Add user message
        const userMessage: Message = { role: 'user', content: message };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    message,
                    conversationHistory: updatedMessages,
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname,
                    referrer: document.referrer || 'direct'
                })
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Get response as text first to see what we're dealing with
            const responseText = await response.text();
            console.log('Response text:', responseText);

            // Try to parse as JSON, fall back to plain text
            let botResponse = '';
            try {
                const data = JSON.parse(responseText);
                console.log('Parsed JSON:', data);

                // Handle various n8n response formats
                if (typeof data === 'string') {
                    botResponse = data;
                } else if (data.output) {
                    botResponse = data.output;
                } else if (data.response) {
                    botResponse = data.response;
                } else if (data.text) {
                    botResponse = data.text;
                } else if (data.message) {
                    botResponse = data.message;
                } else if (data.data && typeof data.data === 'string') {
                    botResponse = data.data;
                } else if (data.data && data.data.output) {
                    botResponse = data.data.output;
                } else {
                    // If none of the expected fields, stringify the whole thing
                    botResponse = JSON.stringify(data);
                }
            } catch (e) {
                // Not JSON, use as plain text
                botResponse = responseText;
            }

            console.log('Bot response:', botResponse);

            const botMessage: Message = { role: 'assistant', content: botResponse };
            const finalMessages = [...updatedMessages, botMessage];
            setMessages(finalMessages);
            saveHistory(finalMessages);

        } catch (error) {
            console.error('Chat error details:', error);

            let errorMsg = "I'm having trouble connecting. ";

            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                errorMsg += "Network error - please check your internet connection or try again.";
            } else if (error instanceof Error) {
                errorMsg += `Error: ${error.message}. `;
            }

            errorMsg += "\n\nYou can reach us directly at:\n📧 oasisaisolutions@gmail.com\n📞 705-440-3117";

            const errorMessage: Message = {
                role: 'assistant',
                content: errorMsg
            };
            const finalMessages = [...updatedMessages, errorMessage];
            setMessages(finalMessages);
            saveHistory(finalMessages);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9999] w-[60px] h-[60px] rounded-full bg-[#00D4FF] hover:bg-[#00B8E6] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_4px_20px_rgba(0,212,255,0.4),0_0_40px_rgba(0,212,255,0.2)]"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-[#0A0A0F]" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-[#0A0A0F]" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-[100px] right-6 z-[9998] w-[380px] h-[520px] bg-[#0D1117] border border-[#00D4FF]/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,212,255,0.1)] flex flex-col overflow-hidden animate-slide-up max-[480px]:w-[calc(100vw-32px)] max-[480px]:h-[calc(100vh-120px)] max-[480px]:bottom-20 max-[480px]:right-4 max-[480px]:left-4">

                    {/* Header */}
                    <div className="px-5 py-4 bg-gradient-to-br from-[#0A0A0F] to-[#0D1117] border-b border-[#00D4FF]/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center text-[#0A0A0F] font-bold text-base">
                                A
                            </div>
                            <div>
                                <div className="text-white font-semibold text-[15px]">Archer - OASIS AI</div>
                                <div className="text-[#00FF88] text-xs flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></span>
                                    Online now
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-white/10 text-[#8B949E] hover:text-white transition-colors"
                            aria-label="Close chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed animate-fade-in ${msg.role === 'user'
                                    ? 'ml-auto bg-[#00D4FF] text-[#0A0A0F] rounded-br-sm'
                                    : 'bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-white rounded-bl-sm'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isLoading && (
                            <div className="flex gap-1 p-3 max-w-[85%]">
                                <span className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-[#0A0A0F] border-t border-[#00D4FF]/10 flex gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00D4FF] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] transition-all placeholder-white/40"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            className="w-11 h-11 rounded-xl bg-[#00D4FF] hover:bg-[#00B8E6] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105"
                            aria-label="Send message"
                        >
                            <Send className="w-5 h-5 text-[#0A0A0F]" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
