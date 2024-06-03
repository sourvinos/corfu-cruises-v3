import { formatNumber } from '@angular/common'
import { Component, Input, ViewChild } from '@angular/core'
import { Table } from 'primeng/table'
// Custom
import { BalanceSheetCriteriaVM } from '../../classes/criteria/balanceSheet-criteria-vm'
import { BalanceSheetVM } from '../../classes/list/balanceSheet-vm'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'balanceSheetShipOwnerTable',
    templateUrl: './balanceSheet-shipOwner-table.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css']
})

export class BalanceSheetShipOwnerTableComponent {

    //#region variables

    @ViewChild('table') table: Table
    @Input() records: BalanceSheetVM[]
    @Input() criteria: BalanceSheetCriteriaVM

    public feature = 'balanceSheet'

    //#endregion

    constructor(private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        setTimeout(() => {
            const x = document.getElementsByClassName('table-wrapper') as HTMLCollectionOf<HTMLInputElement>
            for (let i = 0; i < x.length; i++) {
                x[i].style.height = document.getElementById('content').offsetHeight - 150 + 'px'
            }
        }, 100)
    }

    //#endregion

    //#region public methods

    public formatNumberToLocale(number: number, decimals = true): string {
        return formatNumber(number, this.localStorageService.getItem('language'), decimals ? '1.2' : '1.0')
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    //#endregion

}
