import { Routes, mapToCanActivate } from '@angular/router';

import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';

import { TechnologyFormComponent } from "./modules/admin/components/technology-form/technology.component"
import { AuthGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'form', component: TechnologyFormComponent, canActivate: mapToCanActivate([AuthGuard]) },
    { path: '', redirectTo: '/form', pathMatch: 'full' }
];
