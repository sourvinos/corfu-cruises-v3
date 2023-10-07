import { Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
// Common
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { Menu } from 'src/app/shared/classes/menu'
import { TooltipService } from 'src/app/shared/services/tooltip.service'

@Component({
    selector: 'theme-selector',
    templateUrl: './theme-selector.component.html',
    styleUrls: ['./theme-selector.component.css']
})

export class ThemeSelectorComponent {

    //#region variables

    public defaultTheme = 'light'
    public tooltipItems: Menu[]

    //#endregion

    constructor(@Inject(DOCUMENT) private document: Document, private interactionService: InteractionService, private localStorageService: LocalStorageService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.applyTheme()
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

    public getThemeThumbnail(): string {
        return this.localStorageService.getItem('theme') == '' ? this.defaultTheme : this.localStorageService.getItem('theme')
    }

    public onChangeTheme(): void {
        this.toggleTheme()
        this.updateVariables()
        this.attachStylesheetToHead()
    }

    //#endregion

    //#region private methods

    private applyTheme(): void {
        this.updateVariables()
        this.attachStylesheetToHead()
    }

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.defaultTheme + '.css'
        headElement.appendChild(newLinkElement)
    }

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

    private toggleTheme(): void {
        this.localStorageService.saveItem('theme', this.localStorageService.getItem('theme') == 'light' ? 'dark' : 'light')
    }

    private updateVariables(): void {
        this.defaultTheme = this.localStorageService.getItem('theme') || this.defaultTheme
    }

    //#endregion

}
