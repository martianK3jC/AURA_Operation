import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: string;
    height?: string;
    animation?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'text',
    width,
    height,
    animation = true
}) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'circular':
                return 'rounded-full';
            case 'rectangular':
                return 'rounded-none';
            case 'rounded':
                return 'rounded-xl';
            case 'text':
            default:
                return 'rounded';
        }
    };

    const baseClass = `bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${animation ? 'animate-shimmer bg-[length:200%_100%]' : ''
        }`;

    const style: React.CSSProperties = {
        width: width || '100%',
        height: height || (variant === 'text' ? '1em' : '100%'),
    };

    return (
        <div
            className={`${baseClass} ${getVariantClass()} ${className}`}
            style={style}
        />
    );
};

// Timeline Skeleton
export const TimelineSkeleton: React.FC = () => {
    return (
        <div className="space-y-6 px-6 py-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4">
                    <Skeleton variant="circular" width="40px" height="40px" />
                    <div className="flex-1 space-y-2">
                        <Skeleton width="60%" height="20px" />
                        <Skeleton width="40%" height="16px" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// Card Skeleton
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
    return (
        <div className="space-y-4 px-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3 mb-3">
                        <Skeleton variant="circular" width="48px" height="48px" />
                        <div className="flex-1 space-y-2">
                            <Skeleton width="70%" height="18px" />
                            <Skeleton width="50%" height="14px" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton width="100%" height="12px" />
                        <Skeleton width="80%" height="12px" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// Destination Card Skeleton
export const DestinationSkeleton: React.FC = () => {
    return (
        <div className="px-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                        <Skeleton variant="rounded" width="40px" height="40px" />
                        <div className="flex-1 space-y-2">
                            <Skeleton width="60%" height="16px" />
                            <Skeleton width="80%" height="12px" />
                            <div className="flex gap-4 mt-2">
                                <Skeleton width="60px" height="10px" />
                                <Skeleton width="60px" height="10px" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Profile Stats Skeleton
export const ProfileStatsSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-3 px-6 mb-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
                    <Skeleton width="50px" height="24px" className="mb-1" />
                    <Skeleton width="60px" height="12px" />
                </div>
            ))}
        </div>
    );
};

// Map Skeleton
export const MapSkeleton: React.FC = () => {
    return (
        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <Skeleton variant="circular" width="64px" height="64px" className="mx-auto mb-3" />
                    <Skeleton width="120px" height="16px" className="mx-auto mb-2" />
                    <Skeleton width="160px" height="12px" className="mx-auto" />
                </div>
            </div>
            {/* Animated shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
        </div>
    );
};

export default Skeleton;
