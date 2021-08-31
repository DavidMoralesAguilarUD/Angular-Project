import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'mostrar-email',
  template: `
        <a class="visible">
        <h4>{{title}}</h4>
        <span *ngIf="emailContacto">
            <strong>Email de contacto: </strong> {{emailContacto}}
            <button (click)="borrarEmail()">Eliminar email de contacto</button>
        </span>
        </a>
  `
})
export class MostrarEmailComponent implements DoCheck, OnInit{
    title = 'Mostrar Email';
    emailContacto: string;
   
    constructor(){
        this.emailContacto = '';
        }

    ngOnInit(){
        this.emailContacto = (localStorage.getItem('emailContacto')||'') ;
    }

    ngDoCheck(){
        this.emailContacto = (localStorage.getItem('emailContacto')|| '') ;
    }
    borrarEmail(){
        localStorage.removeItem('emailContacto'|| '');
        localStorage.clear();
        this.emailContacto = '';
        }
}