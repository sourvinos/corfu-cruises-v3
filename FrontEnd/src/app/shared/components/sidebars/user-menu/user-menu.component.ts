import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { Menu } from 'src/app/shared/classes/menu'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { TooltipService } from 'src/app/shared/services/tooltip.service'

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent {

    //#region variables

    public tooltipItems: Menu[]

    //#endregion

    constructor(private cryptoService: CryptoService, private interactionService: InteractionService, private router: Router, private sessionStorageService: SessionStorageService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.buildTooltips()
    }

    //#endregion

    //#region public methods

    public getDisplayName(): any {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('displayName'))
    }

    public getLabel(id: string): string {
        return this.tooltipService.getDescription(this.tooltipItems, id)
    }

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public onEditConnectedUser(): void {
        this.sessionStorageService.saveItem('returnUrl', '/')
        this.router.navigate(['/users/' + this.cryptoService.decrypt(this.sessionStorageService.getItem('userId'))])
    }

    //#endregion

    //#region private methods

    private buildTooltips(): void {
        this.tooltipService.getMessages().then((response) => {
            this.createTooltips(response)
            this.subscribeToTooltipLanguageChanges()
        })
    }

    private createTooltips(items: Menu[]): void {
        this.tooltipItems = []
        items.forEach(item => {
            this.tooltipItems.push(item)
        })
    }

    private subscribeToTooltipLanguageChanges(): void {
        this.interactionService.refreshTooltips.subscribe(() => {
            this.buildTooltips()
        })
    }

    //#endregion

}
