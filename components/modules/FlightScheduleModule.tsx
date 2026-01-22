import React from 'react';
import { Plane } from 'lucide-react';
import FlightScheduleWidget from '../FlightScheduleWidget';
import { Flight } from '../../data/demoData';

interface FlightScheduleModuleProps {
    flights: Flight[];
}

const FlightScheduleModule: React.FC<FlightScheduleModuleProps> = ({ flights }) => {
    return (
        <div className="p-6 md:p-8 space-y-8">


            {/* Flight Schedule Widget */}
            <div className="max-w-4xl mx-auto">
                <FlightScheduleWidget flights={flights} timeWindow={60} showPrediction={true} />
            </div>

            {/* Additional Info */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-3">
                        <Plane className="w-5 h-5 text-blue-400" />
                        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Total Flights</h3>
                    </div>
                    <p className="text-4xl font-black text-white">{flights.length}</p>
                    <p className="text-xs text-white/50 mt-1">in next 60 minutes</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                        <Plane className="w-5 h-5 text-amber-400 rotate-45" />
                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Arrivals</h3>
                    </div>
                    <p className="text-4xl font-black text-white">
                        {flights.filter(f => f.type === 'arrival').length}
                    </p>
                    <p className="text-xs text-white/50 mt-1">incoming flights</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30">
                    <div className="flex items-center gap-3 mb-3">
                        <Plane className="w-5 h-5 text-emerald-400 -rotate-45" />
                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Departures</h3>
                    </div>
                    <p className="text-4xl font-black text-white">
                        {flights.filter(f => f.type === 'departure').length}
                    </p>
                    <p className="text-xs text-white/50 mt-1">outgoing flights</p>
                </div>
            </div>
        </div>
    );
};

export default FlightScheduleModule;
