import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Ng2PaginationModule} from 'ng2-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import {SelectModule} from 'angular2-select';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {WebComponent} from "./web/web.component";
import {ExampleTableComponent} from "./components/exampleTableComponent/exampleTable.component";
import {ExamplePageComponent} from "./admin-panel/examplePage/examplePage";
import {LoginPageComponent} from "./admin-panel/loginPage/loginPage.component";
import {DashboardComponent} from "./admin-panel/dashboard/dashboard.component";
import {UserManagement} from "./admin-panel/dashboard/userManagementPage/userManagement.component";
import {CinemaManagement} from "./admin-panel/dashboard/cinemaManagementPage/cinemaManagement.component";
import {FilmManagement} from "./admin-panel/dashboard/filmManagementPage/filmManagement.component";
import {ProviderFilmManagement} from "./admin-panel/dashboard/providerFilmManagementPage/providerFilmManagement.component";
import {ProgammerFilmManagement} from "./admin-panel/dashboard/programmerFilmManagementPage/programmerFilmManagement.component";
import {EventsManagement} from "./admin-panel/dashboard/eventsManagementPage/eventsManagement.component";
import {PendingEventsManagement} from "./admin-panel/dashboard/pendingEventsManagementPage/pendingEventsManagement.component";
import {CinemasAdminEventsManagement} from "./admin-panel/dashboard/cinemasAdminEventsManagementPage/cinemasAdminEventsManagement.component";
import {ProgrammerEventsManagement} from "./admin-panel/dashboard/programmerEventsManagementPage/programmerEventsManagement.component";
import {ProgrammerValidatedEventsManagement} from "./admin-panel/dashboard/programmerEventsManagementPage/programmerValidatedEventsManagement.component";
import {ProviderEventsManagement} from "./admin-panel/dashboard/providerEventsManagementPage/providerEventsManagement.component";
import {Settings} from "./admin-panel/dashboard/settingsPage/settings.component";
import {MyEvents} from "./admin-panel/dashboard/myEventsPage/myEvents.component";
import {Surveys} from "./admin-panel/dashboard/surveysPage/surveys.component";
import {FacebookLoginComponent} from "./components/facebookLogin/facebookLogin.component";
import {ProfileManagement} from "./admin-panel/dashboard/profileManagementPage/profileManagement.component";
import {ListUsers} from "./admin-panel/dashboard/CRM/listUsersManagementPage/listUsers.component";
import {UsersTimeline} from "./admin-panel/dashboard/CRM/usersTimelineManagementPage/usersTimeline.component";
import {MyProfileComponent} from "./web/myProfile/myProfile.component";
import {SingleEventComponent} from "./web/singleEvent/singleEvent.component";
import {SingleFilmComponent} from "./web/singleFilm/singleFilm.component";
import {EventCatalog} from "./web/eventCatalog/eventCatalog.component";
import {FilmCatalog} from "./web/filmCatalog/filmCatalog.component";
import {CheckoutComponent} from "./web/checkout/checkout.component";
import {EventCreateComponent} from "./web/eventCreate/eventCreate.component";
import {EventCardComponent} from "./web/commonComponents/eventCard.component";
import {FilmCardComponent} from "./web/commonComponents/filmCard.component";
import {IndexComponent} from "./web/index/index.component";
import {FaqsComponent} from "./web/FAQs/faqs.component";
import {TermsComponent} from "./web/TermsConditions/terms.component";
import {CinemaList} from "./web/cinemaList/cinemaList.component";
import {SingleCinema} from "./web/singleCinema/singleCinema.component";
import {Dashboard} from "./web/dashboard/dashboard.component";
import {SessionsService} from "./services/sessions.service";
import {MessagesService} from "./services/messages.service";
import {CodesService} from "./services/codes.service";
import {ApiConfigService} from "./services/apiConfig.service";
import {ModalLoginComponent} from "./components/modalLogin/modalLogin.component";
import {UsersService} from "./services/users.service";
import {ProfilesService} from "./services/profiles.service";
import {NoPermissionsComponent} from "./admin-panel/dashboard/noPermissions/noPermissions";
import {CinemaCompaniesService} from "./services/cinemaCompanies.service";
import {CinemasService} from "./services/cinemas.service";
import {CitiesService} from "./services/cities.service";
import {ProvincesService} from "./services/provinces.service";
import {FormatsService} from "./services/formats.service";
import {RoomsService} from "./services/rooms.service";
import {TagsService} from "./services/tags.service";
import {DirectorsService} from "./services/directors.service";
import {ActorsService} from "./services/actors.service";
import {InterestsService} from "./services/interests.service";
import {CountriesService} from "./services/countries.service";
import {GenresService} from "./services/genres.service";
import {LanguagesService} from "./services/languages.service";
import {QualificationsService} from "./services/qualifications.service";
import {MoviesService} from "./services/movies.service";
import {EventsService} from "./services/events.service";
import {AgmCoreModule} from "angular2-google-maps/core";
import {CustomersService} from "./services/customers.service";
import {LogsService} from "./services/logs.service";
import {ImageUploadModule} from "angular2-image-upload";
import {Compassuite} from "./admin-panel/dashboard/compassuitePage/compassuite.component";
import {CompassuiteService} from "./services/compassuite.service";
import {TranslateModule} from "ng2-translate";





@NgModule({
    declarations: [
        AppComponent,
        WebComponent,
        AdminPanelComponent,
        ExampleTableComponent,
        ExamplePageComponent,
        LoginPageComponent,
        DashboardComponent,
        UserManagement,
        ListUsers,
        UsersTimeline,
        MyEvents,
        Surveys,
        ProfileManagement,
        FacebookLoginComponent,
        ModalLoginComponent,
        IndexComponent,
        MyProfileComponent,
        SingleEventComponent,
        SingleFilmComponent,
        FilmCatalog,
        EventCatalog,
        SingleCinema,
        CheckoutComponent,
        EventCardComponent,
        FilmCardComponent,
        FaqsComponent,
        TermsComponent,
        CinemaList,
        NoPermissionsComponent,
        CinemaManagement,
        FilmManagement,
        EventsManagement,
        Settings,
        EventCreateComponent,
        CinemasAdminEventsManagement,
        ProgrammerEventsManagement,
        ProviderEventsManagement,
        PendingEventsManagement,
        ProgrammerValidatedEventsManagement,
        Dashboard,
        ProviderFilmManagement,
        ProgammerFilmManagement,
        Compassuite,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2PaginationModule,
        ReactiveFormsModule,
        SelectModule,
        MyDatePickerModule,
        routing,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyArURQV4cyvQ9gITfu6Ix_lJM71e2Xw4LQ'
        }),
        ImageUploadModule.forRoot(),
        TranslateModule.forRoot()
    ],
    providers: [
        appRoutingProviders,
        SessionsService,
        MessagesService,
        CodesService,
        ApiConfigService,
        UsersService,
        ProfilesService,
        ProfilesService,
        ApiConfigService,
        UsersService,
        CinemaCompaniesService,
        CinemasService,
        CitiesService,
        ProvincesService,
        FormatsService,
        RoomsService,
        TagsService,
        DirectorsService,
        ActorsService,
        InterestsService,
        CountriesService,
        GenresService,
        LanguagesService,
        QualificationsService,
        MoviesService,
        EventsService,
        CustomersService,
        LogsService,
        CompassuiteService,
        { provide: LOCALE_ID, useValue: "es-ES" }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
