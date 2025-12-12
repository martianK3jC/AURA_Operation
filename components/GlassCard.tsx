
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'light' | 'dark';
    children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({
    className,
    variant = 'light',
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                "backdrop-blur-md border shadow-lg transition-all duration-300",
                variant === 'dark'
                    ? "bg-black/40 border-white/10 text-white"
                    : "bg-white/40 border-white/20 text-slate-800",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassCard;
