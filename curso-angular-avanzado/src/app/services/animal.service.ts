import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { GLOBAL } from './global';

@Injectable()
export class AnimalService {
    public url: string;
    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addAnimal(token:any, animal:any): Observable<any>{
               
        // Convierte de un objeto JS a uno JSON.
        let params = JSON.stringify(animal);
        let headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':token}) };

        return this._http.post(this.url+'registerAnimal', params, headers);

    }

    getAnimals(): Observable<any>{
        
        
        
        return this._http.get(this.url+'list_animals');
    }
}   
