import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles, X } from 'lucide-react';

interface Message {
    id: number;
    type: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

interface OperatorChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

const OperatorChatbot: React.FC<OperatorChatbotProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: 'ai',
            text: "Hello! I'm AURA's AI Assistant for AOCC operations. I can interpret complex data to help you make decisions.\n\nTry asking:\n• \"Does this lounge need more chairs?\"\n• \"Which gates will be congested soon?\"\n• \"Where should I deploy staff?\"",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAIResponse = (userQuery: string): string => {
        const query = userQuery.toLowerCase();

        // Gate congestion queries
        if (query.includes('gate') && (query.includes('congested') || query.includes('busy') || query.includes('crowded'))) {
            return "Based on current flight schedules and boarding times:\n\n**Gates with High Congestion (Next 30 min):**\n• Gate 12: 85% capacity (PR123 to Manila, boarding at 3:45 PM)\n• Gate 14: 78% capacity (CEB456 to Tokyo, boarding at 4:00 PM)\n• Gate 16: 72% capacity (5J789 to Singapore, boarding at 4:10 PM)\n\n**Recommendation:** Consider early boarding announcement for PR123 to distribute passenger flow. Adjacent Gate 11 has only 35% occupancy and can accommodate overflow.";
        }

        // Staff deployment queries
        if (query.includes('staff') || query.includes('deploy') || query.includes('personnel')) {
            return "**Staff Deployment Recommendation (Next Hour):**\n\nBased on predictive analysis of flight manifests and current queue lengths:\n\n• **Immigration:** Deploy 2 additional officers to Counters 4-6 by 3:15 PM\n  - Peak expected: 3:15-4:00 PM (240 arriving passengers)\n  - Current wait: 8 min → Projected: 18 min without action\n\n• **Security Checkpoint A:** Reduce by 1 officer at 3:30 PM\n  - Low volume period begins 3:30 PM\n  - Redeploy to Immigration\n\n• **Check-in Area B:** Maintain current staffing\n  - Steady moderate flow predicted\n\nThis reallocation will reduce Immigration wait time from 18 min to 9 min.";
        }

        // Lounge queries
        if (query.includes('lounge') || (query.includes('need') && query.includes('chair'))) {
            return "**PAGSS Lounge Capacity Analysis:**\n\nCurrent Status:\n• Occupancy: 78% (47/60 seats)\n• Trend: ↑ Increasing\n\nForecast (Next 30 min):\n• Expected Occupancy: 92% (55/60 seats)\n• Peak Time: 3:45-4:15 PM\n\n**Recommendation:** Yes, the lounge needs more capacity. Add 12 temporary seats in Zone B (near windows). Priority Pass holders from PR123 and CEB456 will arrive between 3:30-3:45 PM.\n\n**Alternative:** Direct overflow to Restaurant Area C (currently 45% occupied, 15 seats available).";
        }

        // Security/baggage queries
        if (query.includes('security') && query.includes('wait')) {
            return "**Security Checkpoint Wait Times:**\n\nCheckpoint A (Domestic):\n• Current: 12 minutes\n• Forecast (30 min): 8 minutes ↓\n• Status: ✅ Optimal\n\nCheckpoint B (International):\n• Current: 35 minutes ⚠️\n• Forecast (30 min): 28 minutes\n• Status: ⚠️ High\n\n**Recommendation:** Open Lane 4 at Checkpoint B immediately. This will reduce wait time to 18 minutes within 15 minutes.";
        }

        // Arrival/transportation queries
        if (query.includes('arrival') || query.includes('grab') || query.includes('taxi') || query.includes('transportation')) {
            return "**Ground Transportation Demand (Arrivals):**\n\nCurrent Demand:\n• Grab: 68 active rides\n• Taxi: 42 rides, 12 taxis available\n• Shuttle: 14 passengers waiting\n\nNext 30 Minutes:\n• CEB890 from Manila landing at 3:30 PM (142 passengers)\n• Expected surge: +55 ride requests\n\n**Recommendations:**\n1. Alert Grab drivers of incoming demand spike\n2. Position 5 additional taxis at Bay A by 3:25 PM\n3. Announce shuttle departure at 3:35 PM to absorb overflow\n\nThis will prevent 15-20 minute pickup delays.";
        }

        // General status queries
        if (query.includes('status') || query.includes('overview') || query.includes('summary')) {
            return "**AOCC System Overview:**\n\n✅ **Operational Status:** Nominal\n\n**Key Metrics:**\n• Total Passengers (1hr): 2,450\n• Avg Wait (Security): 12 min\n• Active Alerts: 2\n• Staff Coverage: 94%\n\n**Attention Needed:**\n⚠️ Gate 12 approaching capacity\n⚠️ Immigration queue trending up\n\n**All Good:**\n✅ Check-in flowing smoothly\n✅ Baggage claim on schedule\n✅ Ground transportation balanced\n\nNo critical issues. System running optimally.";
        }

        // Fallback response
        return "I can help you with:\n\n• **Gate Management:** \"Which gates will be congested?\"\n• **Staff Deployment:** \"Where should I deploy staff?\"\n• **Facility Status:** \"Does the lounge need more chairs?\"\n• **Wait Times:** \"How long is security wait?\"\n• **Transportation:** \"What's the taxi demand?\"\n• **System Overview:** \"Give me a status summary\"\n\nWhat would you like to know?";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            type: 'user',
            text: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking + respond
        setTimeout(() => {
            const aiResponse: Message = {
                id: Date.now() + 1,
                type: 'ai',
                text: getAIResponse(input),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1200);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold flex items-center gap-2">
                                AURA AI Assistant
                                <Sparkles size={16} className="text-yellow-300" />
                            </h3>
                            <p className="text-white/80 text-xs">Operational Decision Support</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                        aria-label="Close AI Assistant"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in slide-in-from-bottom duration-200`}
                        >
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'ai'
                                ? 'bg-gradient-to-br from-orange-500 to-red-600'
                                : 'bg-neutral-700'
                                }`}>
                                {msg.type === 'ai' ? (
                                    <Bot size={18} className="text-white" />
                                ) : (
                                    <UserIcon size={18} className="text-white" />
                                )}
                            </div>

                            {/* Message */}
                            <div className={`max-w-[75%] ${msg.type === 'ai'
                                ? 'bg-neutral-800 border border-neutral-700'
                                : 'bg-gradient-to-br from-orange-600 to-red-600'
                                } rounded-2xl p-3 ${msg.type === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                                <p className="text-white text-sm whitespace-pre-line leading-relaxed">
                                    {msg.text}
                                </p>
                                <span className="text-xs text-white/50 mt-2 block">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex gap-3 animate-in slide-in-from-bottom duration-200">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl rounded-tl-none p-4 flex gap-1">
                                <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-neutral-900 border-t border-neutral-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about gates, staff, facilities..."
                            className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            aria-label="Send Message"
                        >
                            <Send size={20} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperatorChatbot;
