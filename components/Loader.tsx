import React from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
    text?: string;
}

const Loader: React.FC<Props> = ({ text = "System Initializing..." }) => {
    return (
        <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center z-50">
            <div className="relative w-24 h-24 mb-6">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-t-2 border-orange-500 rounded-full animate-spin"></div>
                {/* Inner Ring */}
                <div className="absolute inset-2 border-r-2 border-yellow-400 rounded-full animate-reverse-spin"></div>
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-orange-500 animate-pulse" size={32} />
                </div>
            </div>

            <div className="flex flex-col items-center space-y-2">
                <h2 className="text-xl font-bold text-[#FFEBEE] tracking-widest uppercase animate-pulse">
                    {text}
                </h2>
                <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
