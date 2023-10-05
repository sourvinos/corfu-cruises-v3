import { Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
// Common
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'

@Component({
    selector: 'theme-selector',
    templateUrl: './theme-selector.component.html',
    styleUrls: ['./theme-selector.component.css']
})

export class ThemeSelectorComponent {

    //#region variables

    public defaultTheme = 'light'
    public imgIsLoaded = false

    //#endregion

    constructor(@Inject(DOCUMENT) private document: Document, private localStorageService: LocalStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.applyTheme()
    }

    //#endregion

    //#region public methods

    public getIconColor(): string {
        return this.localStorageService.getItem('theme') == 'light' ? 'black' : 'white'
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

    public onChangeTheme(): void {
        this.swapTheme()
        this.updateVariables()
        this.attachStylesheetToHead()
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
    }

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.defaultTheme + '.css'
        headElement.appendChild(newLinkElement)
    }

    private swapTheme(): void {
        this.localStorageService.saveItem('theme', this.localStorageService.getItem('theme') == 'light' ? 'dark' : 'light')
    }

    private updateVariables(): void {
        this.defaultTheme = this.localStorageService.getItem('theme') || this.defaultTheme
    }

    //#endregion

}
