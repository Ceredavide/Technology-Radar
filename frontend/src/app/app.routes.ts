import { Routes, mapToCanActivate } from '@angular/router';

import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginComponent } from './core/auth/components/login/login.component';
import { SignupComponent } from './core/auth/components/signup/signup.component';

import { TechnologyFormComponent } from "./modules/admin/components/forms/technology-form/technology-form.component"
import { TechnologyRadarComponent } from './modules/home/components/technology-radar/technology-radar.component';

import { AdminScreenComponent } from './modules/admin/components/admin-screen/admin-screen.component';
import { TechnologyDashboardComponent } from './modules/admin/components/technology-dashboard/technology-dashboard.component';
import { RingHandlerComponent } from './modules/admin/components/ring-handler/ring-handler.component';
import { TechnologyHandlerComponent } from './modules/admin/components/technology-handler/technology-handler.component';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
        ],
    },
    {
        path: "home",
        canActivate: mapToCanActivate([AuthGuard]),
        component: TechnologyRadarComponent
    },
    {
        path: 'admin',
        canActivate: mapToCanActivate([AuthGuard]),
        component: AdminScreenComponent,
        children: [
            { path: "", redirectTo: '/admin/dashboard', pathMatch: 'full' },
            { path: "dashboard", component: TechnologyDashboardComponent },
            { path: 'create-technology', component: TechnologyFormComponent },
            { path: 'technology/:id/publish', component: RingHandlerComponent },
            { path: 'ring/:id/edit', component: RingHandlerComponent },
            { path: 'technology/:id/edit', component: TechnologyHandlerComponent }
        ],
    },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
