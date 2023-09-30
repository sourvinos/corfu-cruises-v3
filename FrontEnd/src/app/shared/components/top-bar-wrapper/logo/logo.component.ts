import { Component } from '@angular/core'
// Custom
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { LogoService } from 'src/app/features/reservations/classes/services/logo.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css']
})

export class LogoComponent {

    public feature = 'loginForm'

    constructor(private localStorageService: LocalStorageService, private logoService: LogoService, private messageLabelService: MessageLabelService) { }

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public doLogoTasks(color: string): any {
        this.updateTheme()
        this.setLogoVisibility()
        return this.getLogo(color)
    }

    //#endregion

    //#region private methods

    private getLogo(color: string): any {
        return '../../../../../assets/images/logos/' + this.logoService.getLogo(color) + '.svg'
    }

    private setLogoVisibility(): void {
        document.getElementById('dark').style.opacity = this.localStorageService.getItem('theme') == 'dark' ? '1' : '0'
        document.getElementById('light').style.opacity = this.localStorageService.getItem('theme') == 'light' ? '1' : '0'
    }

    private updateTheme(): void {
        if (this.localStorageService.getItem('theme') == '') {
            this.localStorageService.saveItem('theme', 'light')
        }
    }

    //#endregion

}
