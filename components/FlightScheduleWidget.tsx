import React from 'react';
import { Plane, Clock, Users } from 'lucide-react';
import GlassCard from './GlassCard';
import { Flight } from '../data/demoData';

interface FlightScheduleWidgetProps {
    flights: Flight[];
    timeWindow?: number; // minutes
    showPrediction?: boolean;
}

const FlightScheduleWidget: React.FC<FlightScheduleWidgetProps> = ({
    flights,
    timeWindow = 60,
    showPrediction = true
}) => {
    const totalPassengers = flights.reduce((sum, flight) => sum + flight.passengerCount, 0);
    const arrivalFlights = flights.filter(f => f.type === 'arrival');

    return (
        <GlassCard variant="dark" className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30">
                        <Plane className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Incoming Flights</h3>
                        <p className="text-sm text-white/50">Next {timeWindow} minutes</p>
                    </div>
                </div>

                {showPrediction && (
                    <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                            <Users className="w-4 h-4 text-amber-400" />
                            <span className="text-2xl font-black text-amber-400">{totalPassengers}</span>
                        </div>
                        <p className="text-xs text-white/50 uppercase tracking-wider">Predicted Pax</p>
                    </div>
                )}
            </div>

            {/* Flight List */}
            <div className="space-y-3">
                {flights.map((flight, index) => (
                    <div
                        key={flight.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                        {/* Flight Info */}
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${flight.status === 'on-time'
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    }`}>
                                    {flight.id}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-white">{flight.origin}</span>
                                    <span className="text-white/30">→</span>
                                    <span className="text-sm text-white/70">{flight.destination}</span>
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3 h-3 text-white/40" />
                                        <span className="text-xs text-white/50">{flight.scheduledTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-3 h-3 text-white/40" />
                                        <span className="text-xs text-white/50">{flight.passengerCount} pax</span>
                                    </div>
                                    <span className="text-xs text-white/40">Gate {flight.gate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${flight.status === 'on-time'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : flight.status === 'delayed'
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : flight.status === 'boarding'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                        : 'bg-white/10 text-white/70 border border-white/20'
                            }`}>
                            {flight.status}
                        </div>
                    </div>
                ))}
            </div>

            {/* Prediction Summary (for demo) */}
            {showPrediction && arrivalFlights.length > 0 && (
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <Plane className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-amber-400 mb-1">Predicted Impact</p>
                            <p className="text-xs text-white/70 leading-relaxed">
                                {arrivalFlights.length} flights arriving between {arrivalFlights[0]?.scheduledTime} - {arrivalFlights[arrivalFlights.length - 1]?.scheduledTime}
                                {' '}with approximately <span className="text-amber-400 font-bold">{totalPassengers} passengers</span> expected to pass through security checkpoints.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </GlassCard>
    );
};

export default FlightScheduleWidget;
