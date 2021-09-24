import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from './global';
import { User } from "../models/user";

@Injectable()
export class UserService {
    public url: string;
    identity: string | null | undefined;
    token: string | null | undefined;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }
    register(user: User | undefined) {
        let params = JSON.stringify(user);
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        //console.log(_options.get('Content-Type'));
        return this._http.post(this.url + 'register', params, options);
    }

    signup(user_to_login: User, gettoken = ''): Observable<any> {
        if (gettoken != null) {
            user_to_login.getToken = gettoken;
        }



        let params = JSON.stringify(user_to_login);
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        //console.log(_options.get('Content-Type'));
        const animal = this._http.post(this.url+'login', params, options);
        console.log(animal);
        

        
        return this._http.post(this.url+'login', params, options);

    }
    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity') || '{}');
        if (identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;

    }
    getToken() {
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    updateUser(user_to_update: User): Observable<any>  {
        let params = JSON.stringify(user_to_update);
        let headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.getToken() || '{}' }) };
        return this._http.put(this.url+'update-user/'+user_to_update._id, params, headers)
    }

    getKeepers(): Observable<any>{
        
        return this._http.get(this.url+'keepers');
    }

}




