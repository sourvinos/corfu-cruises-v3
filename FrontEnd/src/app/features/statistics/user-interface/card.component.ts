import { Component, Input } from '@angular/core'
// Custom
import { StatisticsVM } from '../classes/view-models/statistics-vm'
import { environment } from 'src/environments/environment'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./statistics.component.css']
})

export class CardComponent {

    @Input() array: StatisticsVM[]
    @Input() feature: 'statistics'
    @Input() header: string

    constructor(private messageLabelService: MessageLabelService) { }

    public getIcon(feature: string): string {
        return environment.menuDropdownIconDirectory + this.header + '.svg'
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.header, id)
    }

}
