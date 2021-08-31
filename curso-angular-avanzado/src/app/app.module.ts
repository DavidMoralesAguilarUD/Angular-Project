import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// importar nuetro nuevo módulo
import { ModuloEmailModule } from './moduloemail/moduloemail.module';
import { AdminModule } from './admin/admin.module';

//Componentes
import { AppComponent } from './app.component';
import { AnimalsComponent} from './components/Animals/animals.component';
import { ContactComponent} from './components/Contact/contact.component'; 
import { HomeComponent} from './components/Home/home.component'; 
import { KeepersComponent} from './components/Keepers/keepers.component'; 
import { ParquesComponent} from './components/Parques/parques.component';
import { TiendaComponent} from './components/Tienda/tienda.component'; 
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AnimalsComponent,
    ContactComponent,
    HomeComponent,
    KeepersComponent,
    ParquesComponent,
    TiendaComponent

  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModuloEmailModule,
    AdminModule,
    BrowserAnimationsModule
  ],
  providers: [AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
