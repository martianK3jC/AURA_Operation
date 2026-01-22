// ============================================================================
// DEMO DATA - Controlled, Predictable Data for Pitch Presentation
// ============================================================================
// Purpose: Fixed data for flawless demo (not random like mockData.ts)
// Usage: Activated when ?demo=true URL parameter is present
// ============================================================================

export interface Flight {
    id: string;
    type: 'arrival' | 'departure';
    scheduledTime: string;
    gate: string;
    passengerCount: number;
    origin: string;
    destination: string;
    status: 'on-time' | 'delayed' | 'boarding' | 'landed';
}

export interface StaffMember {
    id: string;
    name: string;
    role: 'Security Officer' | 'Customer Service' | 'Maintenance' | 'Medical';
    status: 'on-duty' | 'break' | 'off-duty';
    currentAssignment: string | null;
    location: string;
    available: boolean;
    photo?: string;
}

export interface ZoneData {
    id: string;
    name: string;
    currentOccupancy: number;
    maxCapacity: number;
    capacityPercent: number;
    trend: string;
    status: 'normal' | 'warning' | 'critical';
}

export interface DemoAlert {
    id: number;
    type: 'critical' | 'warning' | 'info';
    category: 'predicted_surge' | 'overcrowding' | 'understaffing' | 'incident';
    location: string;
    message: string;
    timeframe: string;
    confidence: number;
    status: 'active' | 'resolved';
    createdAt: Date;
    linkedRecommendationId?: number;
}

export interface DemoRecommendation {
    id: number;
    alertId: number;
    title: string;
    description: string;
    suggestedStaff: string[];
    actions: Array<{ label: string; type: 'primary' | 'secondary' }>;
    confidence: number;
    status: 'pending' | 'accepted' | 'dismissed';
    createdAt: Date;
}

// ============================================================================
// DEMO DATA - SECURITY ZONE 2 SURGE SCENARIO
// ============================================================================

export const demoFlights: Flight[] = [
    {
        id: 'CX882',
        type: 'arrival',
        scheduledTime: '14:30',
        gate: 'A12',
        passengerCount: 200,
        origin: 'Hong Kong',
        destination: 'Cebu',
        status: 'on-time'
    },
    {
        id: 'PR123',
        type: 'arrival',
        scheduledTime: '14:35',
        gate: 'B05',
        passengerCount: 180,
        origin: 'Manila',
        destination: 'Cebu',
        status: 'on-time'
    },
    {
        id: '5J456',
        type: 'arrival',
        scheduledTime: '14:40',
        gate: 'A08',
        passengerCount: 150,
        origin: 'Davao',
        destination: 'Cebu',
        status: 'on-time'
    },
    {
        id: 'Z2789',
        type: 'arrival',
        scheduledTime: '14:45',
        gate: 'B12',
        passengerCount: 120,
        origin: 'Clark',
        destination: 'Cebu',
        status: 'on-time'
    }
];

export const demoStaff: StaffMember[] = [
    {
        id: 'S001',
        name: 'Maria Santos',
        role: 'Security Officer',
        status: 'on-duty',
        currentAssignment: null,
        location: 'Zone 1 - Check-in',
        available: true
    },
    {
        id: 'S002',
        name: 'John Reyes',
        role: 'Security Officer',
        status: 'on-duty',
        currentAssignment: null,
        location: 'Zone 3 - Gates',
        available: true
    },
    {
        id: 'S003',
        name: 'Carlos Tan',
        role: 'Security Officer',
        status: 'break',
        currentAssignment: null,
        location: 'Break Room',
        available: true
    },
    {
        id: 'S004',
        name: 'Anna Lee',
        role: 'Customer Service',
        status: 'on-duty',
        currentAssignment: 'Check-in Row A',
        location: 'Zone 1 - Check-in',
        available: false
    },
    {
        id: 'S005',
        name: 'Mark Diaz',
        role: 'Customer Service',
        status: 'on-duty',
        currentAssignment: null,
        location: 'Zone 1 - Check-in',
        available: true
    }
];

export const demoZones: ZoneData[] = [
    {
        id: 'security-zone-2',
        name: 'Security Zone 2',
        currentOccupancy: 280,
        maxCapacity: 300,
        capacityPercent: 93,
        trend: '+24%',
        status: 'critical'
    },
    {
        id: 'check-in-a',
        name: 'Check-in Row A',
        currentOccupancy: 120,
        maxCapacity: 200,
        capacityPercent: 60,
        trend: '+5%',
        status: 'normal'
    },
    {
        id: 'check-in-b',
        name: 'Check-in Row B',
        currentOccupancy: 95,
        maxCapacity: 200,
        capacityPercent: 47,
        trend: '-2%',
        status: 'normal'
    },
    {
        id: 'gates-area',
        name: 'Gates Area',
        currentOccupancy: 450,
        maxCapacity: 800,
        capacityPercent: 56,
        trend: '+3%',
        status: 'normal'
    },
    {
        id: 'baggage-claim',
        name: 'Baggage Claim',
        currentOccupancy: 80,
        maxCapacity: 250,
        capacityPercent: 32,
        trend: '-2%',
        status: 'normal'
    }
];

export const demoAlert: DemoAlert = {
    id: 1,
    type: 'warning',
    category: 'predicted_surge',
    location: 'Security Zone 2',
    message: 'Predicted surge at Security Zone 2 in 30 minutes',
    timeframe: 'in 30 minutes',
    confidence: 85,
    status: 'active',
    createdAt: new Date(),
    linkedRecommendationId: 1
};

export const demoRecommendation: DemoRecommendation = {
    id: 1,
    alertId: 1,
    title: 'Deploy Additional Staff to Security Zone 2',
    description: 'Deploy 3 additional officers to Security Zone 2 and open 2 more security lanes to handle predicted surge of 650 passengers from incoming flights CX882, PR123, 5J456, and Z2789.',
    suggestedStaff: ['S001', 'S002', 'S003'], // Maria Santos, John Reyes, Carlos Tan
    actions: [
        { label: 'Accept', type: 'primary' },
        { label: 'Dismiss', type: 'secondary' }
    ],
    confidence: 85,
    status: 'pending',
    createdAt: new Date()
};

// ============================================================================
// DEMO MODE STATE
// ============================================================================

export interface DemoState {
    currentStep: number;
    isPlaying: boolean;
    isPaused: boolean;
    alertTriggered: boolean;
    recommendationShown: boolean;
    staffDeployed: boolean;
}

export const initialDemoState: DemoState = {
    currentStep: 0,
    isPlaying: false,
    isPaused: false,
    alertTriggered: false,
    recommendationShown: false,
    staffDeployed: false
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getTotalPredictedPassengers = (): number => {
    return demoFlights.reduce((sum, flight) => sum + flight.passengerCount, 0);
};

export const getAvailableStaff = (): StaffMember[] => {
    return demoStaff.filter(staff => staff.available);
};

export const getSecurityOfficers = (): StaffMember[] => {
    return demoStaff.filter(staff => staff.role === 'Security Officer');
};

export const getAvailableSecurityOfficers = (): StaffMember[] => {
    return demoStaff.filter(staff => staff.role === 'Security Officer' && staff.available);
};
