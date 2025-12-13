import * as React from 'react';
import { ScreenId } from '../types';

interface OperatorLayoutProps {
    children: React.ReactNode;
    currentScreen: ScreenId;
    onNavigate: (screen: ScreenId) => void;
}

const OperatorLayout: React.FC<OperatorLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-[100dvh] font-sans flex relative bg-neutral-950 text-white selection:bg-yellow-500 selection:text-white">
            {/* Ambient Blobs - Operator Theme (Gold/Yellow) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="blob w-[350px] h-[350px] md:w-[400px] md:h-[400px] top-[-75px] left-[-75px] md:top-[-100px] md:left-[-100px] animate-pulse-slow bg-gradient-to-br from-yellow-500/8 via-amber-500/8 to-orange-400/8 rounded-full blur-3xl" />
                <div className="blob w-[350px] h-[350px] md:w-[400px] md:h-[400px] bottom-[-75px] right-[-75px] md:bottom-[-100px] md:right-[-100px] bg-gradient-to-br from-amber-600/8 via-yellow-500/8 to-orange-500/8 rounded-full blur-3xl" />
            </div>

            {/* MAIN CONTENT - Full Width */}
            <main className="flex-1 flex flex-col relative z-10 w-full">
                {children}
            </main>
        </div>
    );
};

export default OperatorLayout;
