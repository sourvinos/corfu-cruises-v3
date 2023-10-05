import { Component } from '@angular/core'
import { Menu } from 'src/app/shared/classes/menu'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { ActionTooltipService } from 'src/app/shared/services/action-tooltip.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageMenuService } from 'src/app/shared/services/message-menu.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})

export class LogoutComponent {

    public actionTooltipItems: Menu[] = []
    public feature = 'logout'
    public menuItems: Menu[] = []

    constructor(private interactionService: InteractionService, private messageMenuService: MessageMenuService, private actionTooltipService: ActionTooltipService, private accountService: AccountService, private localStorageService: LocalStorageService, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.actionTooltipService.getMessages().then((response) => {
            this.createTooltips(response)
            this.subscribeToInteractionService()
        })
    }

    //#endregion

    //#region public methods

    public getIconColor(): string {
        return this.localStorageService.getItem('theme') == 'light' ? 'black' : 'white'
    }

    public getLabel(id: string): string {
        return this.actionTooltipService.getDescription(this.actionTooltipItems, id)
    }


    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public onLogout(): void {
        this.accountService.logout()
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
        this.interactionService.refreshTooltips.subscribe(() => {
            this.messageMenuService.getMessages().then((response) => {
                this.menuItems = response
                this.createTooltips(response)
            })
        })
    }

    //#endregion

}
