import { Component, Input } from '@angular/core'
// Custom
import { StatisticsVM } from '../classes/view-models/statistics-vm'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent {

    @Input() array: StatisticsVM[]

    public feature = 'statistics'

    constructor(private messageLabelService: MessageLabelService) { }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getTableHeight(): string {
        return document.getElementById('content').clientHeight - 150 + 'px'
    }

}
