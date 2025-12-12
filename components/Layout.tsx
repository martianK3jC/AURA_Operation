
import * as React from 'react';
import { useState } from 'react';
import { Home, Map, MessageSquare, User, Sparkles, LogOut, LayoutDashboard } from 'lucide-react';
import { ScreenId } from '../types';
import ConfirmationModal from './ConfirmationModal';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Simplified blob system (optional ambient only)
  const getBlobClasses = () => {
    if (currentScreen === 'operator-dashboard') return ['blob-red', 'blob-orange'];
    return ['blob-red', 'blob-yellow']; // Traveler default
  };

  const [blobTopColor, blobBottomColor] = getBlobClasses();

  const isOperator = currentScreen === 'operator-dashboard';

  // Screens where navigation should be HIDDEN (onboarding flow)
  const isOnboardingFlow = [
    'landing',
    'traveler-login',
    'onboarding',
    'arrival-dashboard',
    'destination-input',
    'transportation-options',
    'route-tracking'
  ].includes(currentScreen);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Navigation Items
  const navItems = [
    { id: 'scenario-b', label: 'Home', icon: Home, target: 'scenario-b' },
    { id: 'scenario-c', label: 'Map', icon: Map, target: 'scenario-c' },
    { id: 'chat', label: 'Chat', icon: MessageSquare, target: 'chat' },
    { id: 'profile', label: 'Profile', icon: User, target: 'profile' },
  ];

  const operatorNavItems = [
    { id: 'operator-dashboard', label: 'Dashboard', icon: LayoutDashboard, target: 'operator-dashboard' },
    // We could add more operator screens here later like "Reports", "Settings"
  ];

  const navItemClass = (screen: string) => {
    const isActive = currentScreen === screen || (screen === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b'));

    // Operator Theme (Dark)
    if (isOperator) {
      return `flex flex-col md:flex-row md:gap-5 items-center justify-center ${isCollapsed ? 'md:justify-center md:p-3 md:w-12 md:h-12 md:mx-auto md:rounded-xl' : 'md:justify-start md:p-4 w-full md:rounded-lg'} h-full md:h-auto transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-neutral-950 ${isActive
        ? 'text-white bg-gradient-to-r from-red-600/20 to-rose-600/20 md:border md:border-red-500/30 shadow-sm'
        : 'text-neutral-400 hover:text-white md:hover:bg-neutral-800'
        }`;
    }

    // Traveler Theme (Light)
    return `flex flex-col md:flex-row md:gap-3 items-center justify-center ${isCollapsed ? 'md:justify-center md:p-1' : 'md:justify-start md:p-2'} w-full h-full md:h-auto md:rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 ${isActive
      ? 'text-red-600 bg-red-50 md:border md:border-red-100 shadow-sm font-medium'
      : 'text-neutral-600 hover:text-neutral-900 md:hover:bg-neutral-100'
      }`;
  };

  return (
    <div className={`min-h-[100dvh] font-sans flex overflow-hidden relative ${isOperator ? 'bg-neutral-950 text-white selection:bg-red-500' : 'bg-neutral-50 text-neutral-900 selection:bg-red-500'} selection:text-white`}>
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        title="Log Out"
        message="Are you sure you want to log out? You will be returned to the Landing Screen."
        onConfirm={() => {
          onNavigate('landing');
          setShowLogoutConfirm(false);
        }}
        onCancel={() => setShowLogoutConfirm(false)}
        confirmText="Log Out"
        isDangerous={true}
        variant={isOperator ? 'dark' : 'light'}
      />

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600/95 backdrop-blur text-white text-[10px] md:text-xs font-bold text-center py-1.5 z-[9999] shadow-lg animate-in slide-in-from-top duration-300">
          ⚠️ No Internet Connection. You are viewing cached data.
        </div>
      )}

      {/* Ambient Blobs - Fixed Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`blob w-[350px] h-[350px] md:w-[400px] md:h-[400px] top-[-75px] left-[-75px] md:top-[-100px] md:left-[-100px] animate-pulse-slow ${blobTopColor}`} />
        <div className={`blob w-[350px] h-[350px] md:w-[400px] md:h-[400px] bottom-[-75px] right-[-75px] md:bottom-[-100px] md:right-[-100px] ${blobBottomColor}`} />
      </div>

      {/* DESKTOP SIDEBAR (Hidden on Mobile, Hidden during Onboarding Flow) */}
      {!isOnboardingFlow && (
        <aside className={`hidden md:flex flex-col h-[100dvh] z-50 fixed left-0 top-0 transition-all duration-300 ease-in-out backdrop-blur-xl ${isCollapsed ? 'w-20 p-4 items-center' : 'w-64 p-4'} ${isOperator ? 'border-r border-neutral-800 bg-neutral-900/95' : 'border-r border-neutral-200 bg-white/95'}`}>

          {/* Collapse Toggle Button - Left Aligned */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`mb-4 flex items-center rounded-lg p-3 transition-all duration-200 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 ${isCollapsed ? 'justify-center' : 'justify-start'} ${isOperator ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-150 ease-out ${isCollapsed ? '-rotate-90' : ''} ${isOperator ? 'text-neutral-400' : 'text-neutral-600'}`}
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="9" x2="9" y1="3" y2="21" />
              <line x1="14" x2="18" y1="9" y2="9" />
              <line x1="14" x2="18" y1="15" y2="15" />
            </svg>
          </button>

          {/* Logo Area */}
          <div className={`mb-8 flex items-center gap-2 transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'px-2'}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-lg transition-all duration-200 ${isOperator ? 'bg-gradient-to-br from-red-600 to-rose-700' : 'bg-gradient-to-br from-red-600 to-rose-600'}`}>
              <Sparkles size={18} className="text-white" />
            </div>
            <h1 className={`text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'} ${isOperator ? 'text-white' : 'text-neutral-900'}`}>AURA</h1>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-2 my-4">
            {isOperator ? (
              // Operator Menu
              <>
                <p className={`text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${isCollapsed ? 'text-center px-0 text-[10px]' : 'px-2'}`}>{isCollapsed ? 'Control...' : 'Control Center'}</p>
                {operatorNavItems.map((item) => (
                  <button key={item.id} onClick={() => onNavigate(item.target as any)} className={navItemClass(item.target)} title={isCollapsed ? item.label : undefined}>
                    <item.icon size={20} className="shrink-0" />
                    <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{item.label}</span>
                  </button>
                ))}
              </>
            ) : (
              // Traveler Menu
              <>
                <p className={`text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${isCollapsed ? 'text-center px-0 text-[10px]' : 'px-2'}`}>Menu</p>
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => onNavigate(item.target as any)} className={navItemClass(item.target)} title={isCollapsed ? item.label : undefined}>
                    <div className="relative">
                      <item.icon size={20} className="shrink-0" />
                      {item.id === 'chat' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-pulse" />}
                    </div>
                    <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{item.label}</span>
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Logout Button - Operator Only */}
          {isOperator && (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 mt-4 border w-full focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-neutral-950 ${isCollapsed ? 'justify-center' : ''} border-neutral-800 hover:bg-red-500/10 text-neutral-400 hover:text-red-400 hover:border-red-500/30`}
              title={isCollapsed ? 'Logout' : undefined}
              aria-label="Logout from application"
            >
              <LogOut size={20} className="shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
            </button>
          )}
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 relative flex flex-col h-[100dvh] overflow-hidden transition-all duration-300 ${!isOnboardingFlow ? (isCollapsed ? 'md:ml-20' : 'md:ml-64') : ''}`}>

        {/* Scrollable Content Wrapper */}
        <main className={`flex-1 w-full relative flex flex-col overflow-hidden ${currentScreen === 'landing' ? 'h-full' : ''}`}>
          {children}
        </main>

        {/* MOBILE NAVIGATION LOGIC - Hidden during Onboarding Flow */}
        {!isOnboardingFlow && (
          <>
            {/* UNIFIED: Standard Fixed Bottom Navigation */}
            <nav className={`md:hidden fixed bottom-0 left-0 right-0 h-20 flex justify-around items-center z-50 pb-safe px-2 backdrop-blur-xl ${isOperator ? 'bg-neutral-900/95 border-t border-neutral-800' : 'bg-white/95 border-t border-neutral-200'}`}>
              {(isOperator ? operatorNavItems : navItems).map((item) => (
                <button key={item.id} onClick={() => onNavigate(item.target as any)} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isOperator ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'}`}>
                  <div className="relative">
                    <item.icon size={24} className={currentScreen === item.target || (item.target === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b')) ? (isOperator ? "text-red-500" : "text-red-600") : ""} />
                    {item.id === 'chat' && <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse ${isOperator ? 'bg-red-500' : 'bg-red-600'}`} />}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${currentScreen === item.target || (item.target === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b')) ? (isOperator ? "text-red-500" : "text-red-600") : ""}`}>{item.label}</span>
                </button>
              ))}

              {/* Add explicit Logout for Operator on Mobile Bottom Nav since they don't have many tabs */}
              {isOperator && (
                <button onClick={() => setShowLogoutConfirm(true)} className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-red-400">
                  <LogOut size={24} />
                  <span className="text-[10px] mt-1 font-medium">Logout</span>
                </button>
              )}
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
