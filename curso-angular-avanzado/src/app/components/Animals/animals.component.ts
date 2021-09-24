import { Component, OnInit } from "@angular/core";
import { Animal } from "src/app/models/animal";
import { AnimalService } from "src/app/services/animal.service";
import { fundido } from '../animation';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'animal',
    templateUrl: './animals.component.html',
    providers: [AnimalService],
    animations: [fundido]
})

export class AnimalsComponent implements OnInit {
    public title: string;
    public animals: Animal[] | undefined;
    public url;
    constructor(
        private _animalService: AnimalService
        ){
            this.title = "Animales"
            this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('animals.component cargado !! ');
        this.getAnimals();
    }

    getAnimals(){
        this._animalService.getAnimals().subscribe(
          response => {
            const vacio = Object.keys(response.animals).length === 0;
            if (!response) {
            }
            else if (vacio == true) {
            } else {
                
                this.animals = response.animals;
                console.log(this.animals);

            }
          },
          error => {
            console.log(<any>error);
          }
        );
        
      }
}