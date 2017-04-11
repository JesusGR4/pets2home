import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import {User} from '../../../models/user';
import {UsersService} from "../../../services/users.service";
import {CodesService} from "../../../services/codes.service";
import {ProfilesService} from "../../../services/profiles.service";
import {MessagesService} from "../../../services/messages.service";
import {ApiConfigService} from "../../../services/apiConfig.service";
import {Session} from "../../../models/session";
import {SessionsService} from "../../../services/sessions.service";
import {CompassuiteService} from "../../../services/compassuite.service";
//import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

//const URL = ApiConfigService.HOST + "admin/users/updateProfileImage";

declare var Dropzone: any;


@Component({
    selector: "profileManagement",
    templateUrl: "./profileManagement.component.html",
    //directives: [FILE_UPLOAD_DIRECTIVES]
})
export class ProfileManagement{
    public user: Session = new Session();
    public password: {oldpassword?:string, newpassword?:string, newpassword_confirmation?:string} = {};
    public cs: {email?: string, password?: string} = {};
    public profile = "";
    //public image: FileUploader = new FileUploader({url:URL});
    public sendUpdateProfile: boolean = false;
    public sendChangePassword: boolean = false;
    public sendCS: boolean = false;
    public sendUpdateProfileImage: boolean = false;
    constructor(
            private router: Router,
            private _messagesService: MessagesService,
            private _usersService: UsersService,
            private _sessionsService: SessionsService,
            private _compassuiteService: CompassuiteService
    ){
    }

    ngOnInit(){
        this.user = ApiConfigService.getSessionByLocalStorage();
        if(this.user.name == null || this.user.profile == 1){
            this.router.navigate(['/admin-panel/loginPage']);
        }else{
            this.updateProfileText(this.user.profile);
        }
    }

    // Al cambiar este m�todo, cambiar tambi�n en myProfile.component-> getDetails
    getDetails(){
        this._usersService.getProfile().subscribe(
                res => {
                    let json = res.json();
                    let code = json.code;
                    let user = json.data.user;
                    if(code == CodesService.OK_CODE) {
                        this.user.email = user.email;
                        this.user.name = user.name;
                        this.user.surnames = user.surnames;
                        this.user.username = user.username;
                        this.user.admin = user.admin;
                        this.user.profile = user.profile_id;
                        this.updateProfileText(this.user.profile);
                    }else{
                        this.handlerError(code);
                    }
                },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                }
            }
        )
    }

    onChangePassword(form){
        this.sendChangePassword = true;
        if(form.valid){
            this._usersService.changePassword(this.password).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    if(code == CodesService.OK_CODE) {
                        alert('OK!');
                    }else{
                        this.handlerError(code);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }
    onChangeCS(form){
        this.sendCS = true;
        if(form.valid){
            this._compassuiteService.generateToken(this.cs.email, this.cs.password).subscribe(
                res => {
                    let json = res.json();
                    let code = json.code;
                    if(code == CodesService.OK_CODE) {
                        alert('La operación se ejecutado correctamente');
                    }else{
                        this.handlerError(code);
                    }
                },
                error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    onUpdateProfile(form){
        this.sendUpdateProfile = true;
        if(form.valid){
            this._usersService.updateProfile(this.user).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    if(code == CodesService.OK_CODE) {
                        alert('OK!');
                        this._sessionsService.updateUser(this.user);
                    }else{
                        this.handlerError(code);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    onFileUpload(input){
        if(input.value != ""){
            this._usersService.changeProfileImage(input.value).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    if(code == CodesService.OK_CODE) {
                        Dropzone.forElement(".dropzone").removeAllFiles(true);
                        alert('OK!');
                        this.user.profile_img_url = json.data;
                        ApiConfigService.setSessionUserProfileImg(json.data);
                    }else{
                        this.handlerError(code);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    /*onUpdateProfileImage(form){
        this.sendUpdateProfileImage = true;
        if(form.valid){
            this._usersService.updateProfileImage(this.image).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    if(code == CodesService.OK_CODE) {
                        alert('OK!');
                    }else{
                        this.handlerError(code);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }*/

    private handlerError(code){
        let message = "";
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }else if(code == CodesService.SERVER_ERROR_CODE){
            message = MessagesService.SERVER_ERROR_CODE_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }
    private updateProfileText(profile){
        switch(profile) {
            case ProfilesService.CUSTOMER_PROFILE_ID:
                this.profile= MessagesService.CUSTOMER_PROFILE_TEXT;
                break;
            case ProfilesService.PROVIDER_PROFILE_ID:
                this.profile = MessagesService.PROVIDER_PROFILE_TEXT;
                break;
            case ProfilesService.CINEMAS_ADMIN_PROFILE_ID:
                this.profile = MessagesService.CINEMA_ADMIN_PROFILE_TEXT;
                break;
            case ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID:
                this.profile = MessagesService.CINEMA_PROGRAMMER_PROFILE_TEXT;
                break;
            case ProfilesService.ADMIN_PROFILE_ID:
                this.profile = MessagesService.ADMIN_PROFILE_TEXT;
                break;
        }
    }

}