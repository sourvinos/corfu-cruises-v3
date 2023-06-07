import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { AccountService } from './account.service'

@Injectable({ providedIn: 'root' })

export class AuthGuardService {

    constructor(private accountService: AccountService, private router: Router) { }

    canActivate(): boolean {
        if (this.accountService.isLoggedIn) {
            return true
        } else {
            this.router.navigate(['/'])
            return false
        }
        // return this.accountService.isLoggedIn.pipe(take(1), map((loginStatus: boolean) => {
        //     if (!loginStatus) {
        //         this.router.navigate(['/'])
        //         return false
        //     }
        // }))
    }

}