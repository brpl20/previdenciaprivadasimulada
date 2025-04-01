// src/hooks/types.ts
export enum NavColor {
    dark = 0,
    light
}

export interface PositionColorRelation extends Record<number, NavColor> {
    [key: number]: NavColor;
}  
