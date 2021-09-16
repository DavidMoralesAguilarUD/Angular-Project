import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { GLOBAL } from '../../services/global';
import { UserService } from "src/app/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
    selector: 'register',
    templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
    public title: String;
    public user:User;
    public status:string;
    public error:string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService

    ){
        this.title = 'Registro';
        this.user = new User('','','','','', 'ROLE_USER','');
        this.status = '';
        this.error = '';
    }
    ngOnInit(){
    }

  onSubmit(registerForm: { reset: () => void; }) {
    this._userService.register(this.user).subscribe(
      response => {

        this.status = "success";
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
        registerForm.reset();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Error producido al lado del cliente");
          this.status = "error";
        } else {
          this.error = err.error;
          console.log(err.error);
          this.status = "error";
        }
      });

  }

}
