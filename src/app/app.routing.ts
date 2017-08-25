import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {WebComponent} from "./web/web.component";
import {DashboardComponent} from "./admin-panel/dashboard/dashboard.component";
import {IndexComponent} from "./web/index/index.component";
import {RegisterPageComponent} from "./web/register/register.component";
import {ShelterCatalog} from "./web/shelterCatalog/shelterCatalog.component";
import {SingleShelterComponent} from "./web/singleShelter/singleShelter.component";
import {LoginComponent} from "./web/login/login.component";
import {ResetComponent} from "./web/resetPassword/reset.component";
import {CreateShelterComponent} from "./web/createShelter/createShelter.component";
import {PendingSheltersManagement} from "./admin-panel/dashboard/getPendingShelters/pendingShelters.component";
import {EditProfileComponent} from "./web/editProfile/editProfile.component";
import {AnimalCatalog} from "./web/animalCatalog/animalCatalog.component";
import {SingleAnimalComponent} from "./web/singleAnimal/singleAnimal.component";
import {MyAnimalsComponent} from "./web/myAnimals/myAnimals.component";
import {CreateAnimalComponent} from "./web/createAnimal/createAnimal.component";
import {NotFoundComponent} from "./web/notFoundComponent/notFoundComponent.component";
import {NotAllowedComponent} from "./web/notAllowedComponent/notAllowedComponent";




const appRoutes:Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {path: 'notAllowed', component: NotAllowedComponent},
    {
        path: "", component: WebComponent, children: [
        {
            path: 'index',
            component: IndexComponent,
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
      },
      {
        path: 'createAnimal',
        component: CreateAnimalComponent,
      },{
        path: 'shelter/animals/:shelter_id',
        component: AnimalCatalog,
      },{
        path: 'animal/:animal_id',
        component: SingleAnimalComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'restart-password/:token',
        component: ResetComponent,
      },
    ]
    },
    {
        path: "admin-panel", component: DashboardComponent, children: [
        {
            path: 'dashboard',
            component: AdminPanelComponent, children: [
            {
                path: 'getPendingShelters',
                component: PendingSheltersManagement,
            }
        ]
        },
    ]
    },
  {path: 'notFound', component: NotFoundComponent},
  {path: '**', redirectTo: '/notFound'}

];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
