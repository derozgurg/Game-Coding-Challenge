
export interface BusinessState {
    id?:string;
    name?: string;
    owned?: boolean;
    onSale?: boolean;
    enabledForSale?: boolean;
    level?: number;
    inProgress?: boolean;
    countDown?: number;
    remainingTime?:number;
    income?:number;

    upgradePrice?:number;
    count?:number;

    upgradeOddFraction?:number,
    upgradeOdd?:number,
}

export interface ManagerState {
    business:string;
}

export interface GameState {
    cash?: number;
    time?: number;
    managers?: Array<ManagerState>;
    businesses?: {
        [key: string]: BusinessState
    };
}

export  interface ManagerData {
    name:string;
    description:string;
    hireCost:number;
    business:string;
}

export const GameEvents = {
    WELCOME_PANEL_CLOSE_REQUEST:'welcome_panel_close_request',
    MANAGER_HIRE_REQUEST:'manager_hire_request',
    BUSINESS_INCOME:'business_income',
    STATE_CHANGED: 'state_changed',
    BUSINESS_BUY_REQUEST: 'business_buy_request',
    BUSINESS_PROCEED_REQUEST: 'business_proceed_request',
    BUSINESS_UPGRADE_REQUEST: 'business_upgrade_request',
    BUSINESS_STATE_CHANGED: 'business_state_changed'
}