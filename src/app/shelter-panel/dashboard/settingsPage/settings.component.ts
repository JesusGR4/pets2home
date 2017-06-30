import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TagsService} from "../../../services/tags.service";
import {Tag} from "../../../models/tag";
import {DirectorsService} from "../../../services/directors.service";
import {Director} from "../../../models/director";
import {ActorsService} from "../../../services/actors.service";
import {Actor} from "../../../models/actor";
import {InterestsService} from "../../../services/interests.service";
import {Interest} from "../../../models/interest";
import {Session} from "../../../models/session";
import {ApiConfigService} from "../../../services/apiConfig.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service";

declare var TableJS:any;
declare var multiSelectJS:any;
declare var $:any;
declare var window:any;


@Component({
    selector: "settings",
    templateUrl: "./settings.component.html",

})
export class Settings {
    public session: Session;


    public tags : Tag[];
    public tag : Tag = new Tag();
    public tagAux : Tag = new Tag();
    public tagMode : string;

    public directors : Director[];
    public director : Director = new Director();
    public directorAux : Director = new Director();
    public directorMode : string;

    public actors : Actor[];
    public actor : Actor = new Actor();
    public actorAux : Actor = new Actor();
    public actorMode : string;

    public interests : Interest[];
    public interest : Interest = new Interest();
    public interestAux : Interest = new Interest();
    public interestMode : string;

    constructor(
        private router: Router,
        private _tagsService: TagsService,
        private _directorsService: DirectorsService,
        private _actorsService: ActorsService,
        private _interestsService: InterestsService,
        private _messagesService: MessagesService
    ) {

    }

    ngOnInit() {
        this.tagMode = 'new';
        this.directorMode = 'new';
        this.actorMode = 'new';
        this.interestMode = 'new';

        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != 100){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getTagList();
            this.getDirectorList();
            this.getActorList();
            this.getInterestList();
        }
    }

    ngAfterViewInit() {
        // TableJS($, window);
        // multiSelectJS($, window);
    }

    // Tags
    getTagList() : void{
        this._tagsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.tags = json.data;
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            })
        ;
    }

    createTagModal(){
        this.tagMode = 'new';
        this.tagAux = new Tag();
        $('#newTag').modal('toggle');
    }
    editTagModal(tag : Tag){
        this.tagMode = 'edit';
        this.tag = tag;

        this.tagAux = new Tag();
        this.tagAux.id = tag.id;
        this.tagAux.name = tag.name;
        $('#newTag').modal('toggle');
    }

    deleteTagModal(tag: Tag){
        this.tagMode = 'delete';
        this.tag = tag;
        $('#deleteTag').modal('toggle');
    }

    saveTag(){
        this._tagsService.createTag(this.tagAux).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#newTag').modal('toggle');
                    this.tags.push(json.data);
                    this._messagesService.showSuccessMessage('La tag se ha creado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }
    updateTag(){
        this._tagsService.updateCinema(this.tagAux).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.tag.id = json.data.id;
                    this.tag.name = json.data.name;
                    $('#newTag').modal('toggle');
                    this._messagesService.showSuccessMessage('La tag se ha actualizado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    deleteTag(tag: Tag){
        this._tagsService.deleteTag(tag).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    var index = this.tags.indexOf(tag);
                    if (index != -1) {
                        this.tags.splice(index, 1);
                    }
                    $('#deleteTag').modal('toggle');
                    this._messagesService.showSuccessMessage('La tag se ha eliminado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    // Directors
    getDirectorList() : void{
        this._directorsService.getList().subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.directors = json.data;
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            })
        ;
    }

    createDirectorModal(){
        this.directorMode = 'new';
        this.directorAux = new Director();
        $('#newDirector').modal('toggle');
    }
    editDirectorModal(director : Director){
        this.directorMode = 'edit';
        this.director = director;

        this.directorAux.id = director.id;
        this.directorAux.name = director.name;
        this.directorAux.surnames = director.surnames;
        $('#newDirector').modal('toggle');
    }

    deleteDirectorModal(director: Director){
        this.directorMode = 'delete';
        this.director = director;
        $('#deleteDirector').modal('toggle');
    }

    saveDirector(){
        this._directorsService.createDirector(this.directorAux).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#newDirector').modal('toggle');
                    this.directors.push(json.data);
                    this._messagesService.showSuccessMessage('El director se ha creado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    updateDirector(){
        this._directorsService.updateDirector(this.directorAux).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.director.id = json.data.id;
                    this.director.name = json.data.name;
                    this.director.surnames = json.data.surnames;

                    $('#newDirector').modal('toggle');
                    this._messagesService.showSuccessMessage('El director se ha actualizado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    deleteDirector(director: Director){
        this._directorsService.deleteDirector(director).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    var index = this.directors.indexOf(director);
                    if (index != -1) {
                        this.directors.splice(index, 1);
                    }
                    $('#deleteDirector').modal('toggle');
                    this._messagesService.showSuccessMessage('El director se ha eliminado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    // Actors
    getActorList() : void{
        this._actorsService.getList().subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.actors = json.data;
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            });
    }

    createActorModal(){
        this.actorMode = 'new';
        this.actorAux = new Actor();
        $('#newActor').modal('toggle');
    }
    editActorModal(actor : Actor){
        this.actorMode = 'edit';
        this.actor = actor;

        this.actorAux.id = actor.id;
        this.actorAux.name = actor.name;
        this.actorAux.surnames = actor.surnames;
        $('#newActor').modal('toggle');
    }

    deleteActorModal(actor: Actor){
        this.actorMode = 'delete';
        this.actor = actor;
        $('#deleteActor').modal('toggle');
    }

    saveActor(){
        this._actorsService.createActor(this.actorAux).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#newActor').modal('toggle');
                    this.actors.push(json.data);
                    this._messagesService.showSuccessMessage('El actor se ha creado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    updateActor(){
        this._actorsService.updateActor(this.actorAux).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.actor.id = json.data.id;
                    this.actor.name = json.data.name;
                    this.actor.surnames = json.data.surnames;
                    $('#newActor').modal('toggle');
                    this._messagesService.showSuccessMessage('El actor se ha actualizado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    deleteActor(actor: Actor){
        this._actorsService.deleteActor(actor).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    var index = this.actors.indexOf(actor);
                    if (index != -1) {
                        this.actors.splice(index, 1);
                    }
                    $('#deleteActor').modal('toggle');
                    this._messagesService.showSuccessMessage('El actor se ha eliminado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    // Interests
    getInterestList() : void{
        this._interestsService.getList().subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.interests = json.data;
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            });
    }

    createInterestModal(){
        this.interestMode = 'new';
        this.interestAux = new Interest();
        $('#newInterest').modal('toggle');
    }
    editInterestModal(interest : Interest){
        this.interestMode = 'edit';
        this.interest = interest;

        this.interestAux = new Interest();
        this.interestAux.id = interest.id;
        this.interestAux.name = interest.name;
        $('#newInterest').modal('toggle');

    }

    deleteInterestModal(interest: Interest){
        this.interestMode = 'delete';
        this.interest = interest;
        $('#deleteInterest').modal('toggle');
    }

    saveInterest(){
        this._interestsService.createInterest(this.interestAux).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#newInterest').modal('toggle');
                    this.interests.push(json.data);
                    this._messagesService.showSuccessMessage('El interés se ha creado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    updateInterest(){
        this._interestsService.updateInterest(this.interestAux).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.interest.id = json.data.id;
                    this.interest.name = json.data.name;
                    $('#newInterest').modal('toggle');
                    this._messagesService.showSuccessMessage('El interés se ha actualizado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    deleteInterest(interest: Interest){
        this._interestsService.deleteInterest(interest).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    var index = this.interests.indexOf(interest);
                    if (index != -1) {
                        this.interests.splice(index, 1);
                    }
                    $('#deleteInterest').modal('toggle');
                    this._messagesService.showSuccessMessage('El interés se ha eliminado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }


    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

}