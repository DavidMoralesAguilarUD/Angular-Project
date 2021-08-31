import { Component } from '@angular/core';

@Component({
  selector: 'main-email',
  template: `
      <div class="card">
        <div class="card-body">
          <h1>{{title}}</h1>
          <hr>
          <mostrar-email></mostrar-email>
          <guardar-email></guardar-email>
        </div>
      </div>          
  `
})
export class MainEmailComponent {
    title = 'Modulo de email';

    ngOnInit(){
      console.log("Componente principal del módulo cargado");
    }
}