import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Menu } from 'src/app/shared/classes/menu'
import { ActionTooltipService } from 'src/app/shared/services/action-tooltip.service'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'parameters-menu',
    templateUrl: './parameters-menu.component.html',
    styleUrls: ['../../../../../assets/styles/custom/dropdown-menu.css']
})

export class ParametersMenuComponent {

    public actionTooltipItems: Menu[] = []

    constructor(private interactionService: InteractionService, private actionTooltipService: ActionTooltipService, private cryptoService: CryptoService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.actionTooltipService.getMessages().then((response) => {
            this.createTooltips(response)
            this.subscribeToInteractionService()
        })
    }

    //#endregion

    //#region public methods

    public doNavigationTasks(): void {
        this.router.navigate(['/parameters'])
    }

    public getLabel(id: string): string {
        return this.actionTooltipService.getDescription(this.actionTooltipItems, id)
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    //#endregion

    //#region private methods

    private createTooltips(items: Menu[]): void {
        this.actionTooltipItems = []
        items.forEach(item => {
            this.actionTooltipItems.push(item)
        })
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshMenus.subscribe(() => {
            this.actionTooltipService.getMessages().then((response) => {
                this.actionTooltipItems = response
                this.createTooltips(response)
            })
        })
    }


    //#endregion

}
