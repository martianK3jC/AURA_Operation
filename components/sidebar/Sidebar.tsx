import React from 'react';
import { LayoutDashboard, Users, Map, Video, UserCog, Plane, X, ChevronLeft, ChevronRight } from 'lucide-react';

export type SectionId = 'overview' | 'population' | 'heatmap' | 'surveillance' | 'staff-allocation' | 'flights';

interface SidebarProps {
    activeSection: SectionId;
    onSectionChange: (section: SectionId) => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

const navigationItems = [
    { id: 'overview' as SectionId, label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'flights' as SectionId, label: 'Flight Schedule', icon: Plane },
    { id: 'population' as SectionId, label: 'Population', icon: Users },
    { id: 'heatmap' as SectionId, label: 'Heatmap', icon: Map },
    { id: 'surveillance' as SectionId, label: 'Live Surveillance', icon: Video },
    { id: 'staff-allocation' as SectionId, label: 'Staff Allocation', icon: UserCog },
];

const Sidebar: React.FC<SidebarProps> = ({
    activeSection,
    onSectionChange,
    isMobileOpen = false,
    onMobileClose,
    isCollapsed = false,
    onToggleCollapse,
}) => {
    const handleSectionClick = (sectionId: SectionId) => {
        onSectionChange(sectionId);
        if (onMobileClose) {
            onMobileClose();
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-r border-white/10 z-50 flex flex-col transition-all duration-300 
                ${isMobileOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full md:translate-x-0'}
                ${isCollapsed ? 'md:w-20' : 'md:w-[280px]'}
                `}
            >
                {/* Collapse Toggle Button (Desktop) */}
                <button
                    onClick={onToggleCollapse}
                    className="hidden md:flex absolute -right-3 top-9 w-6 h-6 bg-neutral-800 border border-white/20 rounded-full items-center justify-center text-white/70 hover:text-white hover:bg-neutral-700 transition-all z-50 shadow-lg"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* Logo / Header */}
                <div className={`border-b border-white/10 flex items-center ${isCollapsed ? 'justify-center p-4' : 'p-6 justify-between'}`}>
                    {isCollapsed ? (
                        <h1 className="text-xl font-black text-amber-500 tracking-tight">AO</h1>
                    ) : (
                        <div className="overflow-hidden whitespace-nowrap">
                            <h1 className="text-2xl font-black text-white tracking-tight">
                                <span className="text-amber-500">AURA</span> Operations
                            </h1>
                            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">MCIA Control Center</p>
                        </div>
                    )}

                    {/* Mobile Close Button */}
                    {!isCollapsed && (
                        <button
                            onClick={onMobileClose}
                            className="md:hidden w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-4 h-4 text-white/70" />
                        </button>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-3 md:p-4 overflow-y-auto scrollbar-none">
                    <div className="space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleSectionClick(item.id)}
                                    title={isCollapsed ? item.label : undefined}
                                    className={`w-full flex items-center transition-all duration-300 group rounded-xl
                                    ${isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-4'}
                                    ${isActive
                                            ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 shadow-lg shadow-amber-500/20'
                                            : 'bg-white/5 border-2 border-transparent hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div
                                        className={`flex items-center justify-center transition-all duration-300 relative
                                        ${isCollapsed ? 'w-6 h-6' : 'w-10 h-10 rounded-lg'}
                                        ${isActive && !isCollapsed
                                                ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30 border border-amber-500/50'
                                                : !isCollapsed ? 'bg-white/10 border border-white/20 group-hover:bg-white/20' : ''
                                            }`}
                                    >
                                        <Icon
                                            className={`transition-colors ${isActive ? 'text-amber-400' : 'text-white/70 group-hover:text-white'}
                                            ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}
                                            `}
                                        />
                                    </div>
                                    {!isCollapsed && (
                                        <span
                                            className={`font-bold text-sm tracking-wide transition-colors whitespace-nowrap overflow-hidden ${isActive ? 'text-amber-400' : 'text-white/70 group-hover:text-white'
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer / User Info */}
                <div className={`border-t border-white/10 ${isCollapsed ? 'p-3' : 'p-4'}`}>
                    <div className={`flex items-center rounded-xl bg-white/5 ${isCollapsed ? 'justify-center p-2' : 'gap-3 p-3'}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            DC
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold text-white whitespace-nowrap">David Chen</p>
                                <p className="text-xs text-white/50 whitespace-nowrap">AOCC Manager</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
