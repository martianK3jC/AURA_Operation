
import React, { useState } from 'react';
import { Shield, Lock, Activity, Globe, Zap } from 'lucide-react';
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
        <div className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans text-white selection:bg-orange-500/30">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md p-6">

                <div className="mb-12 text-center space-y-2 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-orange-400 mb-4 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        SYSTEM ONLINE
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        AURA
                    </h1>
                    <p className="text-sm tracking-[0.2em] text-orange-500 font-bold uppercase">
                        Operation Command
                    </p>
                </div>

                {/* Login Card */}
                <div className="group relative bg-[#0A0A0A]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl animate-fade-in transition-all duration-500 hover:border-orange-500/30">
                    <div className="absolute -inset-px bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-600 rounded-xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Operator Access</h2>
                            <p className="text-sm text-slate-400">Secure entry for authorized personnel only</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Operator ID</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Activity className="h-4 w-4 text-slate-500 group-focus-within/input:text-orange-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 sm:text-sm transition-all"
                                        placeholder="OP-8821-X"
                                        defaultValue="OP-8821-A" // Pre-filled for demo
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <>
                                        <Zap className="animate-pulse w-4 h-4" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        Initialize Session
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <div className="flex items-center justify-center gap-6 text-xs text-slate-600 font-mono">
                        <span className="flex items-center gap-1 hover:text-orange-400 transition-colors cursor-pointer">
                            <Globe className="w-3 h-3" /> NETWORK: STABLE
                        </span>
                        <span className="w-1 h-1 bg-slate-700/50 rounded-full" />
                        <span className="hover:text-white transition-colors cursor-pointer">V 2.4.0 (BETA)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperatorLandingScreen;
