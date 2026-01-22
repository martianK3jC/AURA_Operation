import React from 'react';
import GlassCard from '../GlassCard';

interface SectionExecutiveOverviewProps {
    systemStatus: 'nominal' | 'alert';
}

const SectionExecutiveOverview: React.FC<SectionExecutiveOverviewProps> = ({ systemStatus }) => {
    return (
        <section className="min-h-[calc(100vh-100px)] snap-start flex flex-col justify-center p-6 md:p-12 border-b border-white/5 relative bg-neutral-900/20">
            <div className="max-w-7xl mx-auto w-full space-y-12">



                {/* ENHANCED KPI CARDS - MASSIVE Priority Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">

                    {/* Total Passengers Card */}
                    <div className={`group relative rounded-3xl p-[1px] transition-all duration-500 z-10 hover:z-20 transform hover:-translate-y-2 ${systemStatus === 'nominal' ? 'bg-gradient-to-br from-yellow-500/20 via-transparent to-transparent hover:from-yellow-500/30' : 'bg-gradient-to-br from-red-900/40 via-transparent to-transparent'}`}>
                        <GlassCard variant="dark" className={`p-8 md:p-12 rounded-3xl h-full relative ${systemStatus === 'alert' ? 'shadow-[0_0_30px_rgba(127,29,29,0.1)]' : ''}`}>
                            {/* Clipped Background Effects */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                <div className={`absolute inset-0 transition-opacity duration-500 ${systemStatus === 'nominal' ? 'bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100' : 'bg-red-900/10 opacity-100'}`}></div>
                                {/* Big background blur decor */}
                                <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] transition-colors duration-700 ${systemStatus === 'nominal' ? 'bg-amber-500/10 group-hover:bg-amber-500/20' : 'bg-red-900/20'}`}></div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`w-3 h-3 rounded-full shadow-lg ${systemStatus === 'nominal' ? 'bg-amber-400 shadow-amber-400/50 animate-pulse' : 'bg-red-600'}`}></div>
                                    <p className={`text-base font-bold uppercase tracking-[0.25em] transition-colors ${systemStatus === 'nominal' ? 'text-amber-400/70 group-hover:text-amber-400' : 'text-red-400/60 group-hover:text-red-400'}`}>
                                        Total Pax (1hr)
                                    </p>
                                </div>

                                <div className="flex items-baseline justify-between gap-4">
                                    <div className="relative group/tooltip">
                                        <p className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none transition-all duration-300 cursor-help ${systemStatus === 'nominal' ? 'text-white group-hover:scale-105' : 'text-red-50 scale-105'}`}>
                                            {systemStatus === 'nominal' ? '2,450' : '3,892'}
                                        </p>
                                        {/* Enhanced Tooltip - Now visible */}
                                        <div className="absolute left-0 top-full mt-4 w-64 bg-neutral-950/95 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-[100] translate-y-[-10px] group-hover/tooltip:translate-y-0 duration-200">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-xs uppercase text-white/40 font-bold tracking-wider">Capacity</span>
                                                <span className={`text-xs font-bold px-2 py-1 rounded border ${systemStatus === 'nominal' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-900/20 border-red-900/40'}`}>
                                                    {systemStatus === 'nominal' ? '73% Utilized' : '98% CRITICAL'}
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                                                <div className={`h-full rounded-full transition-all duration-1000 ${systemStatus === 'nominal' ? 'bg-gradient-to-r from-emerald-500 to-amber-500 w-[73%]' : 'bg-gradient-to-r from-orange-500 to-red-600 w-[98%]'}`}></div>
                                            </div>
                                            <p className="text-xs text-white/50 leading-tight">Historical Avg: 2,189 pax</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <div className={`flex items-center gap-2 px-5 py-3 rounded-2xl border ${systemStatus === 'nominal' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-900/20 border-red-900/30'}`}>
                                            <span className={`text-3xl font-bold ${systemStatus === 'nominal' ? 'text-emerald-400' : 'text-red-400'}`}>↑</span>
                                            <span className={`text-2xl font-bold ${systemStatus === 'nominal' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {systemStatus === 'nominal' ? '12%' : '45%'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Average Wait Time Card */}
                    <div className={`group relative rounded-3xl p-[1px] transition-all duration-500 z-10 hover:z-20 transform hover:-translate-y-2 ${systemStatus === 'nominal' ? 'bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent' : 'bg-gradient-to-br from-red-900/40 via-transparent to-transparent'}`}>
                        <GlassCard variant="dark" className={`p-8 md:p-12 rounded-3xl h-full relative ${systemStatus === 'alert' ? 'shadow-[0_0_30px_rgba(127,29,29,0.1)]' : ''}`}>
                            {/* Clipped Background Effects */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                <div className={`absolute inset-0 transition-opacity duration-500 ${systemStatus === 'nominal' ? 'bg-emerald-500/5 opacity-0 group-hover:opacity-100' : 'bg-red-900/10 opacity-100'}`}></div>
                                {/* Big background blur decor */}
                                <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] transition-colors duration-700 ${systemStatus === 'nominal' ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-red-900/20'}`}></div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`w-3 h-3 rounded-full shadow-lg ${systemStatus === 'nominal' ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-red-600'}`}></div>
                                    <p className={`text-base font-bold uppercase tracking-[0.25em] transition-colors ${systemStatus === 'nominal' ? 'text-emerald-400/70 group-hover:text-emerald-400' : 'text-red-400/60 group-hover:text-red-400'}`}>
                                        Avg Security Wait
                                    </p>
                                </div>

                                <div className="flex items-baseline justify-between gap-4">
                                    <div className="relative group/tooltip">
                                        <p className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none transition-all duration-500 cursor-help ${systemStatus === 'nominal' ? 'text-white group-hover:scale-105' : 'text-red-50 scale-105'}`}>
                                            {systemStatus === 'nominal' ? '12m' : '35m'}
                                        </p>
                                        {/* Tooltip */}
                                        <div className="absolute left-0 top-full mt-4 w-64 bg-neutral-950/95 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-[100] translate-y-[-10px] group-hover/tooltip:translate-y-0 duration-200">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-xs uppercase text-white/40 font-bold tracking-wider">Target SLA</span>
                                                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">15m</span>
                                            </div>
                                            <p className="text-xs text-white/50 leading-tight">Threshold for alert: 25m</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        {systemStatus === 'nominal' ? (
                                            <div className="flex items-center gap-2 bg-emerald-500/10 px-5 py-3 rounded-2xl border border-emerald-500/30">
                                                <span className="text-emerald-400 text-3xl font-bold">↓</span>
                                                <span className="text-emerald-400 text-2xl font-bold">2m</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 bg-red-900/20 px-5 py-3 rounded-2xl border border-red-900/30">
                                                <span className="text-red-400 text-3xl font-bold">↑</span>
                                                <span className="text-red-400 text-2xl font-bold">20m</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionExecutiveOverview;
