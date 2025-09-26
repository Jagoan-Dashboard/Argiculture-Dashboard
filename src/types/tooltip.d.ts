export interface TooltipData {
    active: boolean;
    payload: TooltipPayload[];
    label: string;
}

export interface TooltipPayload {
    name: string;
    value: number;
}