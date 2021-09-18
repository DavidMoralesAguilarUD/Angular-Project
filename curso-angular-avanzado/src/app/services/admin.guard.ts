// Permite utilizarlo para la configuración de rutas
import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";


@Injectable()
export class AdminGuard implements CanActivate{
    constructor(
        private _router: Router,
        private _userService: UserService
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let identity = this._userService.getIdentity();
        //convirtiendo el Objeto JSON indentity a String 
        let result = JSON.stringify(identity, ['role'])
        //Convierte el string result en objeto JSON
        let result1 = JSON.parse(result);
        if(result1 && result1['role']== 'ROLE_ADMIN'){
            return true;
        } else {
            this._router.navigate(['/home']);
            return false;
        }
    }

}