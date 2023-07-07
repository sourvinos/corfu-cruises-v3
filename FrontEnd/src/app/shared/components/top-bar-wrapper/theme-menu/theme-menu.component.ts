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

    private feature = 'theme-menu'
    public defaultTheme = 'icy-white'
    public imgIsLoaded = false


    //#endregion

    constructor(@Inject(DOCUMENT) private document: Document, private interactionService: InteractionService, private localStorageService: LocalStorageService) { }

    @HostListener('mouseenter') onMouseEnter(): void {
        document.querySelectorAll('.sub-menu').forEach((item) => {
            item.classList.remove('hidden')
        })
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.applyTheme()
    }

    //#endregion

    //#region public methods

    public onChangeTheme(theme: string): void {
        this.changeTheme(theme)
        this.attachStylesheetToHead()
        this.updateLocalStorage()
        this.interactionService.mustRefreshBackgroundImage()
    }

    public onGetTheme(): string {
        return this.localStorageService.getItem('theme') == '' ? this.onSaveTheme(this.defaultTheme) : this.localStorageService.getItem('theme')
    }

    public onHideMenu(): void {
        document.querySelectorAll('.sub-menu').forEach((item) => {
            item.classList.add('hidden')
        })
    }

    public onLoadImage(): void {
        this.imgIsLoaded = true
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    //#endregion

    //#region private methods

    private applyTheme(): void {
        this.updateVariables()
        this.attachStylesheetToHead()
        this.updateLocalStorage()
    }

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.defaultTheme + '.css'
        headElement.appendChild(newLinkElement)
    }

    private changeTheme(theme: string): void {
        this.defaultTheme = theme
    }

    private updateLocalStorage(): void {
        this.localStorageService.saveItem('theme', this.defaultTheme)
    }

    private updateVariables(): void {
        this.defaultTheme = this.localStorageService.getItem('theme') || this.defaultTheme
    }

    public onSaveTheme(theme: string): string {
        this.localStorageService.saveItem('theme', theme)
        return theme
    }

    //#endregion

}