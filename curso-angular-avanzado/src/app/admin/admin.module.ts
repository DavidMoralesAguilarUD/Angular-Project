// Modulos 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';



// Componentes
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
// Servicios
import { AdminGuard } from '../services/admin.guard';
import { UserService } from '../services/user.service';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
    declarations:[
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        AdminRoutingModule
    ],
    exports: [
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    providers: [AdminGuard, UserService]
})
export class AdminModule {}