import { style } from '@angular/animations';


const bounce = [
    style({ transform: 'scale(1,1) translateY(0)' }),
    style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
    style({ transform: 'scale(0.9, 1.1) translateY(-25%)' }),
    style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
    style({ transform: 'scale(1,1) translateY(-1%)' }),
    style({ transform: 'scale(1,1) translateY(0)' })
];

const swing = [
    style({ transform: 'rotate3d(0,0,1, 15deg)', offset: 0.2 }),
    style({ transform: 'rotate3d(0,0,1, -10deg)', offset: 0.4 }),
    style({ transform: 'rotate3d(0,0,1, 5deg)', offset: 0.6 }),
    style({ transform: 'rotate3d(0,0,1, -5deg)', offset: 0.8 }),
];

const scale = [
    style({ transform: 'scale(1.1)'}),
    style({ transform: 'scale(1.3)'}),
    style({ transform: 'scale(1.5)'}),
    style({ transform: 'scale(1.3)' }),
    style({ transform: 'scale(1.1)'}),
    style({ transform: 'scale(1)' }),
];

const translate = [
    style({ transform: 'translate(0px, 0px)' }),
    style({ transform: 'translate(-10%, -10%)'}),
    style({ transform: 'translate(10%, -10%)'}),
    style({ transform: 'translate(10%, 10%)'}),
    style({ transform: 'translate(-10%, 10%)' }),
    style({ transform: 'translate(0px, 0px)' })
]

export const keyframes = {bounce, swing, scale, translate};