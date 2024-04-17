import { formatNumber } from '@angular/common'
import { Component, Input, ViewChild } from '@angular/core'
import { Table } from 'primeng/table'
// Custom
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { LedgerVM } from '../../classes/view-models/criteria/ledger-vm'

@Component({
    selector: 'ledgerShipOwnerTable',
    templateUrl: './ledger-shipOwner-table.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './ledger.component.css']
})

export class LedgerShipOwnerTableComponent {

    @Input() records: LedgerVM[] = []
    
    @ViewChild('table') table: Table

    public feature = 'billingLedger'

    constructor(private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService) { }

    public formatNumberToLocale(number: number, decimals = true): string {
        return formatNumber(number, this.localStorageService.getItem('language'), decimals ? '1.2' : '1.0')
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

}
