import { Component, Input } from '@angular/core'
// Custom
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { StatisticsNationalitiesVM } from '../classes/view-models/statistics-nationalities-vm'
import { environment } from 'src/environments/environment'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'table-nationalities',
    templateUrl: './table-nationalities.component.html',
    styleUrls: ['./table-nationalities.component.css']
})

export class TableNationalitiesComponent {

    @Input() array: StatisticsNationalitiesVM[]

    public feature = 'statistics'

    constructor(private helperService: HelperService, private messageLabelService: MessageLabelService) { }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getNationalityIcon(nationalityCode: string): any {
        if (nationalityCode != undefined) {
            return environment.nationalitiesIconDirectory + nationalityCode.toLowerCase() + '.png'
        }
    }

    public getTableHeight(): string {
        return document.getElementById('content').clientHeight - 150 + 'px'
    }

    public formatNumberToLocale(value: number): any {
        return this.helperService.formatNumberToLocale(value)
    }

}
