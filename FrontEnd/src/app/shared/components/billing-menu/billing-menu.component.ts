import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { CryptoService } from '../../services/crypto.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { Menu } from 'src/app/shared/classes/menu'
import { MessageMenuService } from 'src/app/shared/services/message-menu.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { TooltipService } from 'src/app/shared/services/tooltip.service'

@Component({
    selector: 'billing-menu',
    templateUrl: './billing-menu.component.html',
    styleUrls: ['./billing-menu.component.css']
})

export class BillingMenuComponent {

    //#region variables

    public tooltipItems: Menu[]
    public menuItems: Menu[] = []

    //#endregion

    constructor(private cryptoService: CryptoService,private interactionService: InteractionService, private messageMenuService: MessageMenuService, private router: Router, private sessionStorageService: SessionStorageService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.buildMenu()
        this.buildTooltips()
    }

    //#endregion

    //#region public methods

    public doNavigation(feature: string): void {
        this.router.navigate([feature])
    }

    public getLabel(id: string): string {
        return this.messageMenuService.getDescription(this.menuItems, id)
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    //#endregion

    //#region private methods

    private buildMenu(): void {
        this.messageMenuService.getMessages().then((response) => {
            this.createMenu(response)
            this.subscribeToMenuLanguageChanges()
        })
    }

    private buildTooltips(): void {
        this.tooltipService.getMessages().then((response) => {
            this.createTooltips(response)
            this.subscribeToTooltipLanguageChanges()
        })
    }

    private createMenu(items: Menu[]): void {
        this.menuItems = []
        items.forEach(item => {
            this.menuItems.push(item)
        })
    }

    private createTooltips(items: Menu[]): void {
        this.tooltipItems = []
        items.forEach(item => {
            this.tooltipItems.push(item)
        })
    }

    private subscribeToMenuLanguageChanges(): void {
        this.interactionService.refreshMenus.subscribe(() => {
            this.buildMenu()
        })
    }

    private subscribeToTooltipLanguageChanges(): void {
        this.interactionService.refreshTooltips.subscribe(() => {
            this.buildTooltips()
        })
    }

    //#endregion

}
