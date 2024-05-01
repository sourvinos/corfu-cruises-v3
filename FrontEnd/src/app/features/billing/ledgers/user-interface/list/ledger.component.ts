import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmailLedgerVM } from '../../classes/view-models/email/email-ledger-vm'
import { HelperService } from '../../../../../shared/services/helper.service'
import { LedgerHttpService } from '../../classes/services/ledger-http.service'
import { LedgerVM } from '../../classes/view-models/criteria/ledger-vm'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'ledger',
    templateUrl: './ledger.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './ledger.component.css']
})

export class LedgerBillingComponent {

    //#region common

    @ViewChild('table') table: Table

    public feature = 'billingLedger'
    public featureIcon = 'ledgers'
    public icon = 'home'
    public parentUrl = '/home'
    public shipOwnerRecordsA: LedgerVM[] = []
    public shipOwnerRecordsB: LedgerVM[] = []
    public shipOwnerTotal: LedgerVM[] = []

    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dialogService: DialogService, private helperService: HelperService, private ledgerHttpService: LedgerHttpService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setLocale()
        this.setTabTitle()
        this.setListHeight()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDoSearchTasks(event: any): void {
        this.sessionStorageService.saveItem('ledgerCriteria', JSON.stringify(event))
        this.loadRecordsForShipOwner(event, 'shipOwnerRecordsA', 1)
        this.loadRecordsForShipOwner(event, 'shipOwnerRecordsB', 2)
        this.loadRecordsForShipOwner(event, 'shipOwnerTotal', null)
    }

    public async onDoEmailTasks(): Promise<void> {
        const values = await Promise.all([this.p1(), this.p2()])
        const x = JSON.parse(this.sessionStorageService.getItem('ledgerCriteria'))
        const criteria: EmailLedgerVM = {
            customerId: x.customer.id,
            filenames: values.filter(x => x != null)
        }
        this.ledgerHttpService.emailLedger(criteria).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, false)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    //#endregion

    //#region private methods

    private p1(): any {
        return new Promise((resolve) => {
            if (this.shipOwnerRecordsA.length > 3) {
                const criteria = {
                    fromDate: '2024-01-01',
                    toDate: '2024-12-31',
                    shipOwnerId: this.shipOwnerRecordsA[1].shipOwner.id,
                    customerId: this.shipOwnerRecordsA[1].customer.id
                }
                this.ledgerHttpService.buildPdf(criteria).subscribe({
                    next: (response) => {
                        resolve(response.body)
                    }
                })
            } else {
                resolve(null)
            }
        })
    }

    private p2(): any {
        return new Promise((resolve) => {
            if (this.shipOwnerRecordsB.length > 3) {
                const criteria = {
                    fromDate: '2024-01-01',
                    toDate: '2024-12-31',
                    shipOwnerId: this.shipOwnerRecordsB[1].shipOwner.id,
                    customerId: this.shipOwnerRecordsB[1].customer.id
                }
                this.ledgerHttpService.buildPdf(criteria).subscribe({
                    next: (response) => {
                        resolve(response.body)
                    }
                })
            } else {
                resolve(null)
            }
        })
    }

    private loadRecordsForShipOwner(event, shipOwnerRecords, shipOwnerId): void {
        const criteria = {
            fromDate: event.fromDate,
            toDate: event.toDate,
            shipOwnerId: shipOwnerId,
            customerId: event.customer.id
        }
        this.ledgerHttpService.get(criteria).subscribe(response => {
            this[shipOwnerRecords] = response
            this[shipOwnerRecords].forEach(record => {
                record.formattedDate = this.dateHelperService.formatISODateToLocale(record.date)
            })
        })
    }

    private setListHeight(): void {
        setTimeout(() => {
            document.getElementById('content').style.height = document.getElementById('list-wrapper').offsetHeight - 64 + 'px'
        }, 100)
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    //#endregion

}
