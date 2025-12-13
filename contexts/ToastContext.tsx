import * as React from 'react';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: number;
    type: ToastType;
    message: string;
    progress: number;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

const ToastItem: React.FC<{ toast: Toast; onRemove: () => void; duration: number }> = ({ toast, onRemove, duration }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev - (100 / (duration / 50));
                if (newProgress <= 0) {
                    clearInterval(interval);
                    onRemove();
                    return 0;
                }
                return newProgress;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [duration, onRemove]);

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                );
            case 'error':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                );
            case 'info':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                    </svg>
                );
        }
    };

    const getStyles = () => {
        switch (toast.type) {
            case 'success':
                return {
                    bg: 'bg-gradient-to-r from-emerald-600 to-green-600',
                    border: 'border-emerald-400/50',
                    shadow: 'shadow-2xl shadow-emerald-900/30',
                    glow: 'bg-emerald-500',
                    progressBg: 'bg-emerald-400'
                };
            case 'error':
                return {
                    bg: 'bg-gradient-to-r from-red-600 to-rose-600',
                    border: 'border-red-400/50',
                    shadow: 'shadow-2xl shadow-red-900/30',
                    glow: 'bg-red-500',
                    progressBg: 'bg-red-400'
                };
            case 'warning':
                return {
                    bg: 'bg-gradient-to-r from-amber-600 to-yellow-600',
                    border: 'border-amber-400/50',
                    shadow: 'shadow-2xl shadow-amber-900/30',
                    glow: 'bg-amber-500',
                    progressBg: 'bg-amber-400'
                };
            case 'info':
                return {
                    bg: 'bg-gradient-to-r from-blue-600 to-cyan-600',
                    border: 'border-blue-400/50',
                    shadow: 'shadow-2xl shadow-blue-900/30',
                    glow: 'bg-blue-500',
                    progressBg: 'bg-blue-400'
                };
        }
    };

    const styles = getStyles();

    return (
        <div className="relative pointer-events-auto animate-in slide-in-from-right-5 fade-in zoom-in-95 duration-300">
            {/* Glow effect */}
            <div className={`absolute -inset-1 ${styles.glow} opacity-20 blur-xl rounded-xl`}></div>

            <div className={`relative ${styles.bg} ${styles.border} ${styles.shadow} border-2 rounded-xl p-4 min-w-[320px] max-w-md backdrop-blur-xl overflow-hidden`}>
                <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                        {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white leading-relaxed break-words">
                            {toast.message}
                        </p>
                    </div>
                    <button
                        onClick={onRemove}
                        className="shrink-0 text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                    <div
                        className={`h-full ${styles.progressBg} transition-all duration-50 ease-linear`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<{ toast: Toast; duration: number }[]>([]);

    // Use useCallback to stabilize reference and prevent ToastItem re-renders
    const removeToast = React.useCallback((id: number) => {
        setToasts(prev => prev.filter(item => item.toast.id !== id));
    }, []);

    const showToast = React.useCallback((type: ToastType, message: string, duration: number = 4000) => {
        // Use timestamp + random for unique ID to avoid collisions during rapid updates
        const id = Date.now() + Math.random();
        const newToast = { id, type, message, progress: 100 };
        setToasts(prev => [...prev, { toast: newToast, duration }]);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none max-w-md">
                {toasts.map(({ toast, duration }) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        duration={duration}
                        onRemove={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastContext;
