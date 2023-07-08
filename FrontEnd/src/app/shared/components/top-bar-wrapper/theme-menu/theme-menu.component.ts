import { Component, HostListener, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
// Common
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'

@Component({
    selector: 'theme-menu',
    templateUrl: './theme-menu.component.html',
    styleUrls: ['./theme-menu.component.css']
})

export class ThemeMenuComponent {

    //#region variables

    public defaultTheme = 'icy-white'
    public defaultThemeGroup = 'light'
    public imgIsLoaded = false

    //#endregion

    constructor(@Inject(DOCUMENT) private document: Document, private interactionService: InteractionService, private localStorageService: LocalStorageService) { }

    //#region listeners

    @HostListener('mouseenter') onMouseEnter(): void {
        document.querySelectorAll('.sub-menu').forEach((item) => {
            item.classList.remove('hidden')
        })
    }

    //#endregion

    //#region lifecycle hooks

    ngOnInit(): void {
        this.applyTheme()
    }

    //#endregion

    //#region public methods

    public getThemeThumbnail(): string {
        return this.localStorageService.getItem('theme') == '' ? this.defaultTheme : this.localStorageService.getItem('theme')
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public loadImage(): void {
        this.imgIsLoaded = true
    }

    public onChangeTheme(theme: string, themeGroup: string): void {
        this.setDefaultTheme(theme, themeGroup)
        this.attachStylesheetToHead()
        this.saveTheme()
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
        this.saveTheme()
    }

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.defaultTheme + '.css'
        headElement.appendChild(newLinkElement)
    }

    private refreshBackgroundImage(): void {
        this.interactionService.mustRefreshBackgroundImage()
    }

    private saveTheme(): void {
        this.localStorageService.saveItem('theme', this.defaultTheme)
        this.localStorageService.saveItem('theme-group', this.defaultThemeGroup)
    }

    private setDefaultTheme(theme: string, themeGroup: string): void {
        this.defaultTheme = theme
        this.defaultThemeGroup = themeGroup
    }

    private updateVariables(): void {
        this.defaultTheme = this.localStorageService.getItem('theme') || this.defaultTheme
        this.defaultThemeGroup = this.localStorageService.getItem('theme-group') || this.defaultThemeGroup
    }

    //#endregion

}