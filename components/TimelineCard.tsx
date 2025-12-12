import * as React from 'react';
import { TimelineStep } from '../types';
import GlassCard from './GlassCard';

interface TimelineCardProps {
  step: TimelineStep;
  isLast: boolean;
  delay?: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ step, delay = 0 }) => {
  const getIcon = () => {
    switch (step.icon) {
      case 'home': return '🏠';
      case 'car': return '🚗';
      case 'bag': return '🎒';
      case 'shield': return '🛡️';
      case 'passport': return '🛂';
      case 'door': return '🚪';
      default: return '📍';
    }
  };

  const getVariant = (): 'default' | 'elevated' | 'highlight' | 'success' | 'warning' | 'error' => {
    if (step.status === 'critical') return 'error';
    if (step.status === 'warning') return 'warning';
    if (step.status === 'current') return 'highlight'; // Warm orange-yellow gradient
    if (step.status === 'completed') return 'success';
    return 'default'; // Clean white for upcoming
  };

  const getIconContainerStyles = () => {
    if (step.status === 'critical') return 'bg-white border-2 border-red-500 shadow-sm';
    if (step.status === 'completed' || step.status === 'current') return 'bg-white border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]';
    return 'bg-white border-2 border-stone-300';
  };

  return (
    <div
      className="flex items-start gap-5 pl-12 relative animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Icon Node */}
      <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 ${getIconContainerStyles()}`}>
        {getIcon()}
      </div>

      {/* Content Card */}
      <GlassCard
        className={`flex-1 p-5 rounded-xl relative overflow-hidden transition-all duration-300 min-h-[120px] hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 ${step.isCurrent ? 'scale-[1.02] ring-2 ring-red-500/50 ring-offset-2 ring-offset-neutral-50' : ''
          }`}
        variant={getVariant()}
      >

        {/* "You Are Here" Indicator - Fixed positioning */}
        {step.isCurrent && (
          <div className="absolute bottom-2 right-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] z-30 animate-pulse flex items-center gap-1 border border-red-300">
            <span className="text-xs">📍</span>
            <span className="hidden sm:inline">YOU ARE HERE</span>
            <span className="sm:hidden">HERE</span>
          </div>
        )}

        <div className="flex justify-between items-start relative z-10 gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-sm sm:text-base truncate ${step.status === 'critical' ? 'text-red-900' :
              step.status === 'completed' ? 'text-stone-400' : 'text-[var(--aura-text-primary)]'
              }`}>
              {step.title}
            </h3>
            {step.time && (
              <p className={`text-lg sm:text-xl font-bold mt-1 ${step.status === 'critical' ? 'text-red-600' :
                step.status === 'warning' ? 'text-orange-600' :
                  step.status === 'current' || step.status === 'completed' ? 'text-green-600' :
                    'text-stone-800'
                }`}>
                {step.time}
              </p>
            )}
          </div>
          {step.badge && (
            <span className={`px-2 py-1 rounded text-xs whitespace-nowrap flex-shrink-0 font-medium ${step.badgeColor === 'red' ? 'bg-red-100 text-red-700 animate-pulse' :
              step.badgeColor === 'orange' ? 'bg-orange-100 text-orange-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
              {step.badge}
            </span>
          )}
        </div>

        {(step.subtext || step.description) && (
          <div className="mt-2 flex items-center gap-2 relative z-10">
            {step.status === 'warning' && <span className="w-2 h-2 bg-orange-500 rounded-full" />}
            <p className={`text-xs ${step.status === 'critical' ? 'text-red-300/80' : 'text-slate-500'}`}>
              {step.description || step.subtext}
            </p>
          </div>
        )}

        {/* Subtle background pulse for current step */}
        {step.isCurrent && (
          <div className="absolute inset-0 bg-red-500/5 animate-pulse z-0 pointer-events-none"></div>
        )}
      </GlassCard>
    </div>
  );
};

export default TimelineCard;