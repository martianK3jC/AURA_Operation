
import React from 'react';

const Loader = ({ text = 'Loading...' }: { text?: string }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white font-medium animate-pulse">{text}</p>
        </div>
    </div>
);

export default Loader;
