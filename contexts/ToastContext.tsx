
import * as React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, message: string) => {
        const id = Math.random().toString(36).substring(7);
        setToasts(prev => [...prev, { id, type, message }]);

        // Auto dismiss
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);

        console.log(`[Toast system]: ${type} - ${message}`);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Simple Toast Container Render */}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                    pointer-events-auto min-w-[300px] p-4 rounded-lg shadow-xl text-white font-medium text-sm animate-in slide-in-from-right-full duration-300
                    ${toast.type === 'success' ? 'bg-emerald-600' : ''}
                    ${toast.type === 'error' ? 'bg-red-600' : ''}
                    ${toast.type === 'warning' ? 'bg-orange-500' : ''}
                    ${toast.type === 'info' ? 'bg-blue-600' : ''}
                `}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
