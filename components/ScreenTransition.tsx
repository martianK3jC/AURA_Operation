import React, { useEffect, useState } from 'react';

interface ScreenTransitionProps {
    children: React.ReactNode;
    transitionKey: string;
}

const ScreenTransition: React.FC<ScreenTransitionProps> = ({ children, transitionKey }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Trigger animation on mount and when key changes
        setIsAnimating(false);
        const timer = setTimeout(() => setIsAnimating(true), 10);
        return () => clearTimeout(timer);
    }, [transitionKey]);

    return (
        <div
            className={`w-full h-full transition-all duration-300 ease-out ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
        >
            {children}
        </div>
    );
};

export default ScreenTransition;
