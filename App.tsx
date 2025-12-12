import * as React from 'react';
import { useState } from 'react';
import OperatorDashboardScreen from './screens/OperatorDashboardScreen';
import { ScreenId } from './types';
import './index.css';

const App: React.FC = () => {
    const [, setCurrentScreen] = useState<ScreenId>('operator-dashboard');

    const handleNavigate = (screen: ScreenId) => {
        console.log('Navigating to:', screen);
        setCurrentScreen(screen);
        // Add logic here to switch screens if there are others
    };

    return (
        <OperatorDashboardScreen onNavigate={handleNavigate} />
    );
};

export default App;
