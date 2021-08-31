import { Component,DoCheck, OnInit } from "@angular/core";

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {
    title = 'Contacto';
    emailContacto: string;
    
    constructor(){
        this.emailContacto = '';

    }

    ngOnInit(){
        console.log('contact.component cargado !! ')
    }
    guardarEmail(){
        localStorage.setItem('emailContacto',this.emailContacto);
        console.log(localStorage.getItem('emailContacto'));
    
    }

   
}