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
import {IndexComponent} from "./web/index/index.component";
import {SessionsService} from "./services/sessions.service";
import {MessagesService} from "./services/messages.service";
import {CodesService} from "./services/codes.service";
import {ApiConfigService} from "./services/apiConfig.service";
import {UsersService} from "./services/users.service";
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
import {NotAllowedComponent} from "./web/notAllowedComponent/notAllowedComponent";
import {DashboardComponent} from "./admin-panel/dashboard/dashboard.component";
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}
@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        WebComponent,
        AdminPanelComponent,
        LoginComponent,
        ResetComponent,
        RegisterPageComponent,
        IndexComponent,
        ShelterCardComponent,
        ShelterCatalog,
        SingleShelterComponent,
        EditProfileComponent,
        PendingSheltersManagement,
        CreateShelterComponent,
        AnimalCardComponent,
        AnimalCatalog,
        SingleAnimalComponent,
        MyAnimalsComponent,
        CreateAnimalComponent,
        NotAllowedComponent,
      DashboardComponent
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

        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
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
        ApiConfigService,
        UsersService,
        ParticularService,
        ShelterService,
        { provide: LOCALE_ID, useValue: "es-ES" }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
