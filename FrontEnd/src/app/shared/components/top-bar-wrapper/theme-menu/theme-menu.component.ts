import { Component, HostListener, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
// Common
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'theme-menu',
    templateUrl: './theme-menu.component.html'
})

export class ThemeMenuComponent {

    //#region variables

    public defaultTheme = 'blue'
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

    public getMenuTopIcon(filename: string): string {
        return environment.menuTopIconDirectory + filename + '.svg'
    }

    public getThemeThumbnail(): string {
        return this.localStorageService.getItem('theme') == '' ? this.defaultTheme : this.localStorageService.getItem('theme')
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public loadImage(): void {
        this.imgIsLoaded = true
    }

    public onChangeTheme(theme: string): void {
        this.setDefaultTheme(theme)
        this.saveTheme()
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
        this.saveTheme()
        this.attachStylesheetToHead()
        this.refreshBackgroundImage()
    }

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.localStorageService.getItem('theme-group') + '-' + this.defaultTheme + '.css'
        headElement.appendChild(newLinkElement)
    }

    private refreshBackgroundImage(): void {
        this.interactionService.mustRefreshBackgroundImage()
    }

    private saveTheme(): void {
        this.localStorageService.saveItem('theme', this.defaultTheme)
    }

    private setDefaultTheme(theme: string): void {
        this.defaultTheme = theme
    }

    private updateVariables(): void {
        this.defaultTheme = this.localStorageService.getItem('theme') || this.defaultTheme
    }

    //#endregion

}