import { Component, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmailLedgerVM } from '../../classes/view-models/email/email-ledger-vm'
import { HelperService } from '../../../../../shared/services/helper.service'
import { LedgerCriteriaDialogComponent } from '../criteria/ledger-criteria.component'
import { LedgerCriteriaVM } from '../../classes/view-models/criteria/ledger-criteria-vm'
import { LedgerHttpService } from '../../classes/services/ledger-http.service'
import { LedgerPdfCriteriaVM } from '../../classes/view-models/pdf/ledger-pdf-criteria-vm'
import { LedgerVM } from '../../classes/view-models/list/ledger-vm'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'

@Component({
    selector: 'ledger',
    templateUrl: './ledger-parent.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './ledger-parent.component.css']
})

export class LedgerParentBillingComponent {

    //#region variables

    @ViewChild('table') table: Table

    public criteria: LedgerCriteriaVM
    public feature = 'billingLedger'
    public featureIcon = 'ledgers'
    public icon = 'home'
    public parentUrl = '/home'
    public shipOwnerRecordsA: LedgerVM[] = []
    public shipOwnerRecordsB: LedgerVM[] = []
    public shipOwnerTotal: LedgerVM[] = []

    //#endregion

    constructor(private dateHelperService: DateHelperService, private dialogService: DialogService, private helperService: HelperService, private ledgerHttpService: LedgerHttpService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, public dialog: MatDialog, private interactionService: InteractionService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setTabTitle()
        this.subscribeToInteractionService()
        this.setListHeight()
    }

    //#endregion

    //#region public methods

    public getCriteria(): string {
        return this.criteria ? this.criteria.customer.description + ', ' + this.criteria.fromDate + ' - ' + this.criteria.toDate : ''
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDoSearchTasks(event: LedgerCriteriaVM): void {
        this.populateCriteria(event)
        this.loadRecordsForShipOwner(this.criteria, 'shipOwnerRecordsA', 1)
        this.loadRecordsForShipOwner(this.criteria, 'shipOwnerRecordsB', 2)
        this.loadRecordsForShipOwner(this.criteria, 'shipOwnerTotal', null)
    }

    public async onDoEmailTasks(): Promise<void> {
        const values = await Promise.all([this.buildPdfShipOwnerA(), this.buildPdfShipOwnerB()])
        const criteria: EmailLedgerVM = {
            customerId: this.criteria.customer.id,
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

    public onSelectedTabChange(): void {
        setTimeout(() => {
            document.getElementById('table-wrapper').style.height = document.getElementById('content').offsetHeight - 278 + 'px'
        }, 1000)
    }

    public onShowCriteriaDialog(): void {
        const dialogRef = this.dialog.open(LedgerCriteriaDialogComponent, {
            height: '36.0625rem',
            panelClass: 'dialog',
            width: '32rem',
        })
        dialogRef.afterClosed().subscribe(criteria => {
            if (criteria !== undefined) {
                this.buildCriteriaVM(criteria)
                this.loadRecordsForShipOwner(this.criteria, 'shipOwnerRecordsA', 1)
                this.loadRecordsForShipOwner(this.criteria, 'shipOwnerRecordsB', 2)
                this.loadRecordsForShipOwner(this.criteria, 'shipOwnerTotal', null)
            }
        })
    }


    //#endregion

    //#region private methods

    private buildCriteriaVM(event: LedgerCriteriaVM): void {
        this.criteria = {
            fromDate: event.fromDate,
            toDate: event.toDate,
            customer: event.customer
        }
    }

    private buildPdfShipOwnerA(): any {
        return new Promise((resolve) => {
            if (this.shipOwnerRecordsA.length > 3) {
                const criteria: LedgerPdfCriteriaVM = {
                    fromDate: this.criteria.fromDate,
                    toDate: this.criteria.toDate,
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

    private buildPdfShipOwnerB(): any {
        return new Promise((resolve) => {
            if (this.shipOwnerRecordsB.length > 3) {
                const criteria = {
                    fromDate: this.criteria.fromDate,
                    toDate: this.criteria.toDate,
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

    private loadRecordsForShipOwner(criteria: LedgerCriteriaVM, shipOwnerRecords, shipOwnerId): void {
        const x: LedgerPdfCriteriaVM = {
            fromDate: criteria.fromDate,
            toDate: criteria.toDate,
            shipOwnerId: shipOwnerId,
            customerId: criteria.customer.id
        }
        this.ledgerHttpService.get(x).subscribe(response => {
            this[shipOwnerRecords] = response
            this[shipOwnerRecords].forEach(record => {
                record.formattedDate = this.dateHelperService.formatISODateToLocale(record.date)
            })
        })
    }

    private populateCriteria(event: LedgerCriteriaVM): void {
        this.criteria = {
            fromDate: event.fromDate,
            toDate: event.toDate,
            customer: event.customer
        }
    }

    private setListHeight(): void {
        setTimeout(() => {
            document.getElementById('content').style.height = document.getElementById('list-wrapper').offsetHeight - 64 + 'px'
        }, 100)
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
        this.interactionService.emitDateRange.subscribe((response) => {
            if (response) {
                this.criteria.fromDate = this.dateHelperService.formatISODateToLocale(response.fromDate)
                this.criteria.toDate = this.dateHelperService.formatISODateToLocale(response.toDate)
            }
        })
    }


    //#endregion

}
