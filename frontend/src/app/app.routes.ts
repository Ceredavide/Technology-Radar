import { Routes, mapToCanActivate } from '@angular/router';

import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginComponent } from './core/auth/components/login/login.component';


import { TechnologyRadarComponent } from './modules/home/components/technology-radar/technology-radar.component';
import { AdminScreenComponent } from './modules/admin/components/admin-screen/admin-screen.component';
import { TechnologyDashboardComponent } from './modules/admin/components/technology-dashboard/technology-dashboard.component';
import { RingHandlerComponent } from './modules/admin/components/ring-handler/ring-handler.component';
import { TechnologyHandlerComponent } from './modules/admin/components/technology-handler/technology-handler.component';
import { TechnologyCreateComponent } from './modules/admin/components/technology-create/technology-create.component';
import { LoggedInGuard } from './core/guards/loggedin/loggedin.guard';
import { AdminRoleGuard } from './core/guards/admin-role/admin-role.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: mapToCanActivate([LoggedInGuard]),
        children: [
            { path: 'login', component: LoginComponent }
        ],
    },
    {
        path: 'dashboard',
        canActivate: mapToCanActivate([AuthGuard]),
        component: TechnologyRadarComponent
    },
    {
        path: 'admin',
        canActivate: mapToCanActivate([AuthGuard, AdminRoleGuard]),
        component: AdminScreenComponent,
        children: [
            { path: "", redirectTo: '/admin/dashboard', pathMatch: 'full' },
            { path: "dashboard", component: TechnologyDashboardComponent },
            { path: 'technology/new', component: TechnologyCreateComponent },
            { path: 'technology/:id/publish', component: RingHandlerComponent },
            { path: 'ring/:id/edit', component: RingHandlerComponent },
            { path: 'technology/:id/edit', component: TechnologyHandlerComponent }
        ],
    },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];
