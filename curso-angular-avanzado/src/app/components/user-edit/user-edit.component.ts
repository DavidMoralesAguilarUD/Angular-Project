import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { GLOBAL } from '../../services/global';
import { UserService } from "src/app/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { UploadService } from "src/app/services/upload.service";


@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [UserService, UploadService]

})

export class UserEditComponent implements OnInit{
    public title: string;
    public user: User;
    public identity: any;
    public token: any;
    public status:string;
    public filesToUpload: Array<File> = []; 
    public url: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService

    ) {
        this.title = 'Actualizar mis datos';
        this.identity =(this._userService.getIdentity());
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.status = '';
        this.url = GLOBAL.url;
        


    }
    ngOnInit(){
        console.log('user-edit.component.ts caragado !!')
    }
    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
            response => {
                if(!response.user){
                    this.status = 'error';
                }else{
                    this.status = 'success';

                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
                    .then((result: any) => {
                        this.user.image = result.image;
                        localStorage.setItem('identity', JSON.stringify(this.user));

                    });
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
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);


    }
}
