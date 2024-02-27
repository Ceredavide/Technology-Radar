import { Injectable, inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from '../../auth/services/auth/auth.service'

@Injectable({ providedIn: 'root' })

export class LoggedInGuard {
    canActivate: CanActivateFn = () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        if (authService.loggedIn) {
            router.navigateByUrl('/home');
            return false;
        } else {
            return true;
        }
    };
}