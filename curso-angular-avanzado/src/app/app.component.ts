import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit,DoCheck {
  public title: string = 'NGZOO';
  public identity: any;
  public url: string;
  public token: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
    this.token = '';
    this.identity = '';
    this.title = 'NGZOO';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();

  }
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }



}
