import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
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

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, message: string, duration = 3000) => {
        const id = Date.now().toString();
        const newToast: Toast = { id, type, message, duration };

        setToasts(prev => [...prev, newToast]);

        // Auto-dismiss
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const getToastStyles = (type: ToastType) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-500',
                    icon: <CheckCircle size={20} className="text-white" />,
                    border: 'border-green-600'
                };
            case 'error':
                return {
                    bg: 'bg-red-500',
                    icon: <XCircle size={20} className="text-white" />,
                    border: 'border-red-600'
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-500',
                    icon: <AlertTriangle size={20} className="text-white" />,
                    border: 'border-yellow-600'
                };
            case 'info':
                return {
                    bg: 'bg-blue-500',
                    icon: <Info size={20} className="text-white" />,
                    border: 'border-blue-600'
                };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[10000] space-y-2 pointer-events-none">
                {toasts.map((toast, index) => {
                    const styles = getToastStyles(toast.type);
                    return (
                        <div
                            key={toast.id}
                            className={`${styles.bg} ${styles.border} border-2 rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3 min-w-[300px] max-w-[400px] pointer-events-auto animate-in slide-in-from-right duration-300`}
                            style={{
                                animationDelay: `${index * 50}ms`
                            }}
                        >
                            {/* Icon */}
                            <div className="shrink-0">
                                {styles.icon}
                            </div>

                            {/* Message */}
                            <p className="text-white text-sm font-medium flex-1">
                                {toast.message}
                            </p>

                            {/* Close Button */}
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
                                aria-label="Close notification"
                            >
                                <X size={16} className="text-white" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
};
