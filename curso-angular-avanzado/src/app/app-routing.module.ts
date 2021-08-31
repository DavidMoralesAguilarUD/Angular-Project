import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AnimalsComponent } from './components/Animals/animals.component';
import { ContactComponent } from './components/Contact/contact.component';
import { HomeComponent } from './components/Home/home.component';
import { KeepersComponent } from './components/Keepers/keepers.component';
import { TiendaComponent } from './components/Tienda/tienda.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'animales', component: AnimalsComponent},
  {path: 'cuidadores', component: KeepersComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'tienda', component: TiendaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
