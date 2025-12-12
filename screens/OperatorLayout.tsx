import React, { useState } from 'react';
import { LayoutDashboard, LogOut, Sparkles } from 'lucide-react';
import { ScreenId } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';

interface OperatorLayoutProps {
    children: React.ReactNode;
    currentScreen: ScreenId;
    onNavigate: (screen: ScreenId) => void;
}

const OperatorLayout: React.FC<OperatorLayoutProps> = ({ children, currentScreen, onNavigate }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Operator Navigation Items
    const navItems = [
        { id: 'operator-dashboard', label: 'Dashboard', icon: LayoutDashboard, target: 'operator-dashboard' },
    ];

    const navItemClass = (screen: string) => {
        const isActive = currentScreen === screen;

        // Operator Theme (Dark) Only
        return `flex flex-col md:flex-row md:gap-5 items-center justify-center ${isCollapsed ? 'md:justify-center md:p-3 md:w-12 md:h-12 md:mx-auto md:rounded-xl' : 'md:justify-start md:p-4 w-full md:rounded-lg'} h-full md:h-auto transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-neutral-950 ${isActive
            ? 'text-white bg-gradient-to-r from-red-600/20 to-rose-600/20 md:border md:border-red-500/30 shadow-sm'
            : 'text-neutral-400 hover:text-white md:hover:bg-neutral-800'
            }`;
    };

    return (
        <div className="min-h-[100dvh] font-sans flex overflow-hidden relative bg-neutral-950 text-white selection:bg-red-500 selection:text-white">
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
                variant="dark"
            />

            {/* Ambient Blobs - Operator Theme (Red/Orange) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="blob-red w-[350px] h-[350px] md:w-[400px] md:h-[400px] top-[-75px] left-[-75px] md:top-[-100px] md:left-[-100px] animate-pulse-slow" />
                <div className="blob-orange w-[350px] h-[350px] md:w-[400px] md:h-[400px] bottom-[-75px] right-[-75px] md:bottom-[-100px] md:right-[-100px]" />
            </div>

            {/* SIDEBAR */}
            <aside className={`hidden md:flex flex-col h-[100dvh] z-50 fixed left-0 top-0 transition-all duration-300 ease-in-out backdrop-blur-xl border-r border-neutral-800 bg-neutral-900/95 ${isCollapsed ? 'w-20 p-4 items-center' : 'w-64 p-4'}`}>

                {/* Collapse Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`mb-4 flex items-center rounded-lg p-3 transition-all duration-200 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 ${isCollapsed ? 'justify-center' : 'justify-start'} hover:bg-neutral-800`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`transition-transform duration-150 ease-out ${isCollapsed ? '-rotate-90' : ''} text-neutral-400`}
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <line x1="9" x2="9" y1="3" y2="21" />
                        <line x1="14" x2="18" y1="9" y2="9" />
                        <line x1="14" x2="18" y1="15" y2="15" />
                    </svg>
                </button>

                {/* Logo Area */}
                <div className={`mb-8 flex items-center gap-2 transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'px-2'}`}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-lg transition-all duration-200 bg-gradient-to-br from-red-600 to-rose-700">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <h1 className={`text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'} text-white`}>AURA</h1>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-2 my-4">
                    <p className={`text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${isCollapsed ? 'text-center px-0 text-[10px]' : 'px-2'}`}>{isCollapsed ? 'Control...' : 'Control Center'}</p>
                    {navItems.map((item) => (
                        <button key={item.id} onClick={() => onNavigate(item.target as any)} className={navItemClass(item.target)} title={isCollapsed ? item.label : undefined}>
                            <item.icon size={20} className="shrink-0" />
                            <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Logout Button */}
                <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 mt-4 border w-full focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-neutral-950 ${isCollapsed ? 'justify-center' : ''} border-neutral-800 hover:bg-red-500/10 text-neutral-400 hover:text-red-400 hover:border-red-500/30`}
                    title={isCollapsed ? 'Logout' : undefined}
                >
                    <LogOut size={20} className="shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
                </button>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className={`flex-1 relative flex flex-col h-[100dvh] overflow-hidden transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
                <main className="flex-1 w-full relative flex flex-col overflow-hidden">
                    {children}
                </main>

                {/* MOBILE NAVIGATION */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 flex justify-around items-center z-50 pb-safe px-2 backdrop-blur-xl bg-neutral-900/95 border-t border-neutral-800">
                    {navItems.map((item) => (
                        <button key={item.id} onClick={() => onNavigate(item.target as any)} className="flex flex-col items-center justify-center w-full h-full transition-colors text-neutral-400 hover:text-white">
                            <div className="relative">
                                <item.icon size={24} className={currentScreen === item.target ? "text-red-500" : ""} />
                            </div>
                            <span className={`text-[10px] mt-1 font-medium ${currentScreen === item.target ? "text-red-500" : ""}`}>{item.label}</span>
                        </button>
                    ))}
                    <button onClick={() => setShowLogoutConfirm(true)} className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-red-400">
                        <LogOut size={24} />
                        <span className="text-[10px] mt-1 font-medium">Logout</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default OperatorLayout;
