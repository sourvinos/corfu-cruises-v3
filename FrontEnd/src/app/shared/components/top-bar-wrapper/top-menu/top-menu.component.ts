import { Component } from '@angular/core'
// Custom
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})

export class TopMenuComponent {

    constructor(private sessionStorageService: SessionStorageService) { }

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

}
