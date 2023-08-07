import { Component, HostListener } from '@angular/core'
import { Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { Menu } from 'src/app/shared/classes/menu'
import { MessageMenuService } from 'src/app/shared/services/message-menu.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'parameters-menu',
    templateUrl: './parameters-menu.component.html'
})

export class ParametersMenuComponent {

    //#region variables

    private ngunsubscribe = new Subject<void>()
    public imgIsLoaded = false
    public menuItems: Menu[] = []

    //#endregion

    constructor(private cryptoService: CryptoService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageMenuService: MessageMenuService, private router: Router, private sessionStorageService: SessionStorageService) { }
    //#region listeners

    @HostListener('mouseenter') onMouseEnter(): void {
        document.querySelectorAll('.sub-menu').forEach((item) => {
            item.classList.remove('hidden')
        })
    }

    //#endregion

    //#region lifecycle hooks

    ngOnInit(): void {
        this.messageMenuService.getMessages().then((response) => {
            this.createMenu(response)
            this.subscribeToInteractionService()
        })
    }

    //#endregion

    //#region public methods

    public doNavigationTasks(feature: string): void {
        this.router.navigate([feature.substring(11)])
    }

    public getMenuTopIcon(filename: string): string {
        return environment.menuTopIconDirectory + filename + '.svg'
    }

    public getMenuDropdownIcon(filename: string): string {
        return environment.menuDropdownIconDirectory + filename + '.svg'
    }

    public hideMenu(): void {
        document.querySelectorAll('.sub-menu').forEach((item) => {
            item.classList.add('hidden')
        })
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public loadImage(): void {
        this.imgIsLoaded = true
    }

    //#endregion

    //#region private methods

    private createMenu(items: Menu[]): void {
        this.menuItems = []
        items.forEach(item => {
            if (item.id.startsWith('parameters')) {
                this.menuItems.push(item)
            }
        })
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshMenus.pipe(takeUntil(this.ngunsubscribe)).subscribe(() => {
            this.messageMenuService.getMessages().then((response) => {
                this.menuItems = response
                this.createMenu(response)
            })
        })
    }

    //#endregion

}
