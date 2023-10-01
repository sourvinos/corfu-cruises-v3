import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'parameters-menu',
    templateUrl: './parameters-menu.component.html',
    styleUrls: ['../../../../../assets/styles/custom/dropdown-menu.css']
})

export class ParametersMenuComponent {

    constructor(private cryptoService: CryptoService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region public methods

    public doNavigationTasks(): void {
        this.router.navigate(['/parameters'])
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    //#endregion

}
