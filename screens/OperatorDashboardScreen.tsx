import * as React from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ScreenId } from '../types';
import GlassCard from '../components/GlassCard';
import Loader from '../components/Loader';
import OperatorChatbot from '../components/OperatorChatbot.tsx';
import { useToast } from '../contexts/ToastContext';
import { LogOut, AlertTriangle, Users, Eye, CheckCircle, Clock, ShieldAlert, Sparkles, Bot, Megaphone, FileText, Radio, HelpCircle, Activity } from 'lucide-react';
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

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle Help
      if (e.key === '?' && !isChatbotOpen) {
        setIsShortcutsOpen(prev => !prev);
      }
      // Close Modals
      if (e.key === 'Escape') {
        setIsShortcutsOpen(false);
        setExpandedCam(null);
      }
      // Toggle System Status (Shift + Space)
      if (e.shiftKey && e.code === 'Space' && !isChatbotOpen) {
        e.preventDefault(); // Prevent scrolling
        setSystemStatus(prev => {
          const newStatus = prev === 'nominal' ? 'alert' : 'nominal';
          showToast(newStatus === 'alert' ? 'error' : 'success', `System Status changed to: ${newStatus.toUpperCase()}`);
          return newStatus;
        });
      }
      // Broadcast Shortcut (Shift + B)
      if (e.shiftKey && (e.key === 'B' || e.key === 'b') && !isChatbotOpen) {
        e.preventDefault();
        showToast('info', '📢 Broadcast system activated. Speak to announce.');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isChatbotOpen]);

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

      {/* ENHANCED STICKY HEADER - Premium Command Center Design */}
      <header className="sticky top-0 z-30 flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 pt-safe border-b border-white/10 glass-panel-elevated shrink-0 transition-all duration-300">
        <div className="flex-1">
          {/* Main Title with Premium Gradient */}
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight mb-2 md:mb-3 flex items-center gap-2 md:gap-3 group">
            <div className="relative">
              <Sparkles size={28} className="text-orange-400 group-hover:text-orange-300 transition-colors" />
              <div className="absolute inset-0 blur-md bg-orange-500/30 group-hover:bg-orange-500/50 transition-all"></div>
            </div>
            <span className="text-gradient-orange animate-in fade-in slide-in-from-left-5 duration-700">
              AOCC Command Center
            </span>
          </h1>

          {/* Status Badge - Interactive */}
          <div
            onClick={toggleSystemStatus}
            className="inline-flex items-center gap-3 text-sm px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-100 shadow-lg"
            style={{
              background: systemStatus === 'nominal'
                ? 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))'
                : 'linear-gradient(to right, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))',
              borderColor: systemStatus === 'nominal' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.4)',
              boxShadow: systemStatus === 'nominal'
                ? '0 0 20px rgba(16, 185, 129, 0.1)'
                : '0 0 25px rgba(239, 68, 68, 0.2)'
            }}
            title="Click to toggle status for demo"
          >
            <span className="flex items-center gap-2 text-white/70 group-hover:text-white/90 transition-colors font-medium">
              <Clock size={16} className="text-white/50" />
              <span className="font-mono">09:42 AM</span>
            </span>

            {/* Divider */}
            <div className="w-px h-4 bg-white/10"></div>

            {/* Pulsing Status Indicator */}
            <div className="relative flex items-center">
              {systemStatus === 'alert' && (
                <span className="absolute w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75"></span>
              )}
              <span className={`relative w-2.5 h-2.5 rounded-full ${systemStatus === 'nominal' ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-red-500 shadow-red-500/50'} shadow-lg`}></span>
            </div>

            <span className={`font-bold uppercase text-xs tracking-wider transition-colors ${systemStatus === 'nominal' ? 'text-emerald-400' : 'text-red-400'}`}>
              {systemStatus === 'nominal' ? 'All Systems Nominal' : '⚠ Active Incidents'}
            </span>
          </div>
        </div>

        {/* Quick Actions Bar - Senior Operator Requested */}
        <div className="hidden xl:flex items-center gap-2 ml-6 animate-in slide-in-from-right-5 fade-in duration-500 delay-100">
          <button
            onClick={() => showToast('info', '📢 Broadcast system activated. Speak to announce.')}
            className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/30 text-white/60 hover:text-amber-400 transition-all group relative"
            title="Broadcast Announcement"
          >
            <Megaphone size={20} />
            <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 border border-white/10 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">Broadcast</span>
          </button>

          <button
            onClick={() => showToast('success', '📄 Shift Report generated and sent to management.')}
            className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 text-white/60 hover:text-blue-400 transition-all group relative"
            title="Generate Report"
          >
            <FileText size={20} />
            <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 border border-white/10 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">Log Report</span>
          </button>

          <button
            onClick={() => showToast('info', '📻 Connecting to Security Channel 1...')}
            className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 text-white/60 hover:text-emerald-400 transition-all group relative"
            title="Security Comms"
          >
            <Radio size={20} />
            <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 border border-white/10 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">Comms</span>
          </button>

          <div className="w-px h-8 bg-white/5 mx-2"></div>

          <button
            className="p-2.5 rounded-lg border border-white/10 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/50 text-amber-500 transition-all group relative"
            title="Emergency Overview"
          >
            <Activity size={20} />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="absolute top-12 right-0 px-2 py-1 bg-neutral-900 border border-white/10 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">Live Status</span>
          </button>
        </div>
      </header>

      {/* Scrollable Content - Premium Layout */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-40 md:pb-32 lg:pb-24 space-y-6 md:space-y-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">

          {/* ENHANCED KPI CARDS - Premium Command Center Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">

            {/* Total Passengers Card */}
            <div className="group relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-br from-yellow-500/20 via-transparent to-transparent hover:from-yellow-500/30 transition-all duration-500">
              <GlassCard variant="dark" className="p-5 md:p-6 lg:p-8 rounded-3xl h-full relative overflow-hidden">
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                    <p className="text-xs font-bold text-amber-400/70 uppercase tracking-[0.2em] group-hover:text-amber-400 transition-colors">
                      Total Pax (1hr)
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-3">
                      <div className="relative group/tooltip">
                        <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-none group-hover:scale-105 transition-transform duration-300 cursor-help">
                          2,450
                        </p>
                        {/* Tooltip */}
                        <div className="absolute left-0 bottom-full mb-2 w-48 bg-neutral-900/95 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 translate-y-2 group-hover/tooltip:translate-y-0 duration-200">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] uppercase text-white/40 font-bold tracking-wider">Normal Range</span>
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">2k - 3k</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1.5">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 w-[60%] rounded-full"></div>
                          </div>
                          <p className="text-[10px] text-white/50 leading-tight">Current passenger volume is within optimal operational limits.</p>
                        </div>
                      </div>
                      <span className="text-lg text-white/30 font-medium mb-2">pax</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5 bg-emerald-500/15 px-3 py-2 rounded-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/10 group-hover:shadow-emerald-500/20 transition-shadow">
                        <span className="text-emerald-400 text-sm font-bold">↑</span>
                        <span className="text-emerald-400 text-sm font-bold">12%</span>
                      </div>
                      <p className="text-xs text-white/40 mt-2 font-medium">vs average</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors"></div>
              </GlassCard>
            </div>

            {/* Average Wait Time Card - Dynamic Status */}
            <div className={`group relative overflow-hidden rounded-3xl p-[1px] transition-all duration-500 ${systemStatus === 'nominal' ? 'bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent hover:from-emerald-500/30' : 'bg-gradient-to-br from-red-500/30 via-red-500/10 to-transparent'}`}>
              <GlassCard
                variant="dark"
                className={`p-5 md:p-6 lg:p-8 rounded-3xl h-full relative overflow-hidden transition-all duration-500 ${systemStatus === 'nominal' ? '' : 'border-red-500/40 shadow-2xl shadow-red-500/20'}`}
              >
                {/* Alert Pulse Effect */}
                {systemStatus === 'alert' && (
                  <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                )}

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${systemStatus === 'nominal' ? 'from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100' : 'from-red-500/10 via-transparent to-transparent opacity-100'}`}></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${systemStatus === 'nominal' ? 'bg-emerald-400' : 'bg-red-500 animate-pulse'}`}></div>
                    <p className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${systemStatus === 'nominal' ? 'text-white/50 group-hover:text-white/70' : 'text-red-300/70'}`}>
                      Avg Wait Time
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-3">
                      <div className="relative group/tooltip">
                        <p className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-none transition-all duration-500 cursor-help ${systemStatus === 'nominal' ? 'text-white group-hover:scale-105' : 'text-red-400 scale-110'}`}>
                          {systemStatus === 'nominal' ? '12m' : '35m'}
                        </p>
                        {/* Tooltip */}
                        <div className="absolute left-0 bottom-full mb-2 w-48 bg-neutral-900/95 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 translate-y-2 group-hover/tooltip:translate-y-0 duration-200">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] uppercase text-white/40 font-bold tracking-wider">Target</span>
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">&lt; 15 min</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-1.5">
                            <div className={`h-full transition-all duration-500 rounded-full ${systemStatus === 'nominal' ? 'w-[40%] bg-emerald-500' : 'w-[100%] bg-red-500 animate-pulse'}`}></div>
                          </div>
                          <p className="text-[10px] text-white/50 leading-tight">
                            {systemStatus === 'nominal' ? 'Queue wait times are performing optimally.' : '⚠️ Alert: Wait times exceeding service level agreements.'}
                          </p>
                        </div>
                      </div>
                      {systemStatus === 'alert' && (
                        <AlertTriangle className="text-red-400 animate-pulse mb-2" size={24} />
                      )}
                    </div>

                    <div className={`px-3 py-2 rounded-xl border font-medium text-xs transition-all ${systemStatus === 'nominal' ? 'text-white/60 bg-white/5 border-white/10' : 'text-red-100 bg-red-500/20 border-red-500/40 shadow-lg shadow-red-500/20'}`}>
                      Security Check A
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-all duration-500 ${systemStatus === 'nominal' ? 'bg-emerald-500/5 group-hover:bg-emerald-500/10' : 'bg-red-500/15'}`}></div>
              </GlassCard>
            </div>
          </div>


          {/* ENHANCED SECTION: PREDICTIVE HEATMAP - Premium God View */}
          <section className="group">
            <GlassCard variant="dark" className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl hover:shadow-amber-500/10 transition-all duration-500">
              {/* Premium Header */}
              <div className="p-4 md:p-5 lg:p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 bg-gradient-to-r from-neutral-900/95 via-neutral-900/90 to-neutral-900/95 backdrop-blur-xl">
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Animated Live Indicator */}
                  <div className="relative flex h-4 w-4 md:h-5 md:w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/50"></span>
                  </div>

                  <div>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                      Terminal Heatmap
                      <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">LIVE</span>
                    </h2>
                    <p className="text-xs text-white/50 mt-0.5 font-medium">Real-time crowd density monitoring</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold tracking-widest bg-white/5 text-white/60 px-4 py-2 rounded-lg uppercase border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    Floor 1
                  </span>
                </div>
              </div>

              {/* Heatmap Canvas */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 w-full overflow-hidden">
                {/* Animated Grid Pattern - Gold Theme */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(to right, #F59E0B 1px, transparent 1px), linear-gradient(to bottom, #F59E0B 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}></div>

                {/* Scanning Line Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div
                    className="absolute w-full h-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent blur-sm"
                    style={{
                      animation: 'scan 4s ease-in-out infinite',
                      top: '0%'
                    }}
                  ></div>
                </div>

                {/* Radial Vignette Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"></div>

                {/* Terminal Structures - Enhanced with Gold Accents */}
                {/* Check-in Counter B */}
                <div className="absolute top-6 md:top-8 left-6 md:left-8 w-20 sm:w-24 md:w-32 h-32 sm:h-40 md:h-52 border-2 border-amber-900/40 bg-gradient-to-br from-amber-950/60 to-neutral-900/80 rounded-lg shadow-2xl backdrop-blur-sm group/building hover:border-amber-700/60 transition-all duration-300">
                  <div className="absolute top-2 left-2 text-[8px] md:text-[10px] text-amber-400/70 font-mono font-bold tracking-wider">CHECK-IN B</div>

                  {/* Building Icon */}
                  <div className="absolute bottom-2 right-2 opacity-20 group-hover/building:opacity-30 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 3v18" />
                      <path d="M15 3v18" />
                      <path d="M3 9h18" />
                      <path d="M3 15h18" />
                    </svg>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/building:opacity-100 transition-opacity"></div>
                </div>

                {/* Security Checkpoint A */}
                <div className="absolute top-6 md:top-8 right-6 md:right-8 w-20 sm:w-24 md:w-32 h-32 sm:h-40 md:h-52 border-2 border-amber-900/40 bg-gradient-to-br from-amber-950/60 to-neutral-900/80 rounded-lg shadow-2xl backdrop-blur-sm group/building hover:border-amber-700/60 transition-all duration-300">
                  <div className="absolute top-2 left-2 text-[8px] md:text-[10px] text-amber-400/70 font-mono font-bold tracking-wider">SECURITY A</div>

                  {/* Building Icon */}
                  <div className="absolute bottom-2 right-2 opacity-20 group-hover/building:opacity-30 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/building:opacity-100 transition-opacity"></div>
                </div>

                {/* Enhanced Heatmap Overlays - Premium Gold Theme */}
                {/* Main hotspot (Security area) */}
                <div className={`absolute top-10 md:top-12 right-10 md:right-12 w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full transition-all duration-1000 ${systemStatus === 'nominal' ? 'opacity-40' : 'opacity-100'}`}>
                  {/* Multi-layer glow effect */}
                  <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse ${systemStatus === 'nominal' ? 'bg-gradient-to-br from-emerald-500/60 to-green-400/40' : 'bg-gradient-to-br from-red-500/80 to-orange-600/60'}`}></div>
                  <div className={`absolute inset-2 rounded-full blur-2xl ${systemStatus === 'nominal' ? 'bg-emerald-400/40' : 'bg-red-400/50'}`}></div>

                  {/* Dashed Alert Rings */}
                  {systemStatus === 'alert' && (
                    <>
                      <div className="absolute inset-0 border-4 border-red-500/50 rounded-full border-dashed animate-spin-slow"></div>
                      <div className="absolute inset-3 border-2 border-orange-400/40 rounded-full border-dashed animate-spin-slow opacity-60" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
                    </>
                  )}

                  {/* Center pulse */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${systemStatus === 'nominal' ? 'bg-emerald-400' : 'bg-red-500'} animate-ping`}></div>
                </div>

                {/* Secondary hotspot (Check-in area) */}
                <div className="absolute top-14 md:top-16 left-10 md:left-12 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full opacity-40">
                  <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-amber-500/50 to-yellow-500/30 animate-pulse" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-2 rounded-full blur-xl bg-amber-400/30"></div>
                </div>

                {/* Tertiary ambient glow */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full opacity-20">
                  <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-yellow-500/40 to-amber-600/20 animate-pulse" style={{ animationDuration: '5s' }}></div>
                </div>

                {/* Enhanced Labels with Better Styling */}
                {systemStatus === 'alert' && (
                  <div className="absolute top-40 md:top-48 right-8 md:right-12 max-w-[140px] md:max-w-none">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-red-100 bg-gradient-to-r from-red-900/95 to-red-800/90 px-3 py-2 rounded-lg border border-red-500/60 animate-bounce shadow-xl shadow-red-900/50 backdrop-blur-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                      </svg>
                      <span>Congestion Alert</span>
                    </div>
                  </div>
                )}

                <div className="absolute top-40 md:top-48 left-8 md:left-12">
                  <div className="text-[10px] md:text-xs font-bold text-amber-200/90 bg-gradient-to-r from-amber-950/90 to-neutral-900/80 px-3 py-1.5 rounded-lg border border-amber-700/40 shadow-lg backdrop-blur-md hover:border-amber-600/60 transition-colors">
                    Check-in Area B
                  </div>
                </div>

                {/* Status indicator in bottom right */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] font-mono text-white/50 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                  <div className={`w-2 h-2 rounded-full ${systemStatus === 'nominal' ? 'bg-emerald-400' : 'bg-red-500'} animate-pulse`}></div>
                  <span className="hidden md:inline">{systemStatus === 'nominal' ? 'NORMAL OPS' : 'ALERT MODE'}</span>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 text-[9px] md:text-[10px] font-mono">
                  <div className="flex items-center gap-2 text-white/40 bg-black/40 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>Low Density</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 bg-black/40 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 bg-black/40 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>High Density</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-6">
            {/* SECTION 2: LIVE ALERTS FEED */}
            <section>
              {/* Enhanced Section Header */}
              <div className="flex justify-between items-center mb-5 px-1">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/20 rounded-lg blur-md"></div>
                    <div className="relative bg-gradient-to-br from-amber-500/10 to-transparent p-2 rounded-lg border border-amber-500/20">
                      <ShieldAlert size={16} className="text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      Predictive Alerts
                    </h2>
                    <p className="text-[10px] text-white/40 font-medium mt-0.5">AI-powered threat detection</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 font-bold">
                    AUTO-REFRESH
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Critical System Alert */}
                {systemStatus === 'alert' && !alerts.find(a => a.id === 99) && (
                  <GlassCard variant="dark" className="p-5 rounded-2xl border-2 border-red-500/40 bg-gradient-to-br from-red-950/40 to-red-900/20 relative overflow-hidden group hover:border-red-500/60 transition-all duration-300">
                    {/* Alert pulse background */}
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>

                    {/* Severity indicator stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-700"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                            <div className="relative bg-red-500/20 p-2 rounded-full border-2 border-red-500/50">
                              <ShieldAlert size={18} className="text-red-400" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-base text-red-200">System Alert</span>
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-600/30 text-red-200 border border-red-500/40 uppercase tracking-wider">Critical</span>
                            </div>
                            <span className="text-[10px] text-red-300/60 font-mono">Just now • High Priority</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-red-100/90 mb-4 font-medium leading-relaxed">
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
                              showToast('success', '🚨 Protocol Initiated • Security teams have been dispatched to Security Checkpoint B');
                              closeConfirm();
                            }
                          });
                        }}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs py-3 rounded-xl transition-all shadow-xl shadow-red-900/30 font-bold uppercase tracking-wider flex items-center justify-center gap-2 group/btn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:rotate-90 transition-transform">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        Initiate Crowd Control Protocol
                      </button>
                    </div>
                  </GlassCard>
                )}

                {/* All Clear State */}
                {alerts.filter(a => a.status !== 'resolved').length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gradient-to-br from-emerald-950/20 to-transparent rounded-2xl border border-emerald-500/10">
                    <div className="relative mb-5">
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                      <div className="relative text-6xl">✅</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">All Clear</h3>
                    <p className="text-sm text-emerald-400/70 max-w-sm font-medium">
                      No active alerts detected. All systems operating nominally.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                      <Clock size={12} />
                      <span>Last checked: {new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                )}

                {/* Regular Alerts */}
                {alerts.map(alert => (
                  <GlassCard
                    variant="dark"
                    key={alert.id}
                    className={`p-4 rounded-xl border-l-4 transition-all duration-300 group relative overflow-hidden ${alert.status === 'resolved'
                      ? 'border-emerald-500/60 opacity-60 bg-emerald-950/20 hover:opacity-80'
                      : alert.type === 'critical'
                        ? 'border-red-500/60 bg-gradient-to-br from-red-950/30 to-transparent hover:border-red-500/80'
                        : 'border-amber-500/60 bg-gradient-to-br from-amber-950/20 to-transparent hover:border-amber-500/80'
                      }`}
                  >
                    {/* Subtle glow on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${alert.status === 'resolved' ? 'bg-emerald-500/5' : alert.type === 'critical' ? 'bg-red-500/5' : 'bg-amber-500/5'
                      }`}></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2.5">
                          {alert.status === 'resolved' ? (
                            <div className="bg-emerald-500/20 p-1.5 rounded-lg border border-emerald-500/30">
                              <CheckCircle size={16} className="text-emerald-400" />
                            </div>
                          ) : (
                            <div className={`p-1.5 rounded-lg border ${alert.type === 'critical' ? 'bg-red-500/20 border-red-500/30' : 'bg-amber-500/20 border-amber-500/30'}`}>
                              <AlertTriangle size={16} className={alert.type === 'critical' ? 'text-red-400' : 'text-amber-400'} />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-sm ${alert.status === 'resolved' ? 'text-emerald-300' : 'text-white'}`}>
                                {alert.location}
                              </span>
                              {alert.status !== 'resolved' && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${alert.type === 'critical'
                                  ? 'bg-red-600/30 text-red-200 border border-red-500/40'
                                  : 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                                  }`}>
                                  {alert.type}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-white/40 font-mono">{alert.time}</span>
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
                            className="flex-1 bg-transparent border-2 border-white/20 hover:bg-white/10 hover:border-white/30 text-white text-xs py-2.5 rounded-lg transition-all font-semibold backdrop-blur-sm"
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
                            className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs py-2.5 rounded-lg transition-all shadow-lg shadow-amber-900/30 font-semibold flex items-center justify-center gap-1.5"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            Deploy Staff
                          </button>
                        </div>
                      )}
                    </div>
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
                  className="relative rounded-xl overflow-hidden aspect-video bg-black border border-white/10 group cursor-pointer hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all active:scale-[0.98] min-w-[280px] md:min-w-0 snap-center"
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
                  <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                    <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                </div>

                {/* CAM 08 */}
                <div
                  className="relative rounded-xl overflow-hidden aspect-video bg-black border border-white/10 group cursor-pointer hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all active:scale-[0.98] min-w-[280px] md:min-w-0 snap-center"
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
                  <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors flex items-center justify-center pointer-events-none z-20">
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

      {/* PREMIUM FLOATING AI ASSISTANT BUTTON */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-6 md:right-8 w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-yellow-600 via-amber-600 to-amber-700 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-[60] group border-2 border-white/20 hover:border-white/40 shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(245, 158, 11, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)'
        }}
        aria-label="Open AI Assistant"
      >
        {/* Rotating gradient glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse-slow"></div>

        {/* Icon */}
        <Bot size={28} className="text-white relative z-10 drop-shadow-lg group-hover:rotate-12 transition-transform" />

        {/* Status indicator */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 border-3 border-[#0A0A0A] animate-pulse shadow-lg shadow-emerald-500/50 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-white"></span>
        </span>

        {/* Ping animation ring */}
        <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20"></div>
      </button>

      {/* AI Chatbot Modal */}
      <OperatorChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

      {/* Keyboard Shortcuts Modal */}
      {isShortcutsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsShortcutsOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <LogOut size={20} className="rotate-180" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <HelpCircle className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Keyboard Shortcuts</h3>
                <p className="text-sm text-neutral-400">Power user controls</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between group">
                <span className="text-neutral-300 group-hover:text-white transition-colors">Toggle Help</span>
                <kbd className="px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-white font-mono text-sm group-hover:bg-neutral-700 transition-colors shadow-lg shadow-black/50">?</kbd>
              </div>
              <div className="w-full h-px bg-white/5"></div>

              <div className="flex items-center justify-between group">
                <span className="text-neutral-300 group-hover:text-white transition-colors">Close Modals / Cancel</span>
                <kbd className="px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-white font-mono text-sm group-hover:bg-neutral-700 transition-colors shadow-lg shadow-black/50">Esc</kbd>
              </div>
              <div className="w-full h-px bg-white/5"></div>

              <div className="flex items-center justify-between group">
                <span className="text-neutral-300 group-hover:text-white transition-colors">Toggle System Status</span>
                <div className="flex gap-1">
                  <kbd className="px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-white font-mono text-sm group-hover:bg-neutral-700 transition-colors shadow-lg shadow-black/50">Shift</kbd>
                  <span className="text-white/30 self-center">+</span>
                  <kbd className="px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-white font-mono text-sm group-hover:bg-neutral-700 transition-colors shadow-lg shadow-black/50">Space</kbd>
                </div>
              </div>
              <div className="w-full h-px bg-white/5"></div>

              <div className="flex items-center justify-between group">
                <span className="text-neutral-300 group-hover:text-white transition-colors">Broadcast Announcement</span>
                <div className="flex gap-1">
                  <kbd className="px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-white font-mono text-sm group-hover:bg-neutral-700 transition-colors shadow-lg shadow-black/50">Shift</kbd>
                  <span className="text-white/30 self-center">+</span>
                  <kbd className="px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-white font-mono text-sm group-hover:bg-neutral-700 transition-colors shadow-lg shadow-black/50">B</kbd>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
              <Activity className="text-amber-500 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-amber-200/80 leading-relaxed">
                Shortcuts are disabled when typing in the chatbot or search fields to prevent accidental triggers.
              </p>
            </div>
          </div>
        </div>
      )}
    </OperatorLayout>
  );
};

export default OperatorDashboardScreen;