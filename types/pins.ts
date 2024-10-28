export type PinType = 'peak' | 'pass' | 'river' | 'lake' | 'shelter' | 'cave';

export type PinDetails = {
    peak: {
        name: string;
        elevation: number;
        description?: string;
    };
    pass: {
        name: string;
        elevation: number;
        description?: string;
    };
    river: {
        name: string;
        length?: number;
        description?: string;
    };
    lake: {
        name: string;
        depth?: number;
        description?: string;
    };
    shelter: {
        name: string;
        capacity: number;
        description?: string;
    };
    cave: {
        name: string;
        depth?: number;
        description?: string;
    };
};

export type Pin = {
    id: string;
    x: number;
    y: number;
    type: PinType;
    user_id: string;
    details: PinDetails[PinType];
};
