import { formatNumber } from '@angular/common'
import { Component, Input, ViewChild } from '@angular/core'
import { Table } from 'primeng/table'
// Custom
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { LedgerHttpService } from '../../classes/services/ledger-http.service'
import { LedgerVM } from '../../classes/view-models/list/ledger-vm'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { LedgerCriteriaVM } from '../../classes/view-models/criteria/ledger-criteria-vm'

@Component({
    selector: 'ledgerShipOwnerTable',
    templateUrl: './ledger-shipOwner-table.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './ledger-parent.component.css', './ledger-shipOwner-table.component.css']
})

export class LedgerShipOwnerTableComponent {

    //#region variables

    @ViewChild('table') table: Table
    @Input() records: LedgerVM[] = []
    @Input() criteria: LedgerCriteriaVM

    public feature = 'billingLedger'

    //#endregion

    constructor(private dialogService: DialogService, private ledgerHttpService: LedgerHttpService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService) { }

    ngOnInit(): void {
        setTimeout(() => {
            document.getElementById('table-wrapper').style.height = document.getElementById('content').offsetHeight - 278 + 'px'
        }, 1000)
    }

    //#region public methods

    public formatNumberToLocale(number: number, decimals = true): string {
        return formatNumber(number, this.localStorageService.getItem('language'), decimals ? '1.2' : '1.0')
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public async onDoPrintTasks(): Promise<void> {
        const criteria = {
            fromDate: this.criteria.fromDate,
            toDate: this.criteria.toDate,
            shipOwnerId: this.records[1].shipOwner.id,
            customerId: this.criteria.customer.id
        }
        this.ledgerHttpService.buildPdf(criteria).subscribe({
            next: (response) => {
                this.ledgerHttpService.openPdf(response.body).subscribe({
                    next: (response) => {
                        const blob = new Blob([response], { type: 'application/pdf' })
                        const fileURL = URL.createObjectURL(blob)
                        window.open(fileURL, '_blank')
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    //#endregion

}
