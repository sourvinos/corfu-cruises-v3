import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent {

    constructor(private cryptoService: CryptoService, private localStorageService: LocalStorageService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region public methods

    public getDisplayName(): any {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('displayName'))
    }

    public getIconColor(): string {
        return this.localStorageService.getItem('theme') == 'light' ? 'black' : 'white'
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public onEditConnectedUser(): void {
        this.sessionStorageService.saveItem('returnUrl', '/')
        this.router.navigate(['/users/' + this.cryptoService.decrypt(this.sessionStorageService.getItem('userId'))])
    }

    //#endregion

}
