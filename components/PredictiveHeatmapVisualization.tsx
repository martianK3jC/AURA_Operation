import React from 'react';
import { Users, Shield, X } from 'lucide-react';
import airportHeatmap from '../img/airport_heatmap.png';

type ToastType = 'success' | 'error' | 'info';

interface PredictiveHeatmapProps {
    systemStatus: 'nominal' | 'alert';
    showToast: (type: ToastType, message: string, duration?: number) => void;
    className?: string;
}

export const PredictiveHeatmapVisualization: React.FC<PredictiveHeatmapProps> = ({ systemStatus, showToast, className }) => {
    return (
        <section className={`col-span-1 lg:col-span-2 h-full flex flex-col ${className}`}>
            <div className="flex-1 rounded-3xl border border-white/10 bg-neutral-900/50 overflow-hidden relative backdrop-blur-xl flex flex-col">
                {/* Header - Larger, more prominent */}
                <div className="p-6 border-b border-white/10 bg-neutral-900/95 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse ring-4 ring-emerald-500/20"></div>
                        <div>
                            <h2 className="text-2xl font-bold text-white font-mono tracking-tight">PREDICTIVE OPERATIONS CENTER</h2>
                            <p className="text-sm text-white/50 font-mono mt-1 flex items-center gap-2">
                                <span className="bg-white/10 px-1.5 py-0.5 rounded textxs">VERTEX AI VISION</span>
                                <span>|</span>
                                <span>MCIA TERMINAL 1</span>
                                <span>|</span>
                                <span className="text-amber-500 font-bold">{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            </p>
                        </div>
                    </div>
                    <div className={`px-6 py-3 rounded-xl font-mono text-lg font-bold shadow-lg flex items-center gap-3 ${systemStatus === 'nominal' ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/20' : 'bg-red-950 text-red-400 border border-red-900'
                        }`}>
                        {systemStatus === 'nominal' ? (
                            <>
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                NOMINAL
                            </>
                        ) : (
                            <>
                                <Shield size={20} />
                                CRITICAL ALERT
                            </>
                        )}
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-0 relative">

                    {/* MAIN VISUALIZATION AREA (Takes up 3 columns) */}
                    <div className="lg:col-span-3 relative bg-black/40 border-r border-white/10 min-h-[500px] lg:min-h-0 overflow-hidden group">

                        {/* Map Image Background */}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                                <img
                                    src={airportHeatmap}
                                    alt="Terminal Heatmap"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                                />

                                {/* Overlay Grid Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                                {/* HEATMAP BLOBS - Congested Areas (Red/Orange blobs) */}
                                {systemStatus === 'alert' && (
                                    <div className="absolute top-[35%] left-[45%] w-[15%] h-[25%] pointer-events-none z-10 animate-pulse-slow">
                                        <div className="absolute inset-0 bg-red-600/40 rounded-full blur-3xl"></div>
                                        <div className="absolute inset-[20%] bg-orange-500/50 rounded-full blur-2xl"></div>
                                        <div className="absolute inset-[40%] bg-red-500/60 rounded-full blur-xl animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDEBAR: INTELLIGENCE & RECOMMENDATIONS */}
                    <div className="col-span-1 bg-neutral-900/80 border-l border-white/10 p-6 flex flex-col h-full overflow-hidden">


                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Live Insights</h3>

                            {/* Staff Coverage Metric */}
                            <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-white/60">Total Staff Active</span>
                                    <Users size={16} className="text-blue-400" />
                                </div>
                                <div className="text-3xl font-black text-white mb-1">42<span className="text-lg text-white/40 font-normal">/48</span></div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 w-[88%] h-full rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/10">
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest sticky top-0 bg-neutral-900 py-2 z-10">RECOMMENDATIONS</h3>


                            {/* AI Prediction Card */}
                            {systemStatus === 'alert' && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-5 shadow-lg shadow-red-900/20 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                                    <div className="relative z-10">
                                        {/* Header with Close Button */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-red-500 p-1.5 rounded-md text-white">
                                                    <Shield size={16} />
                                                </div>
                                                <span className="text-xs font-bold text-red-400 uppercase">Alert Message</span>
                                            </div>
                                            <button
                                                onClick={() => showToast('info', 'Alert dismissed')}
                                                className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                            >
                                                <X size={16} className="text-white/60 hover:text-white" />
                                            </button>
                                        </div>

                                        <p className="text-white font-bold text-lg leading-tight mb-2">
                                            Near Security Checkpoint
                                        </p>
                                        <p className="text-sm text-blue-200/80 mb-4">
                                            <span className="block mb-1">Passenger surge expected in 30 minutes.</span>
                                            <span className="block">
                                                <span className="font-bold">Recommendation:</span> Open two additional lanes and deploy staff.
                                            </span>
                                        </p>

                                        {/* Status Badge */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/50">Status:</span>
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40">
                                                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                                                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">Not Resolved</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Timeline Items - Only show in nominal mode */}
                            {systemStatus === 'nominal' && (
                                <div className="space-y-3">
                                    <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-bold text-white">+15 min</span>
                                            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">OPTIMAL</span>
                                        </div>
                                        <p className="text-xs text-white/60">Gate 3 Boarding Complete</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-bold text-white">+25 min</span>
                                            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">ELEVATED</span>
                                        </div>
                                        <p className="text-xs text-white/60">Arrival Peak (Flight PR102)</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
