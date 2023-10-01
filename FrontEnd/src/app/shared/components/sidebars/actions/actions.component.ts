import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { Menu } from 'src/app/shared/classes/menu'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { environment } from 'src/environments/environment'
import { ActionTooltipService } from 'src/app/shared/services/action-tooltip.service'

@Component({
    selector: 'actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.css']
})

export class ActionsComponent {

    //#region variables

    public feature = 'actions'
    public imgIsLoaded = false
    public actionTooltipItems: Menu[] = []

    //#endregion

    constructor(
        private actionTooltipService: ActionTooltipService,
        private cryptoService: CryptoService,
        private interactionService: InteractionService,
        private router: Router,
        private sessionStorageService: SessionStorageService
    ) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.actionTooltipService.getMessages().then((response) => {
            this.createTooltips(response)
            this.subscribeToInteractionService()
        })
    }

    //#endregion

    //#region public methods

    public doNavigationTasks(feature: string): void {
        this.router.navigate([feature])
    }

    public getIcon(filename: string): string {
        return environment.shortcutsDirectory + filename + '.svg'
    }

    public getLabel(id: string): string {
        return this.actionTooltipService.getDescription(this.actionTooltipItems, id)
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    public loadImage(): void {
        this.imgIsLoaded = true
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
