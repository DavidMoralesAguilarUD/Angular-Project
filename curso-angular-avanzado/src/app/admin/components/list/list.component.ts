import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [AnimalService, UserService]
})
export class ListComponent implements OnInit {
  public title: string;
  public animals: Animal[] = [];
  public status: string;
  public token: any;
  constructor(
    private _animalService: AnimalService,
    private _userService: UserService

  ) {
    this.title = 'Listado de animales';
    this.status = '';
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getAnimals();
   
  }
  getAnimals(){
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

  deleteAnimal(id: any){
    this._animalService.deleteAnimal(this.token,id).subscribe(
      response => {
        if(!response.animal){
          alert('error en el servidor');
        }
        this.animals = response.animals;
      },
      error =>{
        alert('Error en el servidor');
      }
    );

  }

}
