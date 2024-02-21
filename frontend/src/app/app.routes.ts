import { Routes, mapToCanActivate } from '@angular/router';

import { LoginComponent } from './core/auth/components/login/login.component';
import { SignupComponent } from './core/auth/components/signup/signup.component';

import { TechnologyFormComponent } from "./modules/admin/components/technology-form/technology-form.component"
import { AuthGuard } from './core/guards/auth/auth.guard';
import { TechnologyRadarComponent } from './modules/home/components/technology-radar/technology-radar.component';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
        ]
    },
    {
        path: "home",
        canActivate: mapToCanActivate([AuthGuard]),
        component: TechnologyRadarComponent
    },
    {
        path: 'admin',
        canActivate: mapToCanActivate([AuthGuard]),
        children: [
            { path: 'form', component: TechnologyFormComponent }
        ],
    },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
