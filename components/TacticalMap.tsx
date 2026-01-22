import React from 'react';
import { Users, MapPin, AlertTriangle } from 'lucide-react';
import GlassCard from './GlassCard';
import floorPlan from '../img/rfid-crowd-density.png';

interface TacticalMapProps {
    systemStatus: 'nominal' | 'alert';
}

const TacticalMap: React.FC<TacticalMapProps> = ({ systemStatus }) => {
    return (
        <div className="w-full">
            <GlassCard variant="dark" className="p-4 md:p-6 lg:p-8">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                    Terminal Floor Plan
                </h3>

                {/* Map Container */}
                <div className="relative w-full bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden">
                    {/* Embedded Image */}
                    <img
                        src={floorPlan}
                        alt="Terminal Floor Plan"
                        className="w-full h-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    />

                    {/* Overlay for Check-in Area */}
                    <div className="absolute top-[15%] left-[20%] md:top-[18%] md:left-[22%]">
                        <div className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl backdrop-blur-md border-2 ${systemStatus === 'alert'
                            ? 'bg-red-500/20 border-red-500/50'
                            : 'bg-emerald-500/20 border-emerald-500/50'
                            }`}>
                            <div className="flex items-center gap-2 mb-1">
                                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${systemStatus === 'alert' ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'
                                    }`}></div>
                                <span className="text-xs md:text-sm font-bold text-white">Security Checkpoint</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-3 h-3 md:w-4 md:h-4 text-white/70" />
                                <span className={`text-lg md:text-2xl font-black ${systemStatus === 'alert' ? 'text-red-400' : 'text-emerald-400'
                                    }`}>
                                    320
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Zone Markers */}
                    <div className="absolute bottom-[20%] right-[15%] md:bottom-[22%] md:right-[18%]">
                        <div className="px-2 py-1.5 md:px-3 md:py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 backdrop-blur-sm">
                            <span className="text-xs md:text-sm font-bold text-blue-400">Gates Area</span>
                        </div>
                    </div>

                    {/* Alert Indicator (if alert status) */}
                    {systemStatus === 'alert' && (
                        <div className="absolute top-4 right-4 md:top-6 md:right-6">
                            <div className="px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-red-500/20 border-2 border-red-500/50 backdrop-blur-md flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400 animate-pulse" />
                                <span className="text-xs md:text-sm font-bold text-red-400 uppercase">Alert Mode</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="mt-4 md:mt-6 flex flex-wrap gap-3 md:gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-400"></div>
                        <span className="text-xs md:text-sm text-white/70">Normal (&lt;70%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-amber-400"></div>
                        <span className="text-xs md:text-sm text-white/70">Warning (70-85%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-400"></div>
                        <span className="text-xs md:text-sm text-white/70">Critical (&gt;85%)</span>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};

export default TacticalMap;
