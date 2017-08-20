import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
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
import {CustomersService} from "./services/customers.service";
import {LogsService} from "./services/logs.service";
import {ImageUploadModule} from "angular2-image-upload";
import {Compassuite} from "./admin-panel/dashboard/compassuitePage/compassuite.component";
import {CompassuiteService} from "./services/compassuite.service";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";
import {RegisterPageComponent} from "./web/register/register.component";
import {ParticularService} from "./services/particular.service";
import {ShelterService} from "./services/shelter.service";
import {ShelterCardComponent} from "./web/commonComponents/shelterCard.component";
import {ShelterCatalog} from "./web/shelterCatalog/shelterCatalog.component";
import {SingleShelterComponent} from "./web/singleShelter/singleShelter.component";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {LoginComponent} from "./web/login/login.component";
import {ResetComponent} from "./web/resetPassword/reset.component";
import {CreateShelterComponent} from "./web/createShelter/createShelter.component";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {ToastyModule} from 'ng2-toasty';
import {DashboardShelterComponent} from "./shelter-panel/dashboard/dashboard.component";
import {PendingSheltersManagement} from "./admin-panel/dashboard/getPendingShelters/pendingShelters.component";
import {EditProfileComponent} from "./web/editProfile/editProfile.component";
import {EditProfileService} from "./services/editProfile.service";
import {AnimalCardComponent} from "./web/commonComponents/animalCard.component";
import {AnimalService} from "./services/animal.service";
import {AnimalCatalog} from "./web/animalCatalog/animalCatalog.component";
import {SingleAnimalComponent} from "./web/singleAnimal/singleAnimal.component";
import {MyAnimalsComponent} from "./web/myAnimals/myAnimals.component";
import {CreateAnimalComponent} from "./web/createAnimal/createAnimal.component";
import {NotFoundComponent} from "./web/notFoundComponent/notFoundComponent.component";
import { CookieLawModule } from 'angular2-cookie-law';
@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        WebComponent,
        AdminPanelComponent,
        ExampleTableComponent,
        ExamplePageComponent,
        LoginPageComponent,
        LoginComponent,
        ResetComponent,
        RegisterPageComponent,
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
        ShelterCardComponent,
        ShelterCatalog,
        CheckoutComponent,
        EventCardComponent,
        FilmCardComponent,
        FaqsComponent,
        TermsComponent,
        CinemaList,
        NoPermissionsComponent,
        SingleShelterComponent,
        DashboardShelterComponent,
        CinemaManagement,
        FilmManagement,
        EventsManagement,
        Settings,
        EventCreateComponent,
        CinemasAdminEventsManagement,
        EditProfileComponent,
        ProgrammerEventsManagement,
        ProviderEventsManagement,
        PendingSheltersManagement,
        PendingEventsManagement,
        ProgrammerValidatedEventsManagement,
        Dashboard,
        ProviderFilmManagement,
        ProgammerFilmManagement,
        Compassuite,
        CreateShelterComponent,
        AnimalCardComponent,
        AnimalCatalog,
        SingleAnimalComponent,
        MyAnimalsComponent,
        CreateAnimalComponent
    ],

    imports: [
        CookieLawModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2PaginationModule,
        ReactiveFormsModule,
        SelectModule,
        MyDatePickerModule,
        routing,
        Ng2Bs3ModalModule,
        ToastyModule.forRoot(),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDJ0goX5RY-V3pvt4jEYlu_DH2ewKfU4s8',
          libraries: ["places"]
        }),
        ImageUploadModule.forRoot(),
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
          deps: [Http]
        })
    ],
    providers: [
        appRoutingProviders,
        FormBuilder,
        AnimalService,
        ReactiveFormsModule,
        SessionsService,
        EditProfileService,
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
        ParticularService,
        ShelterService,
        { provide: LOCALE_ID, useValue: "es-ES" }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
