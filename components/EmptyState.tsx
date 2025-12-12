import React from 'react';

interface EmptyStateProps {
    icon?: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon = '📭', title, description, action }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="text-6xl mb-4 opacity-40">{icon}</div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">{title}</h3>
            <p className="text-sm text-neutral-600 mb-6 max-w-sm">{description}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
