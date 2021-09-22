import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';
@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [AnimalService]
})
export class ListComponent implements OnInit {
  public title: string;
  public animals: Animal[] = [];
  public status: string;
  constructor(
    private _animalService: AnimalService,

  ) {
    this.title = 'Listado de animales';
    this.status = '';
  }

  ngOnInit() {
    this._animalService.getAnimals().subscribe(
      response => {
        const vacio = Object.keys(response.animals).length === 0;
        if (!response) {
          this.status = 'error2';
        }
        else if (vacio == true) {
          this.status = 'error';
        } else {
          this.animals = response.animals;
        }
      },
      error => {
        this.status = 'error2';
        
        console.log(<any>error);


      }
    )
  }

}
