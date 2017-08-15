import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {WebComponent} from "./web/web.component";
import {LoginPageComponent} from "./admin-panel/loginPage/loginPage.component";
import {DashboardComponent} from "./admin-panel/dashboard/dashboard.component";
import {UserManagement} from "./admin-panel/dashboard/userManagementPage/userManagement.component";
import {CinemaManagement} from "./admin-panel/dashboard/cinemaManagementPage/cinemaManagement.component";
import {FilmManagement} from "./admin-panel/dashboard/filmManagementPage/filmManagement.component";
import {EventsManagement} from "./admin-panel/dashboard/eventsManagementPage/eventsManagement.component";
import {ProfileManagement} from "./admin-panel/dashboard/profileManagementPage/profileManagement.component";
import {Settings} from "./admin-panel/dashboard/settingsPage/settings.component";
import {MyEvents} from "./admin-panel/dashboard/myEventsPage/myEvents.component";
import {Surveys} from "./admin-panel/dashboard/surveysPage/surveys.component";
import {ExamplePageComponent} from "./admin-panel/examplePage/examplePage";
import {ListUsers} from "./admin-panel/dashboard/CRM/listUsersManagementPage/listUsers.component";
import {UsersTimeline} from "./admin-panel/dashboard/CRM/usersTimelineManagementPage/usersTimeline.component";
import {MyProfileComponent} from "./web/myProfile/myProfile.component";
import {SingleEventComponent} from "./web/singleEvent/singleEvent.component";
import {SingleFilmComponent} from "./web/singleFilm/singleFilm.component";
import {FilmCatalog} from "./web/filmCatalog/filmCatalog.component";
import {EventCatalog} from "./web/eventCatalog/eventCatalog.component";
import {CheckoutComponent} from "./web/checkout/checkout.component";
import {EventCreateComponent} from "./web/eventCreate/eventCreate.component";
import {IndexComponent} from "./web/index/index.component";
import {FaqsComponent} from "./web/FAQs/faqs.component";
import {CinemaList} from "./web/cinemaList/cinemaList.component";
import {SingleCinema} from "./web/singleCinema/singleCinema.component";
import {TermsComponent} from "./web/TermsConditions/terms.component";
import {Dashboard} from "./web/dashboard/dashboard.component";
import {NoPermissionsComponent} from "./admin-panel/dashboard/noPermissions/noPermissions";
import {CinemasAdminEventsManagement} from "./admin-panel/dashboard/cinemasAdminEventsManagementPage/cinemasAdminEventsManagement.component";
import {ProgrammerEventsManagement} from "./admin-panel/dashboard/programmerEventsManagementPage/programmerEventsManagement.component";
import {ProviderEventsManagement} from "./admin-panel/dashboard/providerEventsManagementPage/providerEventsManagement.component";
import {PendingEventsManagement} from "./admin-panel/dashboard/pendingEventsManagementPage/pendingEventsManagement.component";
import {ProgrammerValidatedEventsManagement} from "./admin-panel/dashboard/programmerEventsManagementPage/programmerValidatedEventsManagement.component";
import {ProviderFilmManagement} from "./admin-panel/dashboard/providerFilmManagementPage/providerFilmManagement.component";
import {ProgammerFilmManagement} from "./admin-panel/dashboard/programmerFilmManagementPage/programmerFilmManagement.component";
import {Compassuite} from "./admin-panel/dashboard/compassuitePage/compassuite.component";
import {RegisterPageComponent} from "./web/register/register.component";
import {ShelterCatalog} from "./web/shelterCatalog/shelterCatalog.component";
import {SingleShelterComponent} from "./web/singleShelter/singleShelter.component";
import {LoginComponent} from "./web/login/login.component";
import {ResetComponent} from "./web/resetPassword/reset.component";
import {CreateShelterComponent} from "./web/createShelter/createShelter.component";
import {DashboardShelterComponent} from "./shelter-panel/dashboard/dashboard.component";
import {PendingSheltersManagement} from "./admin-panel/dashboard/getPendingShelters/pendingShelters.component";
import {EditProfileComponent} from "./web/editProfile/editProfile.component";
import {AnimalCatalog} from "./web/animalCatalog/animalCatalog.component";
import {SingleAnimalComponent} from "./web/singleAnimal/singleAnimal.component";
import {MyAnimalsComponent} from "./web/myAnimals/myAnimals.component";




const appRoutes:Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {
        path: "", component: WebComponent, children: [
        {
            path: 'index',
            component: IndexComponent,
        },
      {
        path: 'myProfile',
        component: MyProfileComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: 'createShelter',
        component: CreateShelterComponent,
      },
        {
            path: 'event/:event_id',
            component: SingleEventComponent,
        },
        {
            path: 'film/:movie_id',
            component: SingleFilmComponent,
        },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'shelters/:province',
        component: ShelterCatalog,
      },
      {
        path: 'user/edit',
        component: EditProfileComponent,
      },
      {
        path: 'shelter/:shelter_id',
        component: SingleShelterComponent,
      },
      {
        path: 'myAnimals',
        component: MyAnimalsComponent,
      },{
        path: 'shelter/animals/:shelter_id',
        component: AnimalCatalog,
      },{
        path: 'animal/:animal_id',
        component: SingleAnimalComponent,
      },


        {
            path: 'filmCatalog',
            component: FilmCatalog,
        },
        {
            path: 'eventCatalog',
            component: EventCatalog,
        },
        {
            path: 'createEvent',
            component: EventCreateComponent,
        },
        {
            path: 'faqs',
            component: FaqsComponent,
        },
      {
        path: 'terms',
        component: TermsComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'restart-password/:token',
        component: ResetComponent,
      },
        {
            path: 'cinemaList',
            component: CinemaList,
        },

        {
            path: 'singleCinema',
            component: SingleCinema,
        },



        {
        path: 'dashboard',
        component: Dashboard,
        },

    ]
    },{
    path: "shelter-panel", component: DashboardShelterComponent, children: [
      {
        path: 'examplePage',
        component: ExamplePageComponent,
      },

    ]
    },
    {
        path: "admin-panel", component: DashboardComponent, children: [

        {
            path: 'dashboard',
            component: AdminPanelComponent, children: [

            {
                path: 'noPermissions',
                component: NoPermissionsComponent,
            },
            {
                path: 'getPendingShelters',
                component: PendingSheltersManagement,
            }

        ]
        },

    ]
    },



];

export const appRoutingProviders:any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
