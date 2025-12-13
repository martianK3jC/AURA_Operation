export type ScreenId =
    | 'landing'
    | 'select-role'
    | 'dashboard'
    | 'map'
    | 'profile'
    | 'operator-dashboard'
    | 'scenario-a'
    | 'scenario-b'
    | 'scenario-c'
    | 'chat'
    | 'traveler-login'
    | 'onboarding'
    | 'arrival-dashboard'
    | 'destination-input'
    | 'transportation-options'
    | 'route-tracking'
    | 'operator-landing';

export interface TimelineStep {
    icon?: 'home' | 'car' | 'bag' | 'shield' | 'passport' | 'door';
    status: 'critical' | 'warning' | 'current' | 'completed' | 'upcoming';
    isCurrent?: boolean;
    title: string;
    time?: string;
    badge?: string;
    badgeColor?: 'red' | 'orange' | 'green';
    subtext?: string;
    description?: string;
}
