
import React, { useState } from 'react';
import { Lock, Activity, Zap, Shield } from 'lucide-react';
import auraLogo from '../img/aura_logo_rounded_v2.png';
import { ScreenId } from '../types';

interface OperatorLandingScreenProps {
    onNavigate: (screen: ScreenId) => void;
}

const OperatorLandingScreen: React.FC<OperatorLandingScreenProps> = ({ onNavigate }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        // Simulate a brief login delay for effect
        setTimeout(() => {
            onNavigate('operator-dashboard');
        }, 1500);
    };

    return (
        <div className="relative min-h-screen w-full bg-neutral-950 overflow-hidden flex flex-col items-center justify-center font-sans text-white selection:bg-yellow-500 selection:text-white">
            {/* Background Effects - Gold Theme */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-yellow-500/12 via-amber-500/12 to-orange-400/12 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-amber-600/12 via-yellow-500/12 to-orange-500/12 rounded-full blur-[120px]" style={{ animationDelay: '1.5s' }} />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md p-6">

                {/* Header */}
                <div className="mb-12 text-center space-y-3 animate-slide-up">


                    {/* Logo */}
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-2xl"></div>
                        <div className="relative w-20 h-20 rounded-2xl mx-auto flex items-center justify-center overflow-hidden shadow-2xl border border-white/10">
                            <img src={auraLogo} alt="AURA Logo" className="w-full h-full object-cover scale-[1.3]" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent transform scale-y-110">
                        AURA
                    </h1>
                    <div className="flex items-center gap-4 justify-center mt-2">
                        <div className="h-px w-8 bg-amber-500/50"></div>
                        <p className="text-xl tracking-[0.3em] text-amber-500 font-bold uppercase text-shadow-glow">
                            Operating System
                        </p>
                        <div className="h-px w-8 bg-amber-500/50"></div>
                    </div>
                    <p className="text-xs text-white/30 font-mono mt-4 tracking-widest uppercase">Mactan-Cebu International Airport • Terminal 1</p>
                </div>

                {/* Login Card */}
                <div className="group relative bg-neutral-900/70 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl animate-fade-in transition-all duration-500 hover:border-white/20 hover:shadow-none">
                    <div className="absolute -inset-px bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />

                    <div className="relative space-y-6">
                        {/* Card Header */}
                        <div className="text-center space-y-2 pb-4 border-b border-white/5">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Shield className="w-5 h-5 text-amber-400" />
                                <h2 className="text-xl font-bold text-white tracking-tight">Operator Access</h2>
                            </div>
                            <p className="text-sm text-white/50 font-medium">Secure entry for authorized personnel</p>
                        </div>

                        {/* Input Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1">Operator ID</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Activity className="h-5 w-5 text-white/40 group-focus-within/input:text-amber-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-11 pr-4 py-3.5 border border-white/10 rounded-xl leading-5 bg-neutral-900 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-mono text-base transition-all hover:bg-neutral-800/80 tracking-widest"
                                    placeholder="OP-XXXX-X"
                                    defaultValue="OP-8821-A" // Pre-filled for demo
                                />
                            </div>
                        </div>

                        {/* Submit Button - Premium Style */}
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-amber-900/30 hover:shadow-amber-900/50 border border-amber-500/20"
                        >
                            {isLoading ? (
                                <>
                                    <Zap className="animate-pulse w-5 h-5" />
                                    <span className="tracking-wide">Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    <span className="tracking-wide">Initialize Session</span>
                                </>
                            )}
                        </button>

                        {/* Security Notice */}
                        <div className="pt-4 border-t border-white/5">
                            <p className="text-xs text-center text-white/40 font-medium leading-relaxed">
                                🔒 All sessions are encrypted and monitored for security
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center gap-4 text-xs text-white/30 font-mono">
                        <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
                            NETWORK STABLE
                        </span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="hover:text-white/60 transition-colors cursor-pointer">V 2.4.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperatorLandingScreen;
