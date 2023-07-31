import { Component, EventEmitter, Input, Output } from '@angular/core'
// Custom
import { environment } from 'src/environments/environment'

@Component({
    selector: 'table-total-filtered-records',
    templateUrl: './table-total-filtered-records.component.html'
})

export class TableTotalFilteredRecordsComponent {

    @Input() recordCount: number
    @Input() filteredRecordCount: number
    @Input() showFilteredCount = true

    @Output() public resetTableFilters = new EventEmitter()

    public getIcon(filename: string): string {
        return environment.criteriaIconDirectory + filename + '.svg'
    }

    public mustResetTableFilters(): void {
        this.resetTableFilters.emit()
    }

}
