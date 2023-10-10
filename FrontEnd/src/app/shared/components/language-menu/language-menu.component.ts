import { Component } from '@angular/core'
// Custom
import { InteractionService } from '../../services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { Menu } from 'src/app/shared/classes/menu'
import { MessageCalendarService } from '../../services/message-calendar.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { TooltipService } from 'src/app/shared/services/tooltip.service'

@Component({
    selector: 'language-menu',
    templateUrl: './language-menu.component.html',
    styleUrls: ['./language-menu.component.css']
})

export class LanguageMenuComponent {

    //#region variables

    public tooltipItems: Menu[]
    public feature = 'languages'

    //#endregion

    constructor(private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageCalendarService: MessageCalendarService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.buildTooltips()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.tooltipService.getDescription(this.tooltipItems, id)
    }

    public onChangelanguage(language: string): string {
        this.saveLanguage(language)
        this.loadMessages()
        return language
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

    private loadMessages(): void {
        this.messageCalendarService.getMessages()
        this.messageHintService.getMessages()
        this.messageLabelService.getMessages()
        this.messageDialogService.getMessages()
        this.interactionService.updateDateAdapters()
        this.interactionService.updateMenus()
        this.interactionService.updateTabTitle()
        this.interactionService.updateTooltips()
    }

    private saveLanguage(language: string): void {
        this.localStorageService.saveItem('language', language)
    }

    private subscribeToTooltipLanguageChanges(): void {
        this.interactionService.refreshTooltips.subscribe(() => {
            this.buildTooltips()
        })
    }

    //#endregion

}
