
import React from 'react';

interface Props {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    isDangerous?: boolean;
    confirmText?: string;
    variant?: 'dark' | 'light';
}

const ConfirmationModal: React.FC<Props> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    isDangerous = false,
    confirmText = 'Confirm',
    variant = 'dark'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl scale-100 ${variant === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white text-zinc-900'}`}>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className={`text-sm mb-6 ${variant === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{message}</p>
                <div className="flex justify-end gap-3">
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${isDangerous ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20'}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
