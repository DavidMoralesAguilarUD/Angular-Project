import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { GLOBAL } from 'src/app/services/global';

@Component({
    selector: 'keepers',
    templateUrl: './keepers.component.html',
    providers: [UserService]
})

export class KeepersComponent implements OnInit {
    public title:string;
    public url: string;

    public keepers: User[] | undefined;     
     constructor(
         private _userService: UserService
     ){
         this.title = 'Cuidadores';
         this.url = GLOBAL.url;

     }

    ngOnInit(){
        console.log('keepers.component cargado !! ')
        this.getKeepers();
        
    }

    getKeepers(){
        this._userService.getKeepers().subscribe(
          response => {
            const vacio = Object.keys(response.users).length === 0;
            if (!response) {
            }
            else if (vacio == true) {
            } else {
                
                this.keepers= response.users;
                console.log(this.keepers);

            }
          },
          error => {
            console.log(<any>error);
          }
        )
        
      }
}