import React from 'react';

interface SkeletonLoaderProps {
    variant?: 'card' | 'text' | 'circle' | 'timeline' | 'feed';
    count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant = 'card', count = 1 }) => {
    const skeletons = Array.from({ length: count }, (_, i) => i);

    if (variant === 'card') {
        return (
            <>
                {skeletons.map((i) => (
                    <div key={i} className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm animate-pulse">
                        <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                    </div>
                ))}
            </>
        );
    }

    if (variant === 'timeline') {
        return (
            <div className="space-y-4">
                {skeletons.map((i) => (
                    <div key={i} className="flex items-start gap-5 pl-12 animate-pulse">
                        <div className="w-10 h-10 bg-neutral-300 rounded-full"></div>
                        <div className="flex-1 bg-white border border-neutral-200 rounded-xl p-5 min-h-[120px]">
                            <div className="h-5 bg-neutral-200 rounded w-1/2 mb-3"></div>
                            <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === 'feed') {
        return (
            <div className="bg-neutral-900 rounded-xl aspect-video flex items-center justify-center animate-pulse">
                <div className="text-neutral-600">
                    <svg className="animate-spin h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        );
    }

    if (variant === 'circle') {
        return (
            <>
                {skeletons.map((i) => (
                    <div key={i} className="w-12 h-12 bg-neutral-200 rounded-full animate-pulse"></div>
                ))}
            </>
        );
    }

    // text variant
    return (
        <div className="space-y-2">
            {skeletons.map((i) => (
                <div key={i} className="h-4 bg-neutral-200 rounded w-full animate-pulse"></div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
