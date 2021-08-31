import { animate, state, style, transition, trigger } from "@angular/animations";


export const fundido =
trigger('fadeIn', [
        transition(':enter', [
            style({
            opacity: 0
        }),
        animate('2s linear',
        style({
            opacity: 1
        }))
    ])
]);