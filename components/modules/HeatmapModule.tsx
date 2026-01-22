import React from 'react';
import { PredictiveHeatmapVisualization } from '../PredictiveHeatmapVisualization';
import { useToast } from '../../contexts/ToastContext';

interface HeatmapModuleProps {
    systemStatus?: 'nominal' | 'alert';
}

const HeatmapModule: React.FC<HeatmapModuleProps> = ({ systemStatus = 'nominal' }) => {
    const { showToast } = useToast();

    return (
        <div className="p-6 md:p-8 space-y-8">


            {/* Heatmap Component */}
            <div className="max-w-7xl mx-auto">
                <PredictiveHeatmapVisualization systemStatus={systemStatus} showToast={showToast} />
            </div>
        </div>
    );
};

export default HeatmapModule;
