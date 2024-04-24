import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { LedgerHttpService } from '../../classes/services/ledger-http.service'
import { LedgerVM } from '../../classes/view-models/criteria/ledger-vm'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { EmailLedgerVM } from '../../classes/view-models/email/email-ledger-vm'

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

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private helperService: HelperService, private ledgerHttpService: LedgerHttpService, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setLocale()
        this.setTabTitle()
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

    public async onPrint(): Promise<void> {
        try {
            const values = await Promise.all([this.p1(), this.p2()])
            console.log('All promises fulfilled' + values)
            const criteria: EmailLedgerVM = {
                displayname: 'John',
                email: 'johnsourvinos@hotmail.com',
                subject: 'Λογιστικές καρτέλες',
                filenames: values
            }
            this.ledgerHttpService.emailLedger(criteria).subscribe((response) => {
                console.log(response)
            })
        } catch (e) {
            console.log('A promise rejected')
        }
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
            }
        })
    }

    private createPdfFiles(): Promise<any> {
        const files: string[] = []
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
                        console.log('1. ' + response)
                        files.push(response.body)
                        resolve(files)
                    }
                })
            }
            if (this.shipOwnerRecordsB.length > 3) {
                const criteria = {
                    fromDate: '2024-01-01',
                    toDate: '2024-12-31',
                    shipOwnerId: this.shipOwnerRecordsB[1].shipOwner.id,
                    customerId: this.shipOwnerRecordsB[1].customer.id
                }
                this.ledgerHttpService.buildPdf(criteria).subscribe({
                    next: (response) => {
                        console.log('2. ' + response)
                        files.push(response.body)
                        resolve(files)
                    }
                })
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

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    //#endregion

}
