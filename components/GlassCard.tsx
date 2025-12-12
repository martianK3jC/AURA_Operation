import * as React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    /**
     * Visual variant following Tropical Modern design system
     * - default: Clean white card with subtle shadow
     * - elevated: White card with stronger shadow
     * - highlight: Warm orange-to-yellow gradient background
     * - success: Green tinted background
     * - warning: Amber tinted background
     * - error: Red tinted background
     */
    variant?: 'default' | 'elevated' | 'highlight' | 'success' | 'warning' | 'error' | 'dark';
    onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    variant = 'default',
    onClick
}) => {
    const isClickable = !!onClick;

    const variants = {
        // Clean white cards
        default: 'bg-white border-neutral-200 shadow-sm',
        elevated: 'bg-white border-neutral-200 shadow-lg',

        // Warm highlight (for current/active states)
        highlight: 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 shadow-sm',

        // Semantic states
        success: 'bg-green-50 border-green-200 shadow-sm',
        warning: 'bg-amber-50 border-amber-200 shadow-sm',
        error: 'bg-red-50 border-red-300 shadow-sm',
        dark: 'bg-black/40 border-white/10 shadow-lg text-white',
    };

    return (
        <div
            className={`
        ${variants[variant]}
        border
        rounded-xl
        transition-all
        duration-200
        backdrop-blur-sm
        ${isClickable ? 'cursor-pointer hover:shadow-lg active:scale-[0.99]' : ''}
        ${className}
      `}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default GlassCard;
