import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { Menu } from 'src/app/shared/classes/menu'
import { MessageMenuService } from 'src/app/shared/services/message-menu.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ActionTooltipService } from 'src/app/shared/services/action-tooltip.service'

@Component({
    selector: 'tables-menu',
    templateUrl: './tables-menu.component.html',
    styleUrls: ['./tables-menu.component.css']
})

export class TablesMenuComponent {

    //#region variables

    public actionTooltipItems: Menu[] = []
    public feature = 'tables'
    public menuItems: Menu[] = []

    //#endregion

    constructor(private actionTooltipService: ActionTooltipService, private cryptoService: CryptoService, private interactionService: InteractionService, private messageMenuService: MessageMenuService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.messageMenuService.getMessages().then((response) => {
            this.createMenu(response)
            this.subscribeToInteractionService()
        })
        this.actionTooltipService.getMessages().then((response) => {
            this.createTooltips(response)
            this.subscribeToInteractionService()
        })
    }

    //#endregion

    //#region public methods

    public doNavigationTasks(feature: string): void {
        this.router.navigate([feature.substring(7)])
    }

    public getLabel(id: string): string {
        return this.actionTooltipService.getDescription(this.actionTooltipItems, id)
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    //#endregion

    //#region private methods

    private createMenu(items: Menu[]): void {
        this.menuItems = []
        items.sort((a, b) => (a.description < b.description) ? -1 : 1)
        items.forEach(item => {
            if (item.id.startsWith('tables')) {
                this.menuItems.push(item)
            }
        })
    }

    private createTooltips(items: Menu[]): void {
        this.actionTooltipItems = []
        items.forEach(item => {
            this.actionTooltipItems.push(item)
        })
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshMenus.subscribe(() => {
            this.messageMenuService.getMessages().then((response) => {
                this.menuItems = response
                this.createMenu(response)
            })
        })
    }

    //#endregion

}
