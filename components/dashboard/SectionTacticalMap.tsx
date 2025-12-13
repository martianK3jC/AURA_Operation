import React from 'react';
import { PredictiveHeatmapVisualization } from '../PredictiveHeatmapVisualization';

interface SectionTacticalMapProps {
    systemStatus: 'nominal' | 'alert';
    showToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

const SectionTacticalMap: React.FC<SectionTacticalMapProps> = ({ systemStatus, showToast }) => {
    return (
        <section className="min-h-screen snap-start relative flex flex-col p-6 md:p-12 border-b border-white/5 bg-neutral-900/30">
            <div className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col">
                {/* Section Header */}
                <div className="flex justify-between items-end mb-8">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black text-white uppercase tracking-tight">Terminal Heatmap</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <p className="text-sm font-mono text-emerald-400 tracking-wider">LIVE DATA FEED • UPDATING</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-2">
                        {/* Legend or specialized controls could go here */}
                    </div>
                </div>

                {/* THE MASSIVE HEATMAP CONTAINER */}
                <div className="flex-1 w-full bg-neutral-900/50 rounded-3xl border border-white/10 overflow-hidden relative backdrop-blur-sm">
                    <PredictiveHeatmapVisualization
                        systemStatus={systemStatus}
                        showToast={showToast}
                    />
                </div>
            </div>
        </section>
    );
};

export default SectionTacticalMap;
