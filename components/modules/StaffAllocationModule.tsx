import React from 'react';
import { UserCog, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import GlassCard from '../GlassCard';
import { StaffMember } from '../../data/demoData';

interface StaffAllocationModuleProps {
    staff: StaffMember[];
    onAssignStaff?: (staffIds: string[], location: string) => void;
}

const StaffAllocationModule: React.FC<StaffAllocationModuleProps> = ({
    staff,
    onAssignStaff
}) => {
    const onDutyStaff = staff.filter(s => s.status === 'on-duty');
    const availableStaff = staff.filter(s => s.available);
    const securityOfficers = staff.filter(s => s.role === 'Security Officer');

    return (
        <div className="p-6 md:p-8 space-y-8">


            {/* Summary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <GlassCard variant="dark" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                        <p className="text-sm font-bold uppercase tracking-wider text-blue-400/70">
                            Total Staff
                        </p>
                    </div>
                    <p className="text-5xl font-black text-white">{staff.length}</p>
                </GlassCard>

                <GlassCard variant="dark" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse"></div>
                        <p className="text-sm font-bold uppercase tracking-wider text-emerald-400/70">
                            On Duty
                        </p>
                    </div>
                    <p className="text-5xl font-black text-white">{onDutyStaff.length}</p>
                </GlassCard>

                <GlassCard variant="dark" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50"></div>
                        <p className="text-sm font-bold uppercase tracking-wider text-amber-400/70">
                            Available
                        </p>
                    </div>
                    <p className="text-5xl font-black text-white">{availableStaff.length}</p>
                </GlassCard>

                <GlassCard variant="dark" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                        <p className="text-sm font-bold uppercase tracking-wider text-purple-400/70">
                            Security
                        </p>
                    </div>
                    <p className="text-5xl font-black text-white">{securityOfficers.length}</p>
                </GlassCard>
            </div>

            {/* 2-Column Layout: Staff Roster + AI Suggestions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Staff Roster */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <UserCog className="w-5 h-5 text-amber-400" />
                        Staff Roster
                    </h3>
                    <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-500/50 scrollbar-track-neutral-800/50">
                        {staff.map((member) => (
                            <GlassCard
                                key={member.id}
                                variant="dark"
                                className={`p-5 border-2 transition-all duration-300 hover:scale-[1.02] ${member.available
                                    ? 'border-emerald-500/30 bg-emerald-900/5'
                                    : 'border-white/20 bg-white/5'
                                    }`}
                            >
                                {/* Staff Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-3">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <h4 className="text-base font-bold text-white mb-0.5">{member.name}</h4>
                                            <p className="text-xs text-white/50">{member.role}</p>
                                        </div>
                                    </div>

                                    {/* Availability Badge */}
                                    {member.available && (
                                        <div className="px-2 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-white/40" />
                                        <span className="text-xs text-white/50">Status:</span>
                                        <span
                                            className={`text-xs font-bold px-2 py-0.5 rounded ${member.status === 'on-duty'
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : member.status === 'break'
                                                    ? 'bg-amber-500/20 text-amber-400'
                                                    : 'bg-white/10 text-white/50'
                                                }`}
                                        >
                                            {member.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-white/40" />
                                        <span className="text-xs text-white/50">Location:</span>
                                        <span className="text-xs font-medium text-white/70">{member.location}</span>
                                    </div>
                                </div>

                                {/* Current Assignment */}
                                {member.currentAssignment ? (
                                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                                        <p className="text-xs font-bold text-amber-400 mb-1">Current Assignment</p>
                                        <p className="text-xs text-white/70">{member.currentAssignment}</p>
                                    </div>
                                ) : (
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                        <p className="text-xs text-white/50 text-center">No active assignment</p>
                                    </div>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Right Column: AI Suggestions */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                        </svg>
                        AI Deployment Suggestions
                    </h3>

                    {/* AI Recommendation Card */}
                    <GlassCard variant="dark" className="p-6 border-2 border-amber-500/30 bg-amber-900/5">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1="12" y1="22.08" x2="12" y2="12" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-base font-bold text-amber-400 mb-2">Gemini AI Recommendation</h4>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    Based on predicted surge near Security Checkpoint in 30 minutes, recommend deploying <span className="font-bold text-amber-300">2 additional staff members</span> to open extra lanes.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-xs font-bold text-white/70 mb-2">Suggested Deployment:</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-white/60">• Maria Santos</span>
                                        <span className="text-emerald-400 font-medium">Available</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-white/60">• John Reyes</span>
                                        <span className="text-emerald-400 font-medium">Available</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => onAssignStaff?.(['staff-maria', 'staff-john'], 'Security Checkpoint')}
                                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
                            >
                                Deploy Recommended Staff
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default StaffAllocationModule;
