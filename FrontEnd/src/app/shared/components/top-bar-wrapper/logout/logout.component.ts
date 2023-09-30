import { Component } from '@angular/core'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html'
})

export class LogoutComponent {

    //#region variables

    public displayedUsername: string
    public imgIsLoaded = false
    public defaultTheme = 'light'

    //#endregion

    constructor(private accountService: AccountService, private localStorageService: LocalStorageService, private sessionStorageService: SessionStorageService) { }

    //#region public methods

    public getIconColor(): string {
        return this.localStorageService.getItem('theme') == 'light' ? 'black' : 'white'
    }

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public onLogout(): void {
        this.accountService.logout()
    }

    //#endregion

}
