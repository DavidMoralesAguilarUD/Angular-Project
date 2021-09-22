import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AnimalService } from '../../services/animal.service';
import { GLOBAL } from 'src/app/services/global';
@Component({
  selector: 'animal-detail',
  templateUrl: './animal-detail.component.html',
  providers: [AnimalService]
})
export class AnimalDetailComponent implements OnInit {
  public title: string;
  public url: string;
  public animal: any;
  public status: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,

  ) {
    this.title = 'Listado de animales';
    this.status = '';
    this.url = GLOBAL.url;
  }
  ngOnInit() {
    this.getAnimal();
  }
  getAnimal(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._animalService.getAnimal(id).subscribe(
        response => {
          if (!response) {
            this._router.navigate(['/home']);
          } else {
           

            this.animal = response.animal;

          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/home']);


        }

      )
    })
  }

}