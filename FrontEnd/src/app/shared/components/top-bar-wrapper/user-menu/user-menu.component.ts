import { Component, HostListener } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { Menu } from 'src/app/shared/classes/menu'
import { MessageMenuService } from '../../../services/message-menu.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['../../../../../assets/styles/custom/dropdown-menu.css']
})

export class UserMenuComponent {

    //#region variables

    public displayedUsername: string
    public imgIsLoaded = false
    public menuItems: Menu[] = []

    //#endregion

    constructor(private accountService: AccountService, private cryptoService: CryptoService, private interactionService: InteractionService, private messageMenuService: MessageMenuService, private router: Router, private sessionStorageService: SessionStorageService) { }

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
        if (feature.substring(5) == 'logout') {
            this.accountService.logout()
        } else {
            this.sessionStorageService.saveItem('returnUrl', '/')
            this.router.navigate(['/users/' + this.cryptoService.decrypt(this.sessionStorageService.getItem('userId'))])
        }
    }

    public getDisplayName(): any {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('displayName'))
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
            if (item.id.startsWith('user')) {
                this.menuItems.push(item)
            }
        })
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshMenus.subscribe(() => {
            this.messageMenuService.getMessages().then((response) => {
                this.menuItems = response
                this.createMenu(response)
            })
        })
    }

    //#endregion

}
