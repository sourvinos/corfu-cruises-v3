import { Component } from '@angular/core'
import { Menu } from 'src/app/shared/classes/menu'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { DialogService } from '../../services/modal-dialog.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from '../../services/message-dialog.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { TooltipService } from 'src/app/shared/services/tooltip.service'

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})

export class LogoutComponent {

    //#region variables

    public tooltipItems: Menu[]

    //#endregion

    constructor(private accountService: AccountService, private dialogService: DialogService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private sessionStorageService: SessionStorageService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.buildTooltips()
    }

    //#endregion

    //#region public methods

    public getIconColor(): string {
        return this.localStorageService.getItem('theme') == 'light' ? 'black' : 'white'
    }

    public getLabel(id: string): string {
        return this.tooltipService.getDescription(this.tooltipItems, id)
    }

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public onLogoutRequest(): void {
        this.dialogService.open(this.messageDialogService.confirmLogout(), 'question', ['abort', 'ok']).subscribe(response => {
            response ? this.accountService.logout() : null
        })
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
