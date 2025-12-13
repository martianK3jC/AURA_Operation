import React from 'react';
import { LogOut } from 'lucide-react';
import auraLogo from '../../img/aura_logo_rounded_v2.png';

interface DashboardHeaderProps {
    systemStatus: 'nominal' | 'alert';
    currentTime: Date;
    onToggleStatus: () => void;
    onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    systemStatus,
    currentTime,
    onToggleStatus,
    onLogout
}) => {
    return (
        <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
            {/* LEFT: Branding */}
            <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                        src={auraLogo}
                        alt="AURA"
                        className="h-10 w-10 relative z-10"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tighter leading-none">
                        AURA <span className="text-amber-500 font-mono text-lg align-top opacity-80">OS</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <p className="text-[10px] text-white/40 font-mono tracking-[0.2em] uppercase">
                            Terminal 1 • Live
                        </p>
                    </div>
                </div>
            </div>

            {/* CENTER: Status Badge */}
            <div
                className="hidden md:flex flex-col items-center cursor-pointer group"
                onClick={onToggleStatus}
            >
                <div className={`
          px-4 py-1.5 rounded-full border flex items-center gap-2 transition-all duration-300
          ${systemStatus === 'nominal'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }
        `}>
                    <span className={`w-2 h-2 rounded-full ${systemStatus === 'nominal' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    <span className="text-xs font-bold font-mono tracking-widest uppercase">
                        {systemStatus === 'nominal' ? 'System Nominal' : 'active alert'}
                    </span>
                </div>
            </div>

            {/* RIGHT: Time & Actions */}
            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="text-2xl font-black text-white leading-none font-variant-numeric tabular-nums tracking-tight">
                        {currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
                        {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                </div>

                <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

                <button
                    onClick={onLogout}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all border border-transparent hover:border-white/10 group relative overflow-hidden"
                    title="Logout"
                >
                    <LogOut size={20} className="relative z-10 group-hover:rotate-12 transition-transform" />
                    <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
