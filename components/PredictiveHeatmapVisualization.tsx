import React from 'react';
import { Users, Plane, Shield } from 'lucide-react';

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
                    <div className="lg:col-span-3 relative bg-black/40 border-r border-white/10 min-h-[500px] lg:min-h-0">
                        {/* Grid overlay */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                            backgroundSize: '60px 60px'
                        }}></div>

                        {/* Interactive Outline Canvas (Full Height) */}
                        <div className="absolute inset-0 p-8">
                            <div className="w-full h-full border border-white/10 rounded-3xl relative overflow-hidden bg-neutral-900/40 shadow-2xl">
                                {/* Airport Architecture (Simplified for visual clarity) */}
                                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="white" strokeWidth="0.5" />
                                    <line x1="30" y1="10" x2="30" y2="90" stroke="white" strokeWidth="0.2" strokeDasharray="1 1" />
                                    <line x1="70" y1="10" x2="70" y2="90" stroke="white" strokeWidth="0.2" strokeDasharray="1 1" />
                                    <line x1="10" y1="40" x2="90" y2="40" stroke="white" strokeWidth="0.2" strokeDasharray="1 1" />
                                </svg>

                                {/* ZONES - Using percentages to be responsive */}

                                {/* 1. Drop-off / Transport Zone (Top) */}
                                <div className="absolute top-[5%] left-[5%] right-[5%] h-[20%] flex gap-4">
                                    {/* D1 */}
                                    <div className="flex-1 bg-transparent border border-amber-500/30 rounded-xl relative group hover:bg-amber-500/5 transition-all">
                                        <div className="absolute top-2 left-2 text-xs font-mono text-amber-500">ZONE D1</div>
                                        <div className="absolute center inset-0 flex items-center justify-center flex-col">
                                            <span className="text-3xl font-black text-white/90">94</span>
                                            <span className="text-xs text-white/50 uppercase">Vehicles</span>
                                        </div>
                                    </div>
                                    {/* D2 */}
                                    <div className="flex-1 bg-transparent border border-amber-500/30 rounded-xl relative group hover:bg-amber-500/5 transition-all">
                                        <div className="absolute top-2 left-2 text-xs font-mono text-amber-500">ZONE D2 (TAXI)</div>
                                        <div className="absolute center inset-0 flex items-center justify-center flex-col">
                                            <span className="text-3xl font-black text-white/90">78</span>
                                            <span className="text-xs text-white/50 uppercase">Queued</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Check-In & Security (Middle) - CRITICAL AREA */}
                                <div className="absolute top-[30%] left-[5%] right-[5%] h-[30%] flex gap-4">
                                    {/* Check-in */}
                                    <div className="w-[30%] bg-transparent border border-blue-500/30 rounded-xl relative p-4 hover:bg-blue-500/5 transition-all">
                                        <div className="flex justify-between">
                                            <span className="text-xs font-mono text-blue-400">CHECK-IN HALL</span>
                                            <div className="flex items-center gap-1 bg-blue-500/20 px-2 py-0.5 rounded">
                                                <Users size={12} className="text-blue-400" />
                                                <span className="text-xs text-blue-300 font-bold">12 Staff</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-end gap-2">
                                            <span className="text-4xl font-black text-white">412</span>
                                            <span className="text-xs text-white/50 mb-1">pax</span>
                                        </div>
                                    </div>

                                    {/* Security A */}
                                    <div className="flex-1 bg-transparent border border-emerald-500/30 rounded-xl relative p-4 hover:bg-emerald-500/5 transition-all">
                                        <div className="flex justify-between">
                                            <span className="text-xs font-mono text-emerald-400">SEC A</span>
                                            <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded">
                                                <Users size={12} className="text-emerald-400" />
                                                <span className="text-xs text-emerald-300 font-bold">8 Staff</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-col justify-center h-20">
                                            <div className="text-3xl font-black text-white text-center">8m</div>
                                            <div className="text-xs text-emerald-400 text-center font-bold">OPTIMAL</div>
                                        </div>
                                    </div>

                                    {/* Security B (Critical) */}
                                    <div className={`flex-1 rounded-xl relative p-4 transition-all border ${systemStatus === 'alert' ? 'bg-transparent border-red-500 shadow-[inset_0_0_30px_rgba(220,38,38,0.2)]' : 'bg-transparent border-emerald-500/30 hover:bg-emerald-500/5'
                                        }`}>
                                        <div className="flex justify-between">
                                            <span className={`text-xs font-mono font-bold ${systemStatus === 'alert' ? 'text-red-400' : 'text-emerald-400'}`}>SEC B</span>
                                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${systemStatus === 'alert' ? 'bg-red-900/40 border border-red-500/50' : 'bg-emerald-500/20'}`}>
                                                <Users size={12} className={systemStatus === 'alert' ? 'text-red-300' : 'text-emerald-400'} />
                                                <span className={`text-xs font-bold ${systemStatus === 'alert' ? 'text-red-200' : 'text-emerald-300'}`}>6 Staff</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-col justify-center h-20 relative">
                                            <div className={`text-4xl font-black text-center ${systemStatus === 'alert' ? 'text-red-400' : 'text-white'}`}>
                                                {systemStatus === 'alert' ? '47m' : '9m'}
                                            </div>
                                            <div className={`text-xs text-center font-bold mt-1 ${systemStatus === 'alert' ? 'text-red-400' : 'text-emerald-400'}`}>
                                                {systemStatus === 'alert' ? 'CRITICAL OVERLOAD' : 'OPTIMAL'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Gates (Bottom) */}
                                <div className="absolute bottom-[5%] left-[5%] right-[5%] h-[25%] flex gap-4">
                                    {['G1', 'G2', 'G3', 'G4'].map((gate, i) => (
                                        <div key={gate} className="flex-1 bg-transparent border border-white/10 rounded-xl relative p-3 hover:bg-white/5 transition-all group overflow-hidden">
                                            <div className="absolute top-0 right-0 p-8 bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 pointer-events-none"></div>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-lg font-black text-white/40 group-hover:text-white transition-colors">{gate}</span>
                                                <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                                                    <Plane size={14} className="text-white/60 -rotate-45" />
                                                </div>
                                            </div>
                                            {i === 2 && systemStatus === 'alert' ? (
                                                <div>
                                                    <div className="text-xs text-red-400 font-bold mb-1">BOARDING DELAY</div>
                                                    <div className="text-sm text-white font-mono">PR 182</div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="text-xs text-emerald-400 font-bold mb-1">BOARDING</div>
                                                    <div className="text-sm text-white font-mono">5J {500 + i * 20}</div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        {/* Legend Overlay - Desktop Only */}
                        <div className="hidden lg:block absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl z-20">
                            <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Zone Status</h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    <span className="text-xs text-white/80 font-mono">Nominal Flow</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                                    <span className="text-xs text-white/80 font-mono">High Traffic</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    <span className="text-xs text-white/80 font-mono">Critical</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR: INTELLIGENCE & RECOMMENDATIONS */}
                    <div className="col-span-1 bg-neutral-900/80 border-l border-white/10 p-6 flex flex-col h-full overflow-hidden">

                        {/* Mobile Legend - Visible only on small screens */}
                        <div className="lg:hidden mb-6 p-4 rounded-xl border border-white/5 bg-white/5">
                            <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Zone Status Legend</h4>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    <span className="text-xs text-white/80 font-mono">Nominal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                                    <span className="text-xs text-white/80 font-mono">High Traffic</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    <span className="text-xs text-white/80 font-mono">Critical</span>
                                </div>
                            </div>
                        </div>

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
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest sticky top-0 bg-neutral-900 py-2 z-10">Projections</h3>

                            {/* AI Prediction Card */}
                            {systemStatus === 'alert' && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-5 shadow-lg shadow-red-900/20 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="bg-red-500 p-1.5 rounded-md text-white">
                                                <Shield size={16} />
                                            </div>
                                            <span className="text-xs font-bold text-red-400 uppercase">Bottleneck Alert</span>
                                        </div>
                                        <p className="text-white font-bold text-lg leading-tight mb-2">Security B Checkpoint</p>
                                        <p className="text-sm text-red-200/70 mb-4">Capacity exceeded by 32%. Wait times increasing +2m every 5 mins.</p>

                                        <button
                                            onClick={() => showToast('success', 'Teams deployed to Sector B')}
                                            className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-red-900/40 transition-all border border-red-400/20">
                                            Deploy Response Team
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Timeline Items */}
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
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
