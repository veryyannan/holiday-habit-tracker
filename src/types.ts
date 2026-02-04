export interface HabitConfig {
    childName: string;
    startDate: Date;
    endDate: Date;
    habits: string[];
    reward: string;
    note: string;
    theme: 'black-white' | 'colorful';
}

export interface PresetDetails {
    id: string;
    name: string;
    description: string;
    icon: string;
    habits: string[];
    color: string;
}
