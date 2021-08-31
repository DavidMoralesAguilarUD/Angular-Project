import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'parques',
    templateUrl: './parques.component.html'
})

export class ParquesComponent implements OnInit {
    title = 'Parques';

    ngOnInit(){
        console.log('parques.component cargado !! ')
    }
}