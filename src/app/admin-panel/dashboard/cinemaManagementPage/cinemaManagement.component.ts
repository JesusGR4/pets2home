import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ApiConfigService} from "../../../services/apiConfig.service";
import {Session} from "../../../models/session";
import {CinemaCompany} from "../../../models/cinemaCompany";
import {CinemaCompaniesService} from "../../../services/cinemaCompanies.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service";
import {CinemasService} from "../../../services/cinemas.service";
import {Cinema} from "../../../models/cinema";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CitiesService} from "../../../services/cities.service";
import {ProvincesService} from "../../../services/provinces.service";
import {FormatsService} from "../../../services/formats.service";
import {City} from "../../../models/city";
import {Province} from "../../../models/province";
import {Format} from "../../../models/format";
import {Room} from "../../../models/room";
import {User} from "../../../models/user";
import {RoomsService} from "../../../services/rooms.service";
import {UsersService} from "../../../services/users.service";

declare var TableJS:any;
declare var $:any;
declare var window:any;
declare var Dropzone: any;


@Component({
    selector: "cinemaManagement",
    templateUrl: "./cinemaManagement.component.html",

})
export class CinemaManagement{
    public session: Session;

    public cinemaCompanies: CinemaCompany[];
    public cinemaCompany: CinemaCompany = new CinemaCompany;
    public cinemaCompanyMode: string = 'new';
    public cinemaCompanySelected: number = 0;
    public cinemaCitySelected: number = 0;

    public sendCinemaCompanyForm: boolean = false;

    public cinemas: Cinema[];
    public cinema: Cinema = new Cinema();
    public cinemaMode: string = 'new';

    public sendCinemaForm: boolean = false;

    public cities: City[];
    public filteredCity: City[];
    public provinces: Province[];
    public formats: Array<any>;

    public rooms: Room[];
    public users: User[];
    public usersNoCinema: User[];

    public province_id: string;
    public city_id: string;


    constructor(
        private router: Router,
        private _cinemaCompaniesService: CinemaCompaniesService,
        private _cinemasService: CinemasService,
        private _messagesService: MessagesService,
        private _citiesService: CitiesService,
        private _provincesService: ProvincesService,
        private _formatsService: FormatsService,
        private _roomsService: RoomsService,
        private _usersService: UsersService
    ){

    }

    filterButton() {
        let filter = [this.cinemaCompanySelected, this.cinemaCitySelected];
        this.getCinemaList(filter);
    }

    ngOnInit() {

            this.getCinemaCompanyList();
            this.getCinemaList(null);
            this.getCityList(null);
            this.getProvinceList();
            this.getFormatList();

    }

    getCinemaCompanyList() : void{
        this._cinemaCompaniesService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.cinemaCompanies = json.data;
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

    getCinemaList(filter) : void{
        this._cinemasService.getList(filter).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.cinemas = json.data;
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
    getCityList(filter) : void{
        this._citiesService.getList(filter, "cinemas").subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.cities = this.transformForSelect2(json.data);
                    this.filteredCity = this.cities;
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
    getProvinceList() : void{
        this._provincesService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.provinces = this.transformForSelect2(json.data);
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
    getFormatList() : void{
        this._formatsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.formats = this.transformForSelect2(json.data);
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

    ngAfterViewInit() {
        TableJS($,window);
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != 100){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }
    }

    createCinemaCompanyModal(){
        this.sendCinemaCompanyForm = false;
        this.cinemaCompanyMode = 'new';
        this.cinemaCompany = new CinemaCompany();
        $('#addCompany').modal('toggle');
    }
    editCinemaCompanyModal(cinemaCompany){
        this.sendCinemaCompanyForm = false;
        this.cinemaCompanyMode = 'edit';
        this.cinemaCompany = cinemaCompany;
        $('#addCompany').modal('toggle');
    }

    deleteCinemaCompanyModal(cinemaCompany: CinemaCompany){
        this.cinemaCompanyMode = 'delete';
        this.cinemaCompany = cinemaCompany;
        $('#deleteCompany').modal('toggle');
    }

    deleteCinemaModal(cinema: Cinema){
        this.cinemaMode = 'delete';
        this.cinema = cinema;
        $('#deleteCinema').modal('toggle');
    }

    saveCinemaCompany(imageCinemaCompany){
        this.sendCinemaCompanyForm = true;
        this._cinemaCompaniesService.createCinemaCompany(this.cinemaCompany, imageCinemaCompany).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#addCompany').modal('toggle');
                    this.cinemaCompanies.push(json.data);
                    this._messagesService.showSuccessMessage('La compañía de cine se ha creado correctamente');
                    Dropzone.forElement(".dropzone").removeAllFiles(true);
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
    updateCinemaCompany(imageCinemaCompany: string){
        this.sendCinemaCompanyForm = true;
        this._cinemaCompaniesService.updateCinemaCompany(this.cinemaCompany, imageCinemaCompany).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#addCompany').modal('toggle');
                    this.cinemaCompanies.push(json.data);
                    this._messagesService.showSuccessMessage('La compañía de cine se ha creado correctamente');
                    Dropzone.forElement(".dropzone").removeAllFiles(true);
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

    deleteCinemaCompany(cinemaCompany: CinemaCompany){
        this._cinemaCompaniesService.deleteCinemaCompany(this.cinemaCompany).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    var index = this.cinemaCompanies.indexOf(cinemaCompany);
                    if (index != -1) {
                        this.cinemaCompanies.splice(index, 1);
                    }
                    this._messagesService.showSuccessMessage('La compañía de cine se ha eliminado correctamente');
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

    deleteCinema(cinema: Cinema){
        this._cinemasService.deleteCinema(this.cinema).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    var index = this.cinemas.indexOf(cinema);
                    if (index != -1) {
                        this.cinemas.splice(index, 1);
                    }
                    this._messagesService.showSuccessMessage('El cine se ha eliminado correctamente');
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

    publishCinema(cinema: Cinema){
        this._cinemasService.publishCinema(cinema).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    cinema.published = 1;
                    this._messagesService.showSuccessMessage('El cine ha sido publicado correctamente');
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

    featureCinema(cinema: Cinema){
        this._cinemasService.featureCinema(cinema).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    cinema.featured = json.data.featured;
                    let responseMessage = "";
                    if(cinema.featured == 1){
                        responseMessage = "El cine ha sido marcado como favorito";
                    }else{
                        responseMessage = "El cine ha sido desmarcado como favorito";
                    }
                    this._messagesService.showSuccessMessage(responseMessage);
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

    unpublishCinema(cinema: Cinema){
        this._cinemasService.unpublishCinema(cinema).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    cinema.published = 0;
                    this._messagesService.showSuccessMessage('El cine ha sido despublicado correctamente');
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

    createCinemaModal(){
        this.sendCinemaForm = false;
        this.cinemaMode = 'new';
        this.cinema = new Cinema();
        $('#addCinema').modal('toggle');
    }
    editCinemaModal(cinema){
        this.sendCinemaForm = false;
        this.cinemaMode = 'edit';
        this.getCinemaDetails(cinema.id);
    }
    getCinemaDetails(cinema_id){
        this._cinemasService.getDetails(cinema_id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.cinema = json.data;
                    this.city_id = this.cinema.city_id.toString();
                    this.province_id = this.cinema.province_id.toString();
                    $('#addCinema').modal('toggle');
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

    saveCinema(){
        this.sendCinemaForm = true;
        this._cinemasService.createCinema(this.cinema, this.city_id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#addCinema').modal('toggle');
                    this.cinemas.push(json.data);
                    this._messagesService.showSuccessMessage('El cine se ha creado correctamente');
                    Dropzone.forElement(".dropzone").removeAllFiles(true);
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
    updateCinema(){
        this.sendCinemaForm = true;
        this._cinemasService.updateCinema(this.cinema, this.city_id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    for(let i = 0; i<this.cinemas.length; i++){
                        let cinema = this.cinemas[i];
                        if(cinema.id == this.cinema.id){
                            this.cinemas[i] = this.cinema;
                            break;
                        }
                    }
                    $('#addCinema').modal('toggle');
                    this._messagesService.showSuccessMessage('El cine se ha actualizado correctamente');
                    Dropzone.forElement(".dropzone").removeAllFiles(true);
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

    changeFilteredCities(province){
        this._citiesService.getList(province.value).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.filteredCity = this.transformForSelect2(json.data);
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

    updateRoomsByCinema(){
        this._roomsService.updateByCinema(this.cinema.id, this.rooms).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#viewRooms').modal('toggle');
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
    updateUsersByCinema(){
        this._usersService.updateByCinema(this.cinema.id, this.users).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#viewUsers').modal('toggle');
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
    getRoomListByCinema(cinema_id){
        this._roomsService.getListByCinema(cinema_id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.rooms = json.data;
                    $('#viewRooms').modal('toggle');
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
    getUserListByCinema(cinema_id){
        this._usersService.getListByCinema(cinema_id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.users = json.data;
                    $('#viewUsers').modal('toggle');
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
    getUserListByNoCinema(cinema_id){
        this._usersService.getListByNoCinema(cinema_id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.usersNoCinema= json.data;
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

    editRoomsCinemaModal(cinema){
        this.cinema = cinema;
        this.getRoomListByCinema(cinema.id);
    }
    editUsersCinemaModal(cinema){
        this.cinema = cinema;
        this.getUserListByCinema(cinema.id);
        this.getUserListByNoCinema(cinema.id);
    }
    private transformForSelect2(datas: Array<any>){
        let result = [];
        for(let i=0;i<datas.length; i++){
            let value = datas[i].id;
            let label = datas[i].name;
            if(datas[i].surnames != null){
                label = label + " " + datas[i].surnames;
            }
            result.push({value : value.toString(), label : label});
        }
        return result;
    }

    addRoom(){
        this.rooms.push(new Room());
    }
    removeRoom(room){
        var index = this.rooms.indexOf(room);
        if (index != -1) {
            this.rooms.splice(index, 1);
        }
    }
    addUser(user){
        var index = this.usersNoCinema.indexOf(user);
        if (index != -1) {
            this.usersNoCinema.splice(index, 1);
        }
        this.users.push(user);
    }
    removeUser(user){
        var index = this.users.indexOf(user);
        if (index != -1) {
            this.users.splice(index, 1);
        }
        this.usersNoCinema.push(user);
    }
}
