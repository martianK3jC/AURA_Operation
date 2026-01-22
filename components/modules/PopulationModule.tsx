import React from 'react';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';
import GlassCard from '../GlassCard';
import { ZoneData } from '../../data/demoData';

interface PopulationModuleProps {
    zones: ZoneData[];
}

const PopulationModule: React.FC<PopulationModuleProps> = ({ zones }) => {
    const totalOccupancy = zones.reduce((sum, zone) => sum + zone.currentOccupancy, 0);
    const totalCapacity = zones.reduce((sum, zone) => sum + zone.maxCapacity, 0);
    const overallPercent = Math.round((totalOccupancy / totalCapacity) * 100);

    return (
        <div className="p-6 md:p-8 space-y-8">


            {/* Overall KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Occupancy */}
                <GlassCard variant="dark" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50 animate-pulse"></div>
                        <p className="text-sm font-bold uppercase tracking-wider text-amber-400/70">
                            Total Occupancy
                        </p>
                    </div>
                    <p className="text-5xl font-black text-white mb-2">{totalOccupancy}</p>
                    <p className="text-sm text-white/50">passengers</p>
                </GlassCard>

                {/* Capacity Utilization */}
                <GlassCard variant="dark" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"></div>
                        <p className="text-sm font-bold uppercase tracking-wider text-emerald-400/70">
                            Capacity
                        </p>
                    </div>
                    <p className="text-5xl font-black text-white mb-2">{overallPercent}%</p>
                    <p className="text-sm text-white/50">of {totalCapacity} max</p>
                </GlassCard>

                {/* Critical Zones */}
                <GlassCard variant="dark" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50"></div>
                        <p className="text-sm font-bold uppercase tracking-wider text-red-400/70">
                            Critical Zones
                        </p>
                    </div>
                    <p className="text-5xl font-black text-white mb-2">
                        {zones.filter(z => z.status === 'critical').length}
                    </p>
                    <p className="text-sm text-white/50">above 85% capacity</p>
                </GlassCard>
            </div>

            {/* Zone Breakdown */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-400" />
                    Zone Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {zones.map((zone) => (
                        <GlassCard
                            key={zone.id}
                            variant="dark"
                            className={`p-5 border-2 transition-all duration-300 hover:scale-105 ${zone.status === 'critical'
                                ? 'border-red-500/50 bg-red-900/10'
                                : zone.status === 'warning'
                                    ? 'border-amber-500/50 bg-amber-900/10'
                                    : 'border-emerald-500/30 bg-emerald-900/5'
                                }`}
                        >
                            {/* Zone Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h4 className="text-base font-bold text-white mb-1">{zone.name}</h4>
                                    <p className="text-xs text-white/50">
                                        {zone.currentOccupancy} / {zone.maxCapacity} capacity
                                    </p>
                                </div>
                                {zone.status === 'critical' && (
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                )}
                            </div>

                            {/* Capacity Bar */}
                            <div className="mb-3">
                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${zone.status === 'critical'
                                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                                            : zone.status === 'warning'
                                                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                                                : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                                            }`}
                                        style={{ width: `${zone.capacityPercent}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-2xl font-black ${zone.status === 'critical'
                                            ? 'text-red-400'
                                            : zone.status === 'warning'
                                                ? 'text-amber-400'
                                                : 'text-emerald-400'
                                            }`}
                                    >
                                        {zone.capacityPercent}%
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10">
                                    <TrendingUp className="w-3 h-3 text-amber-400" />
                                    <span className="text-xs font-bold text-amber-400">{zone.trend}</span>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopulationModule;
