import { Component, Input } from '@angular/core'
// Custom
import { StatisticsVM } from '../classes/view-models/statistics-vm'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { StatisticsNationalitiesVM } from '../classes/view-models/statistics-nationalities-vm'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent {

    @Input() array: StatisticsVM[] | StatisticsNationalitiesVM[]

    public feature = 'statistics'

    constructor(private helperService: HelperService, private messageLabelService: MessageLabelService) { }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getTableHeight(): string {
        return document.getElementById('content').clientHeight - 150 + 'px'
    }

    public formatNumberToLocale(value: number): any {
        return this.helperService.formatNumberToLocale(value)
    }

}
