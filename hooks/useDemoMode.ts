import { useState, useEffect, useCallback } from 'react';
import { DemoState, initialDemoState } from '../data/demoData';

// ============================================================================
// DEMO MODE HOOK
// ============================================================================
// Purpose: Control demo sequence for pitch presentation
// Keyboard: Space = next step, R = reset, P = pause
// ============================================================================

export const useDemoMode = () => {
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [demoState, setDemoState] = useState<DemoState>(initialDemoState);

    // Check URL parameter on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const demoParam = params.get('demo');
        if (demoParam === 'true') {
            setIsDemoMode(true);
        }
    }, []);

    // Keyboard controls
    useEffect(() => {
        if (!isDemoMode) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case ' ': // Space = next step
                    e.preventDefault();
                    nextStep();
                    break;
                case 'r':
                case 'R': // R = reset
                    e.preventDefault();
                    resetDemo();
                    break;
                case 'p':
                case 'P': // P = pause/resume
                    e.preventDefault();
                    togglePause();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDemoMode, demoState]);

    const nextStep = useCallback(() => {
        setDemoState(prev => ({
            ...prev,
            currentStep: Math.min(prev.currentStep + 1, 10),
            isPlaying: true
        }));
    }, []);

    const resetDemo = useCallback(() => {
        setDemoState(initialDemoState);
    }, []);

    const togglePause = useCallback(() => {
        setDemoState(prev => ({
            ...prev,
            isPaused: !prev.isPaused
        }));
    }, []);

    const triggerAlert = useCallback(() => {
        setDemoState(prev => ({
            ...prev,
            alertTriggered: true
        }));
    }, []);

    const showRecommendation = useCallback(() => {
        setDemoState(prev => ({
            ...prev,
            recommendationShown: true
        }));
    }, []);

    const deployStaff = useCallback(() => {
        setDemoState(prev => ({
            ...prev,
            staffDeployed: true
        }));
    }, []);

    const goToStep = useCallback((step: number) => {
        setDemoState(prev => ({
            ...prev,
            currentStep: step
        }));
    }, []);

    return {
        isDemoMode,
        demoState,
        nextStep,
        resetDemo,
        togglePause,
        triggerAlert,
        showRecommendation,
        deployStaff,
        goToStep,
        setIsDemoMode
    };
};
