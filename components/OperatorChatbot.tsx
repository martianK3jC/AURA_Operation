import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles, X, Zap, ChevronRight } from 'lucide-react';

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

const SUGGESTIONS = [
    { label: "High traffic gates?", query: "Which gates will be congested soon?" },
    { label: "Staff needed?", query: "Where should I deploy staff?" },
    { label: "Lounge status", query: "Does the lounge need more chairs?" },
    { label: "Security wait times", query: "How long is security wait?" },
];

const OperatorChatbot: React.FC<OperatorChatbotProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: 'ai',
            text: "Hello! I'm AURA's AI Assistant for AOCC operations. I can interpret complex data to help you make decisions.\n\nTry asking about gate congestion, staff deployment, or facility status.",
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
            return "**Staff Deployment Recommendation (Next Hour):**\n\nBased on predictive analysis of flight manifests and current queue lengths:\n\n• **Security Checkpoint:** Deploy 3 additional officers to Lanes 3-5 by 3:15 PM\n  - Peak expected: 3:15-4:00 PM (Passenger Surge)\n  - Current wait: 18 min → Projected: 45 min without action\n\n• **Immigration:** Reduce by 2 officers at 3:30 PM\n  - Low volume period begins 3:30 PM\n  - Redeploy to Security Checkpoint\n\n• **Check-in Area B:** Maintain current staffing\n  - Steady moderate flow predicted\n\nThis reallocation will reduce Security wait time from 45 min to 15 min.";
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

    const handleSend = (text: string = input) => {
        if (!text.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            type: 'user',
            text: text.trim(),
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
                text: getAIResponse(text),
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
            <div className="bg-neutral-900 border border-neutral-700/50 rounded-2xl shadow-2xl w-full max-w-2xl h-[650px] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 ring-1 ring-white/10">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 via-red-600 to-red-700 p-4 flex items-center justify-between shrink-0 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold flex items-center gap-2 text-lg tracking-tight">
                                AURA Assistant
                                <Sparkles size={16} className="text-yellow-300 animate-pulse" />
                            </h3>
                            <p className="text-orange-100/90 text-xs font-medium">Operational Decision Support</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="relative z-10 w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                        aria-label="Close AI Assistant"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-neutral-950/50 scroll-smooth">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in slide-in-from-bottom-2 duration-300`}
                        >
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.type === 'ai'
                                ? 'bg-gradient-to-br from-orange-500 to-red-600 border border-orange-400/30'
                                : 'bg-neutral-700 border border-neutral-600'
                                }`}>
                                {msg.type === 'ai' ? (
                                    <Bot size={16} className="text-white" />
                                ) : (
                                    <UserIcon size={16} className="text-neutral-200" />
                                )}
                            </div>

                            {/* Message */}
                            <div className={`max-w-[75%] shadow-md ${msg.type === 'ai'
                                ? 'bg-neutral-800 border border-neutral-700'
                                : 'bg-gradient-to-br from-orange-600 to-red-600 text-white'
                                } rounded-2xl p-4 ${msg.type === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}>
                                <p className={`text-sm whitespace-pre-line leading-relaxed ${msg.type === 'ai' ? 'text-neutral-200' : 'text-white'}`}>
                                    {msg.text}
                                </p>
                                <span className={`text-[10px] uppercase font-medium mt-2 block ${msg.type === 'ai' ? 'text-neutral-500' : 'text-white/60'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex gap-3 animate-in slide-in-from-bottom duration-200">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center border border-orange-400/30">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center h-[52px]">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-neutral-900/95 border-t border-neutral-800 p-4 space-y-3 shrink-0 backdrop-blur-xl">

                    {/* Quick Suggestion Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {SUGGESTIONS.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(suggestion.query)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-orange-500/50 transition-all text-xs font-medium text-neutral-300 hover:text-orange-400 whitespace-nowrap group"
                            >
                                <Zap size={12} className="text-orange-500 group-hover:fill-orange-500 transition-colors" />
                                {suggestion.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3 items-end">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about gates, staff, facilities..."
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-4 pr-12 py-3.5 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 text-sm transition-all shadow-inner"
                            />
                            <div className="absolute right-3 bottom-3 text-xs text-neutral-600 font-mono pointer-events-none border border-neutral-800 rounded px-1.5 py-0.5">
                                ↵
                            </div>
                        </div>
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            className="h-[46px] w-[46px] rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none bg-[length:200%_200%] animate-gradient-xy"
                            aria-label="Send Message"
                        >
                            <Send size={20} className="text-white ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperatorChatbot;
