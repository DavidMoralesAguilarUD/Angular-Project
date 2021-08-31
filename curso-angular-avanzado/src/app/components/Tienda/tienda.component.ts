import { Component } from "@angular/core";
import { trigger, state, style, transition, animate, animation } from "@angular/animations";

@Component({
    selector: 'tienda',
    templateUrl: './tienda.component.html',
    styleUrls: ['./tienda.component.css'],
    animations: [
        trigger('marcar', [
            state('Inactive', style({
                border: '5px solid #ccc'
            })),
            state('Active', style({
                border: '5px solid',
                background: 'red',
                borderRadius: '50px',
                transform: 'scale(1.2)'
            })),
            transition('Inactive => Active', animate('300ms linear')),
            transition('Active => Inactive', animate('300ms linear')),
        ])
    ]
})

export class TiendaComponent {
    public titulo;
    public status;
    public flag;

    constructor() {
        this.titulo = 'Esta es la tienda';
        this.status = 'Inactive';
        this.flag = false;
    }

    cambiarEstado(status:string) {
        if (status == 'Inactive') {
            console.log('Inactivado')
            
            this.status = 'Active';
        } else {
            console.log('Activado')

            this.status = 'Inactive';
        }
    }
}