import React from 'react';
import { createPortal } from 'react-dom';
import GlassCard from './GlassCard';

interface Props {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    isDangerous?: boolean;
    variant?: 'light' | 'dark';
}

const ConfirmationModal: React.FC<Props> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDangerous = false,
    variant = 'light'
}) => {
    if (!isOpen) return null;

    const isDark = variant === 'dark';

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <GlassCard className={`w-full max-w-md p-6 rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 backdrop-blur-xl ${isDark
                ? 'bg-neutral-900/95 border border-white/10'
                : 'bg-white/90 border border-white/40'
                }`}>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>{title}</h3>
                <p className={`mb-6 text-sm md:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>{message}</p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark
                            ? 'text-slate-400 hover:text-white hover:bg-white/10'
                            : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                            }`}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-lg text-white text-sm font-bold shadow-lg transition-transform active:scale-95 ${isDangerous ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20' : 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20'}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </GlassCard>
        </div>,
        document.body
    );
};

export default ConfirmationModal;
