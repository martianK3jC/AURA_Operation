import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, Activity, CheckCircle, AlertTriangle, Clock, Eye } from 'lucide-react';
import GlassCard from '../GlassCard';

export interface Alert {
    id: number;
    type: 'critical' | 'warning' | 'info';
    location: string;
    message: string;
    time: string;
    status: 'active' | 'resolved';
}

interface ConfirmModalState {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    isDangerous: boolean;
    onConfirm: () => void;
}

interface SectionAlertsResponseProps {
    systemStatus: 'nominal' | 'alert';
    alerts: Alert[];
    onResolveAlert: (id: number) => void;
    showToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
    setExpandedCam: (id: number | null) => void;
    setConfirmModal: (modal: ConfirmModalState) => void;
    closeConfirm: () => void;
}

const SectionAlertsResponse: React.FC<SectionAlertsResponseProps> = ({
    systemStatus,
    alerts,
    onResolveAlert,
    showToast,
    setExpandedCam,
    setConfirmModal,
    closeConfirm
}) => {
    const [protocolActive, setProtocolActive] = useState(false);

    // Reset protocol state when system returns to nominal
    useEffect(() => {
        if (systemStatus === 'nominal') {
            setProtocolActive(false);
        }
    }, [systemStatus]);

    return (
        <section className="min-h-screen snap-start p-6 md:p-12 bg-neutral-900/40 pb-32">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <ShieldAlert className="text-amber-500" size={40} />
                        <h2 className="text-4xl font-black text-white uppercase tracking-tight">Active Alerts & Response</h2>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => showToast('info', 'Opening Team Management Interface...')}
                            className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-white/10 rounded-xl font-bold uppercase tracking-wide text-sm transition-all flex items-center gap-2"
                        >
                            <Users size={18} /> Manage Teams
                        </button>
                        <button className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-white/10 rounded-xl font-bold uppercase tracking-wide text-sm transition-all flex items-center gap-2">
                            <Activity size={18} /> View Logs
                        </button>
                    </div>
                </div>


                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
                    {/* LEFT COL: ALERT FEED & ACTIONS */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white/90">Predictive Alerts</h3>
                            <span className="text-xs font-mono text-amber-500">AI CONFIDENCE: 98%</span>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                            {/* Critical System Alert */}
                            {systemStatus === 'alert' && !alerts.find(a => a.id === 99) && (
                                protocolActive ? (
                                    // ACTIVE RESPONSE STATE
                                    <GlassCard variant="dark" className="p-5 rounded-2xl border-l-4 border-emerald-500/80 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                                        <div className="absolute inset-0 bg-emerald-500/5"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-20"></div>
                                                        <div className="relative bg-emerald-500/20 p-2 rounded-full border-2 border-emerald-500/50">
                                                            <Activity size={18} className="text-emerald-500" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-bold text-base text-white">Response Active</span>
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider animate-pulse">Running</span>
                                                        </div>
                                                        <span className="text-xs text-white/40 font-mono">Protocol CP-99 Initiated</span>
                                                    </div>
                                                </div>
                                                <span className="font-mono text-lg font-bold text-emerald-500">00:24</span>
                                            </div>

                                            <p className="text-sm text-white/80 mb-4 font-medium leading-relaxed">
                                                Security teams dispatched to Checkpoint B. Rerouting passenger flow to Checkpoint A.
                                            </p>

                                            <div className="w-full bg-emerald-900/30 text-emerald-200 text-xs py-3 rounded-xl border border-emerald-500/20 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                                                <CheckCircle size={16} />
                                                Crowd Control Protocol Active
                                            </div>
                                        </div>
                                    </GlassCard>
                                ) : (
                                    // ACTION REQUIRED STATE
                                    <GlassCard variant="dark" className="p-5 rounded-2xl border-l-4 border-red-900 relative overflow-hidden">
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-red-900 rounded-full blur-md opacity-50"></div>
                                                        <div className="relative bg-red-900/20 p-2 rounded-full border-2 border-red-800/50">
                                                            <ShieldAlert size={18} className="text-red-500" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-bold text-base text-white">System Alert</span>
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950/50 text-red-400 border border-red-900 uppercase tracking-wider">Critical</span>
                                                        </div>
                                                        <span className="text-xs text-white/40 font-mono">Just now • High Priority</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-white/80 mb-4 font-medium leading-relaxed">
                                                🚨 Critical capacity threshold reached at Security B. Immediate action required.
                                            </p>

                                            <button
                                                onClick={() => {
                                                    setConfirmModal({
                                                        isOpen: true,
                                                        title: 'Initiate Crowd Control?',
                                                        message: '⚠️ This will lock down the terminal and dispatch all available security units. This action cannot be undone immediately.',
                                                        confirmText: 'INITIATE PROTOCOL',
                                                        isDangerous: true,
                                                        onConfirm: () => {
                                                            setProtocolActive(true);
                                                            showToast('success', '🚨 Protocol Initiated • Security teams have been dispatched');
                                                            closeConfirm();
                                                        }
                                                    });
                                                }}
                                                className="w-full bg-gradient-to-r from-red-900 to-red-950 hover:from-red-800 hover:to-red-900 text-white text-xs py-3 rounded-xl transition-all shadow-xl shadow-red-900/10 border border-red-800 font-bold uppercase tracking-wider flex items-center justify-center gap-2 group/btn"
                                            >
                                                <Activity size={16} className="group-hover/btn:animate-pulse" />
                                                Initiate Crowd Control Protocol
                                            </button>
                                        </div>
                                    </GlassCard>
                                )
                            )}

                            {/* All Clear State */}
                            {systemStatus === 'nominal' && (
                                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-neutral-900/30 rounded-2xl border border-white/10">
                                    <CheckCircle size={48} className="text-emerald-500/50 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">All Clear</h3>
                                    <p className="text-sm text-white/50 max-w-sm font-medium">
                                        No active alerts detected. All systems operating nominally.
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                                        <Clock size={12} />
                                        <span>Last checked: {new Date().toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            )}

                            {/* Regular Alerts */}
                            {systemStatus === 'alert' && alerts.map(alert => (
                                <GlassCard
                                    variant="dark"
                                    key={alert.id}
                                    className={`p-4 rounded-xl border-l-4 transition-all duration-300 group relative overflow-hidden ${alert.status === 'resolved'
                                        ? 'border-emerald-500/60 opacity-60'
                                        : alert.type === 'critical'
                                            ? 'border-red-900'
                                            : 'border-amber-900'
                                        }`}
                                >
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2.5">
                                                {alert.status === 'resolved' ? (
                                                    <div className="bg-emerald-500/20 p-1.5 rounded-lg border border-emerald-500/30">
                                                        <CheckCircle size={16} className="text-emerald-400" />
                                                    </div>
                                                ) : (
                                                    <div className={`p-1.5 rounded-lg border ${alert.type === 'critical' ? 'bg-red-900/20 border-red-900/50' : 'bg-amber-900/20 border-amber-900/50'}`}>
                                                        <AlertTriangle size={16} className={alert.type === 'critical' ? 'text-red-500' : 'text-amber-600'} />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-bold text-sm ${alert.status === 'resolved' ? 'text-emerald-300' : 'text-white'}`}>
                                                            {alert.location}
                                                        </span>
                                                        {alert.status !== 'resolved' && (
                                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${alert.type === 'critical'
                                                                ? 'bg-red-950 text-red-400 border border-red-900'
                                                                : 'bg-amber-950 text-amber-500 border border-amber-900'
                                                                }`}>
                                                                {alert.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-white/40 font-mono">{alert.time}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className={`text-sm mb-3 leading-relaxed ${alert.status === 'resolved' ? 'text-emerald-300/60 line-through' : 'text-white/80'
                                            }`}>
                                            {alert.message}
                                        </p>

                                        {alert.status !== 'resolved' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setConfirmModal({
                                                            isOpen: true,
                                                            title: 'Deploy Staff',
                                                            message: `Deploy monitoring staff to ${alert.location}? This will reallocate resources from other zones.`,
                                                            confirmText: 'Deploy Staff',
                                                            isDangerous: false,
                                                            onConfirm: () => {
                                                                onResolveAlert(alert.id);
                                                                closeConfirm();
                                                            }
                                                        });
                                                    }}
                                                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-xs py-2 rounded-lg font-bold shadow-lg shadow-amber-900/20 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Users size={12} />
                                                    Deploy Staff
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setConfirmModal({
                                                            isOpen: true,
                                                            title: 'Acknowledge Alert',
                                                            message: 'Acknowledging this alert will remove it from the active queue. Are you sure you have verified the situation?',
                                                            confirmText: 'Acknowledge',
                                                            isDangerous: false,
                                                            onConfirm: () => {
                                                                onResolveAlert(alert.id);
                                                                closeConfirm();
                                                            }
                                                        });
                                                    }}
                                                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white text-xs py-2 rounded-lg font-bold border border-white/10 transition-colors"
                                                >
                                                    Acknowledge
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COL: SURVEILLANCE & RESOURCES */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white/90">Live Surveillance</h3>
                            <button className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1">
                                <Eye size={12} /> VIEW ALL CAMS
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* CAM 08: Security */}
                            <div
                                className={`col-span-2 relative rounded-xl overflow-hidden aspect-[21/9] bg-black border group cursor-pointer hover:shadow-lg transition-all ${systemStatus === 'alert' ? 'border-red-900/50 shadow-[0_0_20px_rgba(127,29,29,0.2)]' : 'border-white/10 hover:border-white/30'}`}
                                onClick={() => setExpandedCam(8)}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Users size={48} className={`transition-colors ${systemStatus === 'alert' ? 'text-red-900/60' : 'text-neutral-700 group-hover:text-neutral-600'}`} />
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_3px] pointer-events-none opacity-30"></div>
                                    {systemStatus === 'alert' && <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>}
                                </div>
                                <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-white flex items-center gap-1.5 z-10">
                                    <span className={`w-1.5 h-1.5 rounded-full ${systemStatus === 'alert' ? 'bg-red-600' : 'bg-red-500 animate-pulse'}`}></span>
                                    {systemStatus === 'alert' ? 'CRITICAL FEED' : 'LIVE'}
                                </div>
                                <div className="absolute bottom-3 left-3 text-sm font-bold text-white shadow-black drop-shadow-md z-10 flex items-center gap-2">
                                    <span>CAM 08: SECURITY A</span>
                                    {systemStatus === 'alert' && <span className="text-[10px] bg-red-700 px-1.5 rounded text-white font-bold">MOTION DETECTED</span>}
                                </div>
                            </div>

                            {/* CAM 01 */}
                            <div
                                className={`relative rounded-xl overflow-hidden aspect-video bg-black border group cursor-pointer transition-all ${systemStatus === 'alert' ? 'border-red-900/30' : 'border-white/10 hover:border-white/30'}`}
                                onClick={() => setExpandedCam(1)}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Users size={24} className={systemStatus === 'alert' ? 'text-red-900/40' : 'text-neutral-700'} />
                                    {systemStatus === 'alert' && <div className="absolute inset-0 bg-red-900/5 pointer-events-none"></div>}
                                </div>
                                <div className="absolute bottom-2 left-2 text-xs font-bold text-white z-10 flex items-center gap-2">
                                    CAM 01: CURB
                                    {systemStatus === 'alert' && <Activity size={10} className="text-red-600" />}
                                </div>
                            </div>

                            {/* CAM 05 */}
                            <div
                                className={`relative rounded-xl overflow-hidden aspect-video bg-black border group cursor-pointer transition-all ${systemStatus === 'alert' ? 'border-red-900/30' : 'border-white/10 hover:border-white/30'}`}
                                onClick={() => setExpandedCam(5)}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Users size={24} className={systemStatus === 'alert' ? 'text-red-900/40' : 'text-neutral-700'} />
                                    {systemStatus === 'alert' && <div className="absolute inset-0 bg-red-900/5 pointer-events-none"></div>}
                                </div>
                                <div className="absolute bottom-2 left-2 text-xs font-bold text-white z-10 flex items-center gap-2">
                                    CAM 05: ARRIVALS
                                    {systemStatus === 'alert' && <Activity size={10} className="text-red-600" />}
                                </div>
                            </div>
                        </div>

                        {/* STAFF ALLOCATION CARD */}
                        <GlassCard variant="dark" className="p-4 rounded-xl border border-white/10 mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Staff Allocation</h4>
                                <span className="text-xs text-white/50">46/48 Active</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white/80">Security Zones</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[80%] rounded-full"></div>
                                        </div>
                                        <span className="font-mono text-emerald-400">22</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white/80">Check-in Counters</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[60%] rounded-full"></div>
                                        </div>
                                        <span className="font-mono text-blue-400">14</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white/80">Support / Floater</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 w-[40%] rounded-full"></div>
                                        </div>
                                        <span className="font-mono text-amber-400">10</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                                <button className="text-xs text-amber-400 font-bold uppercase hover:text-amber-300">
                                    Reallocate Resources →
                                </button>
                            </div>
                        </GlassCard>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionAlertsResponse;
