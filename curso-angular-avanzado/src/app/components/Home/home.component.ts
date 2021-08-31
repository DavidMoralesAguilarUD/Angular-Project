import { Component, OnInit } from "@angular/core";
import { fundido } from "../animation";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    animations: [fundido]
})

export class HomeComponent implements OnInit {
    title = 'Bienvenido a NGZOO';

    ngOnInit(){
        console.log('home.component cargado !! ')
    }
}