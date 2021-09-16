import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { GLOBAL } from '../../services/global';
import { UserService } from "src/app/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [UserService]

})

export class UserEditComponent implements OnInit{
    public title: string;
    public user: User;
    public identity: any;
    public token: any;
    public status:string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService

    ) {
        this.title = 'Actualizar mis datos';
        console.log(this.title);
        this.identity =(this._userService.getIdentity());
        console.log(this.identity);
        this.token = this._userService.getToken();
        console.log(this.token);
        this.user = this.identity;
        this.status = '';


    }
    ngOnInit(){
        console.log('user-edit.component.ts caragado !!')
    }
    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
            response => {
                if(!response.user){
                    this.status = 'success';
                }else{
                    localStorage.setItem('identity', JSON.stringify(this.user));
                }
      
            },
            (err: HttpErrorResponse) => {
                var errorMessage = <any>err;
                if(errorMessage != null){
                    this.status = 'error';
                }
              
            }
        );

    }
}
