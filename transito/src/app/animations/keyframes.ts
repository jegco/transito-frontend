import { style } from '@angular/animations';


const bounce = [
    style({ transform: 'scale(1,1) translateY(0)' }),
    style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
    style({ transform: 'scale(0.9, 1.1) translateY(-100px)' }),
    style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
    style({ transform: 'scale(1,1) translateY(-7px)' }),
    style({ transform: 'scale(1,1) translateY(0)' })
];

const swing = [
    style({ transform: 'rotate3d(0,0,1, 15deg)', offset: 0.2 }),
    style({ transform: 'rotate3d(0,0,1, -10deg)', offset: 0.4 }),
    style({ transform: 'rotate3d(0,0,1, 5deg)', offset: 0.6 }),
    style({ transform: 'rotate3d(0,0,1, -5deg)', offset: 0.8 }),
];

export const keyframes = {bounce, swing};