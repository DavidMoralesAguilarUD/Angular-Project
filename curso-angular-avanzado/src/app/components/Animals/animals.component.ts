import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'animal',
    templateUrl: './animals.component.html'
})

export class AnimalsComponent implements OnInit {
    title = 'Animal';

    ngOnInit(){
        console.log('animals.component cargado !! ')
    }
}