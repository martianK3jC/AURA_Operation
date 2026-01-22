import React from 'react';
import { createPortal } from 'react-dom';
import { X, Users } from 'lucide-react';

interface CCTVModalProps {
    camId: number | null;
    onClose: () => void;
    systemStatus: 'nominal' | 'alert';
}

const CCTVModal: React.FC<CCTVModalProps> = ({ camId, onClose, systemStatus }) => {
    if (!camId) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-300">
            <div className={`absolute inset-0 flex flex-col md:flex-row ${systemStatus === 'alert' ? 'border border-red-900/30' : ''}`}>
                {/* Main Feed */}
                <div className="flex-1 relative bg-neutral-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
                        <div className={`px-2 py-1 rounded-sm text-white font-bold text-xs tracking-wider flex items-center gap-2 ${systemStatus === 'alert' ? 'bg-red-950 border border-red-900/50' : 'bg-red-600/80'}`}>
                            <span className={`w-2 h-2 bg-white rounded-full`}></span>
                            {systemStatus === 'alert' ? 'CRITICAL FEED' : 'LIVE'}
                        </div>
                        <div className="bg-black/50 backdrop-blur px-3 py-1 rounded text-white font-mono text-sm border border-white/10">
                            CAM 0{camId} // {camId === 8 ? 'SECURITY A' : camId === 1 ? 'CURB' : camId === 4 ? 'CHECK-IN' : 'ARRIVALS'}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-600/80 text-white p-2 rounded-full backdrop-blur border border-white/10 transition-colors"
                    >
                        <X size={24} />
                    </button>


                    {/* Simulated Feed Content */}
                    <div className="relative w-full h-full opacity-50">
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-50"></div>
                        <Users size={120} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${systemStatus === 'alert' ? 'text-red-900/20' : 'text-neutral-700'}`} />

                        {/* HUD Overlay - Bottom Left */}
                        <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent z-10">
                            <div className={`flex gap-8 text-xs font-mono transition-colors ${systemStatus === 'alert' ? 'text-white/60' : 'text-emerald-500/80'}`}>
                                <div>
                                    <span className="text-white/40 block text-[10px]">COORDINATES</span>
                                    34.0522° N, 118.2437° W
                                </div>
                                <div>
                                    <span className="text-white/40 block text-[10px]">FPS</span>
                                    {systemStatus === 'alert' ? '24.00 (LOW BW)' : '59.94'}
                                </div>
                                <div>
                                    <span className="text-white/40 block text-[10px]">STATUS</span>
                                    {systemStatus === 'alert' ? 'MOTION DETECTED' : 'RECORDING'}
                                </div>
                            </div>
                        </div>

                        {/* Vertex AI Vision Analysis - Bottom Right */}
                        <div className="absolute bottom-8 right-8 z-20 bg-blue-900/95 backdrop-blur-md border border-blue-500/40 rounded-lg p-4 shadow-2xl max-w-xs">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-500 p-1.5 rounded-md shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-bold text-blue-200 mb-2 flex items-center gap-1">
                                        Vertex AI Vision
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-[10px] text-blue-100/70">Crowd Density</span>
                                            <span className="text-sm font-black text-amber-400">65%</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-[10px] text-blue-100/70">Trend</span>
                                            <span className="text-sm font-black text-red-400">+12%</span>
                                        </div>
                                        <div className="pt-1 border-t border-blue-400/20">
                                            <p className="text-[9px] text-blue-100/60 leading-tight">
                                                Analyzing movement & space usage
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Analysis */}
                <div className="w-full md:w-80 bg-neutral-950 border-l border-white/10 p-6 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-4">
                        Security Zone 2
                    </h3>

                    <div className="space-y-6">
                        <div className="bg-neutral-900/50 p-4 rounded-xl border border-white/5">
                            <p className="text-sm text-white/80 leading-relaxed font-mono">
                                Passenger movement, crowd density, and space usage at <span className="text-amber-500 font-bold">Security Zone 2</span>.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Current Density</p>
                                <p className="text-2xl font-black text-amber-500">65%</p>
                            </div>
                            <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Trend</p>
                                <p className="text-2xl font-black text-red-400">+12%</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Space Usage</p>
                            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 w-[65%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1"></div>

                    <button
                        onClick={() => console.log('Dispatch team')}
                        className={`w-full py-3 font-bold uppercase tracking-wider rounded-lg transition-colors text-sm border ${systemStatus === 'alert' ? 'bg-red-950 hover:bg-red-900 border-red-900 text-red-200' : 'bg-white/10 hover:bg-white/20 text-white border-white/10'}`}
                    >
                        {systemStatus === 'alert' ? '🚨 EMERGENCY DISPATCH' : 'Manual Override'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CCTVModal;
