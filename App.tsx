import React, { useState } from 'react';
import OperatorLandingScreen from './screens/OperatorLandingScreen';
import OperatorDashboardScreen from './screens/OperatorDashboardScreen';
import { ToastProvider } from './contexts/ToastContext';
import { ScreenId } from './types';

const App = () => {
    // Defaulting to operator-landing for login flow
    const [currentScreen, setCurrentScreen] = useState<ScreenId>('operator-landing');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'operator-landing':
                return <OperatorLandingScreen onNavigate={setCurrentScreen} />;
            case 'operator-dashboard':
                return <OperatorDashboardScreen onNavigate={setCurrentScreen} />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-screen bg-[#0A0A0A] text-white font-sans">
                        <h1 className="text-3xl font-bold mb-6">Work in Progress</h1>
                        <p className="text-slate-400 mb-8">Screen ID: <span className="font-mono text-orange-400">{currentScreen}</span></p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentScreen('operator-dashboard')}
                                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold transition-colors"
                            >
                                Go to Operator Dashboard
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <ToastProvider>
            {renderScreen()}
        </ToastProvider>
    );
};

export default App;
