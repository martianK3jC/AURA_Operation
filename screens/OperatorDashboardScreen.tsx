import React, { useState, useEffect } from 'react';
import OperatorLayout from './OperatorLayout';
import OperatorChatbot from '../components/OperatorChatbot';
import ConfirmationModal from '../components/ConfirmationModal';
import Loader from '../components/Loader';
import { useToast } from '../contexts/ToastContext';
import { Bot } from 'lucide-react';

// Sub-components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SectionExecutiveOverview from '../components/dashboard/SectionExecutiveOverview';
import SectionTacticalMap from '../components/dashboard/SectionTacticalMap';
import SectionAlertsResponse, { Alert } from '../components/dashboard/SectionAlertsResponse';
import CCTVModal from '../components/dashboard/CCTVModal';



// Types
import { ScreenId } from '../types'; // Preserving existing import

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const OperatorDashboardScreen: React.FC<Props> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // State
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<'nominal' | 'alert'>('nominal');
  const [expandedCam, setExpandedCam] = useState<number | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);


  // Alerts State
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, type: 'warning', location: 'Check-in Row B', message: 'Queue density exceeding threshold (85%)', time: '2m ago', status: 'active' },
    { id: 2, type: 'info', location: 'Gate A12', message: 'Flight CX882 boarding initiated', time: '5m ago', status: 'active' },
    { id: 3, type: 'critical', location: 'Security Zone 2', message: 'Unattended baggage detected (Cam 04)', time: 'Just now', status: 'active' },
  ]);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    isDangerous: false,
    onConfirm: () => { },
  });

  // Init Loader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard Listeners (Simplified)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close Modals (Esc)
      if (e.key === 'Escape') {
        setExpandedCam(null);
        setIsChatbotOpen(false);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSystemStatus = () => {
    const newStatus = systemStatus === 'nominal' ? 'alert' : 'nominal';
    setSystemStatus(newStatus);
    showToast(
      newStatus === 'alert' ? 'warning' : 'success',
      `System Status changed to: ${newStatus.toUpperCase()}`
    );
  };

  const closeConfirm = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleResolve = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
    showToast('success', 'Alert resolved and logged in incident report.');
  };

  const handleLogout = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Logout',
      message: 'Are you sure you want to end your session?',
      confirmText: 'Logout',
      isDangerous: true,
      onConfirm: () => {
        setTimeout(() => onNavigate('operator-landing'), 1000);
        closeConfirm();
      }
    });
  };

  if (isLoading) return <Loader text="Connecting to Uplink..." />;

  return (
    <OperatorLayout currentScreen="operator-dashboard" onNavigate={onNavigate}>
      <div className="flex flex-col h-screen bg-[#050505] text-white selection:bg-amber-500/30 overflow-hidden relative font-sans">

        {/* Header */}
        <DashboardHeader
          systemStatus={systemStatus}
          currentTime={currentTime}
          onToggleStatus={toggleSystemStatus}
          onLogout={handleLogout}
        />

        {/* Main Content - Snap Scroll */}
        <div className="flex-1 overflow-y-auto scroll-smooth snap-y snap-mandatory pb-20">

          {/* Section 1 */}
          <SectionExecutiveOverview systemStatus={systemStatus} />

          {/* Section 2 */}
          <SectionTacticalMap
            systemStatus={systemStatus}
            showToast={showToast}
          />

          {/* Section 3 */}
          <SectionAlertsResponse
            systemStatus={systemStatus}
            alerts={alerts}
            onResolveAlert={handleResolve}
            showToast={showToast}
            setExpandedCam={setExpandedCam}
            setConfirmModal={setConfirmModal}
            closeConfirm={closeConfirm}
          />
        </div>

        {/* Global Footer Elements */}

        {/* Floating AI Button */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-24 md:bottom-8 right-6 md:right-8 w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-yellow-600 via-amber-600 to-amber-700 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-[60] group border-2 border-white/20 hover:border-white/40 shadow-2xl"
          style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)' }}
          aria-label="Open AI Assistant"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse-slow"></div>
          <Bot size={28} className="text-white relative z-10 drop-shadow-lg group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 border-3 border-[#0A0A0A] animate-pulse shadow-lg shadow-emerald-500/50 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white"></span>
          </span>
          <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20"></div>
        </button>

        {/* Modals */}
        <OperatorChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.confirmText}
          isDangerous={confirmModal.isDangerous}
          onConfirm={confirmModal.onConfirm}
          onCancel={closeConfirm}
        />



        <CCTVModal camId={expandedCam} onClose={() => setExpandedCam(null)} systemStatus={systemStatus} />

      </div>
    </OperatorLayout>
  );
};

export default OperatorDashboardScreen;