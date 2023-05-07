import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { ConnectedUser } from 'src/app/shared/classes/connected-user'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'settings-menu',
    templateUrl: './settings-menu.component.html',
    styleUrls: ['../../../../../assets/styles/dropdown-menu.css']
})

export class SettingsMenuComponent {

    //#region variables

    public imgIsLoaded = false
    public loginStatus: Observable<boolean>

    //#endregion

    constructor(private accountService: AccountService, private router: Router) { }

    ngDoCheck(): void {
        this.updateVariables()
    }

    //#endregion

    //#region public methods

    public doNavigationTasks(): void {
        this.router.navigate(['/settings'])
    }

    public getIcon(filename: string): string {
        return environment.menuIconDirectory + filename + '.svg'
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public isAdmin(): boolean {
        return ConnectedUser.isAdmin
    }

    public loadImage(): void {
        this.imgIsLoaded = true
    }

    //#endregion

    //#region private methods

    // private createMenu(items: Menu[]): void {
    //     this.menuItems = []
    //     items.sort((a, b) => (a.description < b.description) ? -1 : 1)
    //     items.forEach(item => {
    //         if (item.id.startsWith('tables')) {
    //             this.menuItems.push(item)
    //         }
    //     })
    // }

    // private subscribeToInteractionService(): void {
    //     this.interactionService.refreshMenus.pipe(takeUntil(this.ngunsubscribe)).subscribe(() => {
    //         this.messageMenuService.getMessages().then((response) => {
    //             this.menuItems = response
    //             this.createMenu(response)
    //         })
    //     })
    // }

    private updateVariables(): void {
        this.loginStatus = this.accountService.isLoggedIn
    }

    //#endregion

}
