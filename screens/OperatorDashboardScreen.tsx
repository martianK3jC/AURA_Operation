import * as React from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ScreenId } from '../types';
import GlassCard from '../components/GlassCard';
import Loader from '../components/Loader';
import OperatorChatbot from '../components/OperatorChatbot';
import { useToast } from '../contexts/ToastContext';
import { LogOut, AlertTriangle, Users, Eye, CheckCircle, Clock, ShieldAlert, Sparkles, Bot } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import OperatorLayout from './OperatorLayout.tsx';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const OperatorDashboardScreen: React.FC<Props> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'High volume predicted at Domestic Security (+20m)', location: 'Checkpoint A', time: '09:41 AM', status: 'pending' },
    { id: 2, type: 'warning', message: 'Gate 5 boarding queue exceeding capacity', location: 'Gate 5', time: '09:38 AM', status: 'pending' },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [systemStatus, setSystemStatus] = useState<'nominal' | 'alert'>('nominal');

  const [expandedCam, setExpandedCam] = useState<number | null>(null);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
    isDangerous: false,
    confirmText: 'Confirm'
  });

  const closeConfirm = () => setConfirmModal(prev => ({ ...prev, isOpen: false }));

  const handleResolve = (id: number) => {
    const alert = alerts.find(a => a.id === id);
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
    showToast('success', `Alert acknowledged: ${alert?.location || 'Issue resolved'}`);
  };

  const toggleSystemStatus = () => {
    const newStatus = systemStatus === 'nominal' ? 'alert' : 'nominal';
    setSystemStatus(newStatus);
    showToast(
      newStatus === 'alert' ? 'warning' : 'success',
      newStatus === 'alert'
        ? '⚠️ System Alert Mode Activated'
        : '✅ System Status: Nominal'
    );
  };

  return (
    <OperatorLayout currentScreen="operator-dashboard" onNavigate={onNavigate}>
      {isLoading && <Loader text="Connecting to Uplink..." />}

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={closeConfirm}
        isDangerous={confirmModal.isDangerous}
        confirmText={confirmModal.confirmText}
        variant="dark"
      />

      {/* CCTV EXPANSION MODAL OVERLAY - PORTAL TO BODY */}
      {expandedCam !== null && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-200"
          onClick={() => setExpandedCam(null)}
        >
          <div className="w-full max-w-6xl aspect-video bg-neutral-950 rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Fake Video Feed Content */}
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <Users size={64} className="text-neutral-700 animate-pulse" />
              {/* Scanlines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
            </div>

            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/90 to-transparent flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-20">
              <div>
                <h2 className="text-white font-bold text-lg md:text-3xl flex items-center gap-2 md:gap-3">
                  <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
                  <span className="drop-shadow-md text-sm sm:text-lg md:text-3xl max-w-[200px] md:max-w-none leading-tight">{expandedCam === 1 ? 'CAM 04: Check-in Area' : 'CAM 08: Security Checkpoint'}</span>
                </h2>
                <p className="text-slate-300 text-xs md:text-base font-mono mt-1 md:mt-2 bg-black/40 inline-block px-2 py-1 rounded border border-white/10">
                  {expandedCam === 1
                    ? (systemStatus === 'nominal' ? 'DENSITY: MED' : 'DENSITY: HIGH')
                    : 'FLOW: SMOOTH'}
                </p>
              </div>
              <button
                onClick={() => setExpandedCam(null)}
                className="absolute top-4 right-4 md:static px-3 py-2 md:px-5 md:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all border border-white/10 hover:border-white/30 flex items-center gap-2 backdrop-blur-md"
              >
                <span className="md:hidden"><LogOut size={16} /></span>
                <span className="hidden md:inline">Close View</span>
              </button>
            </div>

            {/* AI Bounding Box Simulation */}
            <div className={`absolute top-1/2 left-1/2 w-[35%] h-[40%] md:w-48 md:h-72 border md:border-2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 z-10 ${expandedCam === 1 && systemStatus === 'alert' ? 'border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)]'}`}>
              <div className={`absolute -top-6 md:-top-8 left-0 text-white text-[10px] md:text-xs font-mono font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded backdrop-blur-md ${expandedCam === 1 && systemStatus === 'alert' ? 'bg-red-600/80' : 'bg-emerald-600/80'}`}>
                {expandedCam === 1 && systemStatus === 'alert' ? 'CROWD DENSITY: CRITICAL' : 'SUBJECT: 98%'}
              </div>
              {/* Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 md:w-4 md:h-4 border-t-2 border-l-2 md:border-t-4 md:border-l-4 border-white/50 -mt-0.5 -ml-0.5 md:-mt-1 md:-ml-1"></div>
              <div className="absolute top-0 right-0 w-2 h-2 md:w-4 md:h-4 border-t-2 border-r-2 md:border-t-4 md:border-r-4 border-white/50 -mt-0.5 -mr-0.5 md:-mt-1 md:-mr-1"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 md:w-4 md:h-4 border-b-2 border-l-2 md:border-b-4 md:border-l-4 border-white/50 -mb-0.5 -ml-0.5 md:-mb-1 md:-ml-1"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 md:w-4 md:h-4 border-b-2 border-r-2 md:border-b-4 md:border-r-4 border-white/50 -mb-0.5 -mr-0.5 md:-mb-1 md:-mr-1"></div>
            </div>
          </div>
          <p className="text-slate-400 mt-6 text-sm font-medium tracking-wide">Click anywhere outside to close</p>
        </div>,
        document.body
      )}

      {/* Sticky Header - Adapts to container width */}
      {/* Sticky Header - Adapts to container width */}
      {/* Sticky Header - Adapts to container width */}
      <header className="sticky top-0 z-30 flex justify-between items-center px-6 md:px-8 py-6 pt-safe border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center gap-3">
            <Sparkles size={28} className="text-orange-400" />
            AOCC Command Center
          </h1>
          <div
            onClick={toggleSystemStatus}
            className="flex items-center gap-2 text-sm text-slate-400 mt-3 cursor-pointer hover:text-white transition-colors bg-white/5 py-2 px-4 rounded-full border border-white/5 hover:bg-white/10 w-fit"
            title="Click to toggle status for demo"
          >
            <span className="flex items-center gap-2"><Clock size={14} /> 09:42 AM</span>
            <span className={`w-2 h-2 rounded-full ${systemStatus === 'nominal' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></span>
            <span className={`font-semibold ${systemStatus === 'nominal' ? 'text-emerald-400' : 'text-red-400'}`}>
              {systemStatus === 'nominal' ? 'System Nominal' : 'Active Incidents'}
            </span>
          </div>
        </div>

      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-32 space-y-8 animate-slide-up">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard variant="dark" className="p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-transparent hover:border-orange-500/30 transition-colors group">
              <p className="text-sm font-bold text-orange-200/50 uppercase tracking-widest mb-4 group-hover:text-orange-200 transition-colors">Total Pax (1hr)</p>
              <div className="flex items-end justify-between">
                <p className="text-5xl md:text-6xl font-black text-white tracking-tight">2,450</p>
                <div className="flex flex-col items-end mb-1">
                  <p className="text-sm font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <span>↑</span> 12%
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">vs average</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard variant="dark" className={`p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br transition-all duration-500 ${systemStatus === 'nominal' ? 'from-emerald-500/10 hover:border-emerald-500/30' : 'from-red-500/10 border-red-500/50'}`}>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Avg Wait Time</p>
              <div className="flex items-end justify-between">
                <p className={`text-5xl md:text-6xl font-black tracking-tight ${systemStatus === 'nominal' ? 'text-white' : 'text-red-500'}`}>
                  {systemStatus === 'nominal' ? '12m' : '35m'}
                </p>
                <p className={`text-sm font-medium px-3 py-1.5 rounded-lg border ${systemStatus === 'nominal' ? 'text-slate-400 bg-white/5 border-white/5' : 'text-red-200 bg-red-500/20 border-red-500/20'} mb-1`}>Security Check A</p>
              </div>
            </GlassCard>
          </div>

          {/* SECTION 1: PREDICTIVE HEATMAP (God View) */}
          <GlassCard variant="dark" className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden relative group shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1a1614]">
              <h2 className="text-xl font-bold text-white flex items-center gap-4">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
                </span>
                Terminal Heatmap (Live)
              </h2>
              <span className="text-xs font-bold tracking-widest bg-white/5 text-slate-400 px-4 py-2 rounded-lg uppercase border border-white/5">Floor 1</span>
            </div>

            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] bg-[#050202] w-full overflow-hidden border-y border-red-900/30">
              {/* Base Floor Plan Grid (Geometric/Tech) */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(to right, #EF4444 1px, transparent 1px), linear-gradient(to bottom, #EF4444 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}></div>

              {/* Structures */}
              <div className="absolute top-8 left-8 w-24 h-40 md:w-32 md:h-52 border-2 border-[#5D4037] bg-[#3E2723]/80 rounded-lg"></div> {/* Check-in */}
              <div className="absolute top-8 right-8 w-24 h-40 md:w-32 md:h-52 border-2 border-[#5D4037] bg-[#3E2723]/80 rounded-lg"></div> {/* Security */}

              {/* Heatmap Overlays - INCREASED OPACITY & SIZE FOR BETTER VISIBILITY */}
              {/* Congestion Hotspot with Dashed Ring */}
              <div className={`absolute top-12 right-12 w-28 h-28 md:w-40 md:h-40 rounded-full transition-all duration-1000 ${systemStatus === 'nominal' ? 'opacity-30' : 'opacity-100'}`}>
                {/* Blur Blob */}
                <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse mix-blend-screen ${systemStatus === 'nominal' ? 'bg-emerald-500' : 'bg-red-500/60'}`}></div>

                {/* Dashed Ring - Visible only on alert */}
                {systemStatus === 'alert' && (
                  <div className="absolute inset-2 border-4 border-red-500/60 rounded-full border-dashed animate-spin-slow opacity-80"></div>
                )}
              </div>
              <div className="absolute top-16 left-12 w-24 h-24 md:w-32 md:h-32 bg-orange-500/30 rounded-full blur-2xl mix-blend-screen px-4"></div>

              {/* Labels */}
              {systemStatus === 'alert' && (
                <div className="absolute top-48 right-12 text-[10px] font-bold text-red-100 bg-red-900/90 px-3 py-1.5 rounded border border-red-500/50 animate-bounce shadow-lg shadow-red-900/50">
                  ⚠️ Congestion Detected
                </div>
              )}
              <div className="absolute top-48 left-12 text-[10px] font-bold text-red-100 bg-black/80 px-2 py-1 rounded border border-red-500/40 shadow-sm backdrop-blur-sm">
                Check-in Area B
              </div>
            </div>
          </GlassCard>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
            {/* SECTION 2: LIVE ALERTS FEED */}
            <section>
              <div className="flex justify-between items-end mb-4 px-1">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldAlert size={14} />
                  Predictive Alerts
                </h2>
                <span className="text-[10px] font-mono text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">AUTO-REFRESH: ON</span>
              </div>

              <div className="space-y-3">
                {systemStatus === 'alert' && !alerts.find(a => a.id === 99) && (
                  <GlassCard variant="dark" className="p-4 rounded-xl border-l-4 border-red-500 bg-red-900/20 animate-slide-up">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={16} className="text-red-500 animate-pulse" />
                        <span className="font-semibold text-sm text-red-200">System Alert</span>
                      </div>
                      <span className="text-[10px] text-red-300/70">Just now</span>
                    </div>
                    <p className="text-sm text-red-100 mb-3 font-medium">Critical capacity threshold reached at Security B.</p>
                    <button
                      onClick={() => {
                        setConfirmModal({
                          isOpen: true,
                          title: 'Initiate Crowd Control?',
                          message: '⚠️ This will lock down the terminal and dispatch all available security units. This action cannot be undone immediately.',
                          confirmText: 'INITIATE PROTOCOL',
                          isDangerous: true,
                          onConfirm: () => {
                            window.alert('Protocol Initiated. Security teams dispatched.');
                            closeConfirm();
                          }
                        });
                      }}
                      className="w-full bg-red-600 hover:bg-red-500 text-white text-xs py-2 rounded-lg transition-colors shadow-lg shadow-red-900/20 font-bold"
                    >
                      INITIATE CROWD CONTROL PROTOCOL
                    </button>
                  </GlassCard>
                )}

                {alerts.filter(a => a.status !== 'resolved').length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-lg font-bold text-white mb-2">All Clear</h3>
                    <p className="text-sm text-neutral-400 max-w-sm">No active alerts. All systems operating nominally.</p>
                  </div>
                )}

                {alerts.map(alert => (
                  <GlassCard variant="dark" key={alert.id} className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${alert.status === 'resolved' ? 'border-green-500 opacity-60 bg-[#3E2723]/50' : alert.type === 'critical' ? 'border-red-500 bg-[#3E2723]/50' : 'border-orange-500 bg-[#3E2723]/50'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {alert.status === 'resolved' ? <CheckCircle size={16} className="text-green-500" /> : <AlertTriangle size={16} className={alert.type === 'critical' ? 'text-red-500' : 'text-orange-500'} />}
                        <span className={`font-semibold text-sm ${alert.status === 'resolved' ? 'text-[#D7CCC8]' : 'text-white'}`}>{alert.location}</span>
                      </div>
                      <span className="text-[10px] text-[#A1887F]">{alert.time}</span>
                    </div>
                    <p className={`text-sm mb-3 ${alert.status === 'resolved' ? 'text-[#8D6E63] line-through' : 'text-[#D7CCC8]'}`}>{alert.message}</p>

                    {alert.status !== 'resolved' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: 'Acknowledge Alert',
                              message: 'Acknowledging this alert will remove it from the active queue. Are you sure you have verified the situation?',
                              confirmText: 'Acknowledge',
                              isDangerous: false,
                              onConfirm: () => {
                                handleResolve(alert.id);
                                closeConfirm();
                              }
                            });
                          }}
                          className="flex-1 bg-transparent border border-white/20 hover:bg-white/10 text-stone-300 hover:text-white text-xs py-2 rounded-lg transition-all font-medium"
                        >
                          Acknowledge
                        </button>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: 'Deploy Staff',
                              message: `Deploy monitoring staff to ${alert.location}? This will reallocate resources from other zones.`,
                              confirmText: 'Deploy Staff',
                              isDangerous: false,
                              onConfirm: () => {
                                handleResolve(alert.id);
                                closeConfirm();
                              }
                            });
                          }}
                          className="flex-1 bg-orange-600 hover:bg-orange-500 text-white text-xs py-2 rounded-lg transition-colors shadow-lg shadow-orange-900/20 font-medium"
                        >
                          Deploy Staff
                        </button>
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* SECTION 3: CCTV AI MONITORING */}
            <section>
              <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider px-1">AI Vision Feeds</h2>
              {/* Mobile: Horizontal Carousel | Desktop: Grid */}
              <div className="flex md:grid md:grid-cols-2 gap-3 lg:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-2 md:pb-0 scrollbar-hide">

                {/* CAM 04 */}
                <div
                  className="relative rounded-xl overflow-hidden aspect-video bg-black border border-white/10 group cursor-pointer hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all active:scale-[0.98] min-w-[280px] md:min-w-0 snap-center"
                  onClick={() => setExpandedCam(1)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users size={32} className="text-[#5D4037] animate-pulse group-hover:text-[#4E342E] transition-colors" />
                    {/* Scanlines (Mini) */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_3px] pointer-events-none opacity-30"></div>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-white flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> REC
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white shadow-black drop-shadow-md z-10">CAM 04: Check-in</div>
                  <div className={`absolute top-2 right-2 text-[10px] font-mono px-1 rounded border z-10 ${systemStatus === 'nominal' ? 'text-yellow-400 bg-yellow-950/80 border-yellow-500/30' : 'text-red-400 bg-red-950/80 border-red-500/30'}`}>
                    {systemStatus === 'nominal' ? 'DENSITY: MED' : 'DENSITY: HIGH'}
                  </div>
                  <div className={`absolute top-1/2 left-1/2 w-8 h-12 border -translate-x-1/2 -translate-y-1/2 transition-colors z-10 ${systemStatus === 'nominal' ? 'border-yellow-500/50' : 'border-red-500/80'}`}></div>

                  {/* Overlay Hint */}
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                    <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                </div>

                {/* CAM 08 */}
                <div
                  className="relative rounded-xl overflow-hidden aspect-video bg-black border border-white/10 group cursor-pointer hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all active:scale-[0.98] min-w-[280px] md:min-w-0 snap-center"
                  onClick={() => setExpandedCam(2)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users size={32} className="text-[#5D4037] animate-pulse group-hover:text-[#4E342E] transition-colors" />
                    {/* Scanlines (Mini) */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_3px] pointer-events-none opacity-30"></div>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-white flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> REC
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white shadow-black drop-shadow-md z-10">CAM 08: Security</div>
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-orange-400 bg-orange-950/80 px-1 rounded border border-orange-500/30 z-10">
                    FLOW: SMOOTH
                  </div>
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                    <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* NEW: ARRIVAL FLOW MONITORING */}
          <section className="mt-6">
            <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider px-1">Arrival Flow & Transportation</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Arriving Passengers */}
              <GlassCard variant="dark" className="p-4 rounded-xl border-l-2 border-emerald-500 bg-gradient-to-br from-emerald-500/10 to-transparent">
                <p className="text-xs text-[#D7CCC8] uppercase tracking-wider mb-1">Arriving Pax (1hr)</p>
                <p className="text-2xl font-bold text-white">348</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="text-sm">✈️</span> 3 flights landed
                </p>
              </GlassCard>

              {/* Transport Demand */}
              <GlassCard variant="dark" className="p-4 rounded-xl border-l-2 border-cyan-500 bg-gradient-to-br from-cyan-500/10 to-transparent">
                <p className="text-xs text-[#D7CCC8] uppercase tracking-wider mb-1">Transport Demand</p>
                <p className="text-2xl font-bold text-white">124</p>
                <p className="text-xs text-cyan-400">Grab: 68 | Taxi: 42 | Shuttle: 14</p>
              </GlassCard>

              {/* Immigration Wait */}
              <GlassCard variant="dark" className="p-4 rounded-xl border-l-2 border-purple-500 bg-gradient-to-br from-purple-500/10 to-transparent">
                <p className="text-xs text-[#D7CCC8] uppercase tracking-wider mb-1">Immigration Queue</p>
                <p className="text-2xl font-bold text-white">8m</p>
                <p className="text-xs text-purple-400">42 passengers waiting</p>
              </GlassCard>
            </div>

            {/* Transportation Pickup Status */}
            <GlassCard variant="dark" className="rounded-xl border border-white/10 p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Ground Transportation Status
              </h3>
              <div className="space-y-3">
                {/* Grab Pickup Bay */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
                      <span className="text-lg">🚗</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Arrival Bay A (Grab)</p>
                      <p className="text-xs text-slate-400">Peak demand 2:30-3:30 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-400">68 rides</p>
                    <p className="text-xs text-slate-500">Active</p>
                  </div>
                </div>

                {/* Taxi Stand */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
                      <span className="text-lg">🚕</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Taxi Counter</p>
                      <p className="text-xs text-slate-400">12 taxis available</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-400">42 rides</p>
                    <p className="text-xs text-slate-500">Moderate</p>
                  </div>
                </div>

                {/* Hotel Shuttle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30">
                      <span className="text-lg">🚌</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Shuttle Stand</p>
                      <p className="text-xs text-slate-400">Next departure: 3:15 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-400">14 rides</p>
                    <p className="text-xs text-slate-500">Low</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>

        </div>

      </div>

      {/* Floating AI Assistant Button - OUTSIDE scroll container to prevent unexpected movement */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-24 md:bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-orange-600 to-red-600 shadow-[0_4px_20px_rgba(234,88,12,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[60] group border border-white/10"
        aria-label="Open AI Assistant"
      >
        <Bot size={24} className="text-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0A0A0A] animate-pulse"></span>
        <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20"></div>
      </button>

      {/* AI Chatbot Modal */}
      <OperatorChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </OperatorLayout>
  );
};

export default OperatorDashboardScreen;