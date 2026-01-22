import React, { useState, useEffect } from 'react';
import { Menu, Bell, Bot } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import Loader from '../components/Loader';
import OperatorChatbot from '../components/OperatorChatbot';
import Sidebar, { SectionId } from '../components/sidebar/Sidebar';
import RecommendationCard from '../components/RecommendationCard';

// Modules
import SectionExecutiveOverview from '../components/dashboard/SectionExecutiveOverview';
import FlightScheduleModule from '../components/modules/FlightScheduleModule';
import PopulationModule from '../components/modules/PopulationModule';
import HeatmapModule from '../components/modules/HeatmapModule';
import StaffAllocationModule from '../components/modules/StaffAllocationModule';
import SurveillanceModule from '../components/modules/SurveillanceModule';
import TacticalMap from '../components/TacticalMap';


// Demo Data
import {
    demoFlights,
    demoStaff,
    demoZones,
    demoRecommendation,
    DemoRecommendation
} from '../data/demoData';
import { useDemoMode } from '../hooks/useDemoMode';

// Types
import { ScreenId } from '../types';

interface Props {
    onNavigate: (screen: ScreenId) => void;
}

const NewOperatorDashboard: React.FC<Props> = ({ onNavigate }) => {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    // Navigation
    const [activeSection, setActiveSection] = useState<SectionId>('overview');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Demo Mode
    const { isDemoMode, demoState, deployStaff } = useDemoMode();

    // State
    const [currentTime, setCurrentTime] = useState(new Date());
    const [systemStatus] = useState<'nominal' | 'alert'>('alert');
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [currentRecommendation, setCurrentRecommendation] = useState<DemoRecommendation | null>(null);
    const [staff, setStaff] = useState(demoStaff);

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

    // Demo: Show recommendation after alert is triggered
    useEffect(() => {
        if (isDemoMode && demoState.alertTriggered && !demoState.recommendationShown) {
            setTimeout(() => {
                setShowRecommendation(true);
                setCurrentRecommendation(demoRecommendation);
            }, 2000); // 2 seconds after alert
        }
    }, [isDemoMode, demoState.alertTriggered, demoState.recommendationShown]);

    const handleAcceptRecommendation = (_recommendationId: number) => {
        // Update staff assignments
        const updatedStaff = staff.map(member => {
            if (currentRecommendation?.suggestedStaff.includes(member.id)) {
                return {
                    ...member,
                    currentAssignment: 'Security Zone 2',
                    available: false
                };
            }
            return member;
        });

        setStaff(updatedStaff);
        setShowRecommendation(false);
        setCurrentRecommendation(null);

        if (isDemoMode) {
            deployStaff();
        }

        showToast('success', 'Staff deployed to Security Zone 2');

        // Auto-navigate to staff allocation to show the update
        setTimeout(() => {
            setActiveSection('staff-allocation');
        }, 1000);
    };

    const handleDismissRecommendation = (_recommendationId: number) => {
        setShowRecommendation(false);
        setCurrentRecommendation(null);
    };



    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <SectionExecutiveOverview systemStatus={systemStatus} />
                    </div>
                );
            case 'flights':
                return <FlightScheduleModule flights={demoFlights} />;
            case 'population':
                // Grouping Population Stats & Map
                return (
                    <div className="space-y-6">
                        <PopulationModule zones={demoZones} />
                    </div>
                );
            case 'heatmap':
                return <HeatmapModule systemStatus={systemStatus} />;
            case 'staff-allocation':
                return <StaffAllocationModule staff={staff} />;
            case 'surveillance':
                return <SurveillanceModule />;
            default:
                return <SectionExecutiveOverview systemStatus={systemStatus} />;
        }
    };

    if (isLoading) return <Loader text="Connecting to Uplink..." />;

    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-[280px]'}`}>
                {/* Header */}
                <header className="h-16 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-between px-6 flex-shrink-0 z-30">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="md:hidden w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5 text-white/70" />
                    </button>

                    {/* Title */}
                    <div className="hidden md:block">
                        <h1 className="text-lg font-bold text-white">
                            {activeSection === 'overview' && 'Executive Overview'}
                            {activeSection === 'flights' && 'Flight Schedule'}
                            {activeSection === 'population' && 'Population Monitoring'}
                            {activeSection === 'heatmap' && 'Heatmap Visualization'}
                            {activeSection === 'surveillance' && 'Live Surveillance'}
                            {activeSection === 'staff-allocation' && 'Staff Allocation'}
                        </h1>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Demo Mode Indicator */}
                        {isDemoMode && (
                            <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40">
                                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                                    Demo Mode
                                </span>
                            </div>
                        )}



                        {/* Alert Bell */}
                        <button
                            className="relative w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Alerts"
                        >
                            <Bell className="w-5 h-5 text-white/70" />
                            {isDemoMode && demoState.alertTriggered && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-neutral-950 flex items-center justify-center text-xs font-bold text-white">
                                    1
                                </span>
                            )}
                        </button>

                        {/* Time */}
                        <div className="hidden md:block text-sm text-white/50 font-mono">
                            {currentTime.toLocaleTimeString()}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>



            {/* AI Recommendation Card */}
            {showRecommendation && currentRecommendation && (
                <RecommendationCard
                    recommendation={currentRecommendation}
                    onAccept={handleAcceptRecommendation}
                    onDismiss={handleDismissRecommendation}
                />
            )}


        </div>
    );
};

export default NewOperatorDashboard;
