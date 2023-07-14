import { Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
// Common
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'

@Component({
    selector: 'theme-group-selector',
    templateUrl: './theme-group-selector.component.html'
})

export class ThemeGroupSelectorComponent {

    //#region variables

    public defaultThemeGroup = 'light'
    public imgIsLoaded = false

    //#endregion

    constructor(@Inject(DOCUMENT) private document: Document, private interactionService: InteractionService, private localStorageService: LocalStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.applyTheme()
    }

    //#endregion

    //#region public methods

    public getIconColor(): string {
        return this.localStorageService.getItem('theme-group') == 'light' ? 'black' : 'white'
    }

    public getThemeGroupThumbnail(): string {
        return this.localStorageService.getItem('theme-group') == '' ? this.defaultThemeGroup : this.localStorageService.getItem('theme-group')
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public loadImage(): void {
        this.imgIsLoaded = true
    }

    public onChangeThemeGroup(): void {
        this.swapTheme()
        this.updateVariables()
        this.attachStylesheetToHead()
        this.refreshBackgroundImage()
    }

    public onHideMenu(): void {
        document.querySelectorAll('.sub-menu').forEach((item) => {
            item.classList.add('hidden')
        })
    }

    //#endregion

    //#region private methods

    private applyTheme(): void {
        this.updateVariables()
        this.attachStylesheetToHead()
        this.refreshBackgroundImage()
    }

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.defaultThemeGroup + '-' + this.localStorageService.getItem('theme') + '.css'
        headElement.appendChild(newLinkElement)
    }

    private refreshBackgroundImage(): void {
        this.interactionService.mustRefreshBackgroundImage()
    }

    private swapTheme(): void {
        this.localStorageService.saveItem('theme-group', this.localStorageService.getItem('theme-group') == 'light' ? 'dark' : 'light')
    }

    private updateVariables(): void {
        this.defaultThemeGroup = this.localStorageService.getItem('theme-group') || this.defaultThemeGroup
    }

    //#endregion

}