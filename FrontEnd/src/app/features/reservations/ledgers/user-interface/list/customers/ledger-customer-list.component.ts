import { ActivatedRoute, Router } from '@angular/router'
import { Component, QueryList, ViewChildren } from '@angular/core'
import { MatExpansionPanel } from '@angular/material/expansion'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LedgerCriteriaVM } from '../../../classes/view-models/criteria/ledger-criteria-vm'
import { LedgerPDFService } from '../../../classes/services/ledger-pdf.service'
import { LedgerVM } from '../../../classes/view-models/list/ledger-vm'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { MatDialog } from '@angular/material/dialog'
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component'
import { environment } from 'src/environments/environment'
import { LedgerReservationVM } from '../../../classes/view-models/list/ledger-reservation-vm'

@Component({
    selector: 'ledger-customer-list',
    templateUrl: './ledger-customer-list.component.html',
    styleUrls: ['../../../../../../../assets/styles/custom/lists.css', './ledger-customer-list.component.css']
})

export class LedgerCustomerListComponent {

    //#region common

    @ViewChildren(MatExpansionPanel) panels: QueryList<MatExpansionPanel>

    public feature = 'ledgerList'
    public featureIcon = 'ledgers'
    public icon = 'arrow_back'
    public parentUrl = '/reservation-ledgers'
    public records: LedgerVM[] = []
    public criteriaPanels: LedgerCriteriaVM

    //#endregion

    //#region specific

    public remarksRowVisibility: boolean
    private selectedRecords: LedgerReservationVM[]
    private totalsPerPort: any[]

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dateHelperService: DateHelperService, private dialogService: DialogService, private helperService: HelperService, private interactionService: InteractionService, private ledgerPdfService: LedgerPDFService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService, public dialog: MatDialog) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords()
        this.subscribeToInteractionService()
        this.setTabTitle()
        this.populateCriteriaPanelsFromStorage()
        this.updateVariables()
        this.updateAccordionHeight()
    }

    //#endregion

    //#region public methods

    public isProduction(): boolean {
        return environment.production
    }

    public updateSelectedRecords(emittedObject: LedgerReservationVM[]): void {
        this.selectedRecords = emittedObject
        console.log('exported', emittedObject)
    }

    public collapseAll(): void {
        this.helperService.toggleExpansionPanel(this.panels, false)
    }

    public doBillingTasks(): void {
        if (this.isAnyRecordSelected()) {
            this.dialog.open(InvoiceDialogComponent, {
                data: this.selectedRecords,
                panelClass: 'dialog',
                height: '827px',
                width: '1180px'
            })
        }
    }

    public exportSelected(customer: LedgerVM): void {
        this.ledgerPdfService.doReportTasks(this.records.filter(x => x.customer.id == customer.customer.id), this.criteriaPanels)
    }

    public expandAll(): void {
        this.helperService.toggleExpansionPanel(this.panels, true)
    }

    public exportAll(): void {
        this.ledgerPdfService.doReportTasks(this.records, this.criteriaPanels)
    }

    public formatDateToLocale(date: string, showWeekday = false, showYear = false): string {
        return this.dateHelperService.formatISODateToLocale(date, showWeekday, showYear)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getRemarksRowVisibility(): boolean {
        return this.remarksRowVisibility
    }

    public goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    public toggleRemarksRowVisibility(): void {
        this.sessionStorageService.saveItem('remarksRowVisibility', this.remarksRowVisibility ? '1' : '0')
    }

    //#endregion

    //#region private methods

    private isAnyRecordSelected(): boolean {
        if (this.selectedRecords == undefined || this.selectedRecords.length == 0) {
            this.dialogService.open(this.messageDialogService.noRecordsSelected(), 'error', ['ok'])
            return false
        }
        return true
    }

    private areSelectedRecordsSameShip(): any {
        const x = this.selectedRecords[0].ship
        for (let index = 0; index < this.selectedRecords.length; index++) {
            if (x != this.selectedRecords[index].ship) {
                this.dialogService.open(this.messageDialogService.selectedReservationsMustBeSameShip(), 'error', ['ok']).subscribe(() => {
                    console.log('error')
                    return false
                })
            }
        }
        console.log('out')
        return true
        // this.selectedRecords.forEach(record => {
        //     if (x != record.ship) {
        //         this.dialogService.open(this.messageDialogService.selectedReservationsMustBeSameShip(), 'error', ['ok']).subscribe(() => {
        //             console.log('error')
        //             return false
        //         })
        //     }
        // })
        // console.log('out')
    }

    private loadRecords(): Promise<any> {
        return new Promise((resolve) => {
            const listResolved = this.activatedRoute.snapshot.data[this.feature]
            if (listResolved.error === null) {
                this.records = Object.assign([], listResolved.result)
                resolve(this.records)
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
        })
    }

    private populateCriteriaPanelsFromStorage(): void {
        if (this.sessionStorageService.getItem('ledger-criteria')) {
            this.criteriaPanels = JSON.parse(this.sessionStorageService.getItem('ledger-criteria'))
        }
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
    }

    private updateVariables(): void {
        this.remarksRowVisibility = this.sessionStorageService.getItem('remarksRowVisibility') != '' ? (this.sessionStorageService.getItem('remarksRowVisibility') == '1' ? true : false) : false
    }

    private updateAccordionHeight(): void {
        document.getElementById('accordion-wrapper').style.height = document.getElementById('content').offsetHeight - 100 + 'px'
    }

    //#endregion

}
