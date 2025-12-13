import React from 'react';
import { createPortal } from 'react-dom';
import { X, Radio, Users } from 'lucide-react';

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

                        {/* HUD Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent z-10">
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
                    </div>
                </div>

                {/* Sidebar Analysis */}
                <div className="w-full md:w-80 bg-neutral-950 border-l border-white/10 p-6 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-4">
                        Live Analysis
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Density</p>
                            <div className="flex items-center gap-2">
                                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${systemStatus === 'alert' ? 'bg-red-800 w-[95%]' : 'bg-amber-500 w-[65%]'}`}></div>
                                </div>
                                <span className={`font-mono text-sm ${systemStatus === 'alert' ? 'text-red-400 font-bold' : 'text-amber-500'}`}>
                                    {systemStatus === 'alert' ? '95% CRITICAL' : '65%'}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Movement Velocity</p>
                            <div className="flex items-center gap-2">
                                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${systemStatus === 'alert' ? 'bg-red-800 w-[10%]' : 'bg-emerald-500 w-[30%]'}`}></div>
                                </div>
                                <span className={`font-mono text-sm ${systemStatus === 'alert' ? 'text-red-500 font-bold' : 'text-emerald-500'}`}>
                                    {systemStatus === 'alert' ? 'STAGNANT' : 'NORMAL'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-xl p-4 border flex-1 ${systemStatus === 'alert' ? 'bg-neutral-900 border-white/5' : 'bg-neutral-900 border-white/5'}`}>
                        <div className={`flex items-center gap-2 mb-3 ${systemStatus === 'alert' ? 'text-white/60' : 'text-white/60'}`}>
                            <Radio size={14} className={systemStatus === 'alert' ? 'text-white/60' : 'animate-pulse text-red-500'} />
                            <span className="text-xs font-bold uppercase">System Log</span>
                        </div>
                        <div className="space-y-2 font-mono text-[10px] text-white/30">
                            <p><span className="text-emerald-500">10:42:01</span> &gt; Object tracking initiated</p>
                            <p><span className="text-emerald-500">10:42:05</span> &gt; ID_492 verified (Staff)</p>
                            <p><span className="text-emerald-500">10:42:12</span> &gt; Scan complete</p>
                            <p><span className="text-amber-500">10:42:45</span> &gt; Minor congestion detected</p>
                            {systemStatus === 'alert' && (
                                <>
                                    <p className=""><span className="text-red-500">10:43:10</span> &gt; ⚠️ CROWD DENSITY CRITICAL</p>
                                    <p className=""><span className="text-red-500">10:43:12</span> &gt; ALERT SENT TO HQ</p>
                                </>
                            )}
                        </div>
                    </div>

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
