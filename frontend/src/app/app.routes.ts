import { Routes, mapToCanActivate } from '@angular/router';

import { LoginComponent } from './core/auth/components/login/login.component';
import { SignupComponent } from './core/auth/components/signup/signup.component';

import { TechnologyFormComponent } from "./modules/admin/components/technology-form/technology-form.component"
import { AuthGuard } from './core/guards/auth/auth.guard';
import { TechnologyRadarComponent } from './modules/home/components/technology-radar/technology-radar.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: TechnologyRadarComponent, canActivate: mapToCanActivate([AuthGuard]) },
    { path: 'form', component: TechnologyFormComponent, canActivate: mapToCanActivate([AuthGuard]) },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
