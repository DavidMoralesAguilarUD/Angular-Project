import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AnimalsComponent } from './components/Animals/animals.component';
import { ContactComponent } from './components/Contact/contact.component';
import { HomeComponent } from './components/Home/home.component';
import { KeepersComponent } from './components/Keepers/keepers.component';
import { TiendaComponent } from './components/Tienda/tienda.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'animales', component: AnimalsComponent},
  {path: 'cuidadores', component: KeepersComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'animal/:id', component: AnimalDetailComponent},
  {path: 'mis-datos', component: UserEditComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
