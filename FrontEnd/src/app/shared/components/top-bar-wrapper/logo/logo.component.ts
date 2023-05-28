import { Component } from '@angular/core'
// Custom
import { LogoService } from 'src/app/features/reservations/classes/services/logo.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css']
})

export class LogoComponent {

    public feature = 'loginForm'

    constructor(private logoService: LogoService, private messageLabelService: MessageLabelService) { }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getLogo(): any {
        return this.logoService.getLogo()
    }

}
