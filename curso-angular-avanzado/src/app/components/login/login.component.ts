import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { Observable } from "rxjs";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title: String;
    public user: User;
    public identity: any;
    public token: string;
    public status: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService

    ) {
        this.title = 'Login';
        this.token = '';
        this.identity = '';
        this.status = 'fail'
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');

    }
    ngOnInit() {
        console.log('login.component cargado!!');
        console.log(this._userService.getIdentity());
        console.log(this._userService.getToken());


    }


    onSubmit() {
        // Loguear el usuario y conseguir el objeto
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;


                if (!this.identity || !this.identity._id) {
                    alert('El usuario no se ha logueado correctamente');
                } else {
                    this.identity.password = '';
                    //Guardar datos al local storage como números o strings
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    //Mostrar identity
                    console.log(this.identity);
                    this._userService.signup(this.user, 'true').subscribe(
                        response => {
                            this.token = response.token;
                            if (this.token.length <= 0) {
                                alert('El token no se ha generado');
                            } else {
                                // Msotrar token
                                localStorage.setItem('token', this.token);
                                this.status = 'success';
                                this._router.navigate(['/']);

                            }
                        },
                        error => {
                            console.log(<any>error);

                        }
                    );

                }
            }, error => {
                var errorMessage = <any>error;
                if(errorMessage != null){
                    var body = JSON.stringify(error._body);
                    this.status = 'error';

                }

            }
        );
    }
}
