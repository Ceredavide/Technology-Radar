import { Injectable, inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../../auth/services/user/user.service";


@Injectable({ providedIn: 'root' })

export class AdminRoleGuard {
    canActivate: CanActivateFn = () => {
        const userService = inject(UserService);
        const router = inject(Router);

        console.log(userService.getUser())

        if (userService.hasRole(["Chief Technology Officer"])) {
            return true;
        } else {
            router.navigateByUrl('/home');
            return false;
        }
    };
}