import { Component } from '@angular/core'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html'
})

export class LogoutComponent {

    constructor(private accountService: AccountService, private sessionStorageService: SessionStorageService) { }

    //#region public methods

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public onLogout(): void {
        this.accountService.logout()
    }

    //#endregion

}
