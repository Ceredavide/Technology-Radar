import { Injectable, inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from '../../auth/services/auth/auth.service'

@Injectable({ providedIn: 'root' })

// https://stackoverflow.com/questions/75564717/angulars-canactivate-interface-is-deprecated-how-to-replace-it

export class AuthGuard {
    canActivate: CanActivateFn = () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        if (authService.loggedIn) {
            return true;
        } else {
            router.navigateByUrl('/auth/login');
            return false;
        }
    };
}