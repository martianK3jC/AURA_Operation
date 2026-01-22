import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, CheckCircle, Info, UserCog } from 'lucide-react';
import { DemoRecommendation } from '../data/demoData';

interface RecommendationCardProps {
    recommendation: DemoRecommendation;
    onAccept: (recommendationId: number) => void;
    onDismiss: (recommendationId: number) => void;
    autoDismissSeconds?: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
    recommendation,
    onAccept,
    onDismiss,
    autoDismissSeconds = 30
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState(autoDismissSeconds);

    // Slide in animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Auto-dismiss countdown
    useEffect(() => {
        if (recommendation.status !== 'pending') return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    onDismiss(recommendation.id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [recommendation.status, recommendation.id, onDismiss]);

    const handleAccept = () => {
        onAccept(recommendation.id);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(() => onDismiss(recommendation.id), 300);
    };

    if (recommendation.status !== 'pending') return null;

    return (
        <div
            className={`fixed bottom-28 right-6 md:right-8 w-[380px] max-w-[calc(100vw-3rem)] z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
        >
            {/* Recommendation Card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-amber-900/40 via-amber-800/30 to-orange-900/40 backdrop-blur-xl border-2 border-amber-500/40 shadow-2xl overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-xl opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center border border-amber-500/50 flex-shrink-0">
                                <UserCog className="w-5 h-5 text-amber-300" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">AI Recommendation</h3>
                                    <div className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40">
                                        <span className="text-xs font-bold text-amber-300">{recommendation.confidence}%</span>
                                    </div>
                                </div>
                                <h4 className="text-base font-bold text-white leading-tight">{recommendation.title}</h4>
                            </div>
                        </div>

                        <button
                            onClick={handleDismiss}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
                            aria-label="Dismiss recommendation"
                        >
                            <X className="w-4 h-4 text-white/70" />
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/80 leading-relaxed mb-4">
                        {recommendation.description}
                    </p>

                    {/* Suggested Staff (if any) */}
                    {recommendation.suggestedStaff && recommendation.suggestedStaff.length > 0 && (
                        <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Suggested Staff</p>
                            <div className="flex flex-wrap gap-2">
                                {recommendation.suggestedStaff.map((staffId, index) => (
                                    <div
                                        key={staffId}
                                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-xs font-medium text-amber-300"
                                    >
                                        Officer {index + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleAccept}
                            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300"
                        >
                            Dismiss
                        </button>
                    </div>

                    {/* Auto-dismiss countdown */}
                    <div className="mt-3 flex items-center justify-center gap-2">
                        <Info className="w-3 h-3 text-white/40" />
                        <p className="text-xs text-white/40">
                            Auto-dismiss in {timeLeft}s
                        </p>
                    </div>
                </div>

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/0 animate-pulse"></div>
            </div>
        </div>
    );
};

export default RecommendationCard;
