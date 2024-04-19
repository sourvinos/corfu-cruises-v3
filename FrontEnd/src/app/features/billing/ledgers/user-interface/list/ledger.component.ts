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

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private helperService: HelperService, private ledgerHttpService: LedgerHttpService, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService) { }

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
        this.loadRecordsForShipOwner(event, 'shipOwnerRecordsA', 1)
        this.loadRecordsForShipOwner(event, 'shipOwnerRecordsB', 2)
        this.loadRecordsForShipOwner(event, 'shipOwnerTotal', null)
    }

    public onPrint(): void {
        // this.router.navigate([this.url + '/new'])
    }

    //#endregion

    //#region private methods

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
