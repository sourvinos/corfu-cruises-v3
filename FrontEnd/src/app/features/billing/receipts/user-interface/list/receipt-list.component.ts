import { Component, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MenuItem } from 'primeng/api'
import { Router } from '@angular/router'
import { Table } from 'primeng/table'
import { formatNumber } from '@angular/common'
// Custom
import { CriteriaDateRangeDialogComponent } from 'src/app/shared/components/criteria-date-range-dialog/criteria-date-range-dialog.component'
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmailReceiptVM } from '../../classes/view-models/email/email-receipt-vm'
import { EmojiService } from '../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../shared/services/interaction.service'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { ReceiptHttpService } from '../../classes/services/receipt-http.service'
import { ReceiptListCriteriaVM } from '../../classes/view-models/criteria/receipt-list-criteria-vm'
import { ReceiptListExportService } from '../../classes/services/receipt-list-export.service'
import { ReceiptListVM } from '../../classes/view-models/list/receipt-list-vm'
import { SessionStorageService } from '../../../../../shared/services/session-storage.service'

@Component({
    selector: 'receipt-list',
    templateUrl: './receipt-list.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './receipt-list.component.css']
})

export class ReceiptListComponent {

    //#region common

    @ViewChild('table') table: Table

    private criteria: ReceiptListCriteriaVM
    private url = 'receipts'
    private virtualElement: any
    public feature = 'receiptList'
    public featureIcon = 'receipts'
    public icon = 'home'
    public parentUrl = '/home'
    public records: ReceiptListVM[] = []
    public selectedRecords: ReceiptListVM[] = []
    public recordsFilteredCount = 0
    public recordsFiltered: ReceiptListVM[]

    //#endregion

    //#region dropdown filters

    public dropdownDates = []
    public dropdownCustomers = []
    public dropdownShipOwners = []
    public dropdownDestinations = []
    public dropdownDocumentTypes = []

    //#endregion

    //#region context menu

    public menuItems!: MenuItem[]
    public selectedRecord!: ReceiptListVM

    //#endregion

    constructor(private dateHelperService: DateHelperService, private dialogService: DialogService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private receiptHttpService: ReceiptHttpService, private receiptListExportService: ReceiptListExportService, private router: Router, private sessionStorageService: SessionStorageService, public dialog: MatDialog) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setTabTitle()
        this.subscribeToInteractionService()
        this.initContextMenu()
        this.getStoredCriteria()
        this.doSearchTasks()
    }

    //#endregion

    //#region public methods

    public editRecord(id: string): void {
        this.storeScrollTop()
        this.storeSelectedId(id)
        this.navigateToRecord(id)
    }

    public exportSelected(): void {
        if (this.isAnyRowSelected()) {
            this.receiptListExportService.exportToExcel(this.receiptListExportService.buildList(this.selectedRecords))
        }
    }

    public onFilter(event: any, column: string, matchMode: string): void {
        if (event) this.table.filter(event, column, matchMode)
    }

    public onFilterRecords(event: any): void {
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
        this.recordsFiltered = event.filteredValue
        this.recordsFilteredCount = event.filteredValue.length
    }

    public formatNumberToLocale(number: number, decimals = true): string {
        return formatNumber(number, this.localStorageService.getItem('language'), decimals ? '1.2' : '1.0')
    }

    public getCriteria(): string {
        return this.criteria ? this.criteria.fromDate + ' - ' + this.criteria.toDate : ''
    }

    public getEmoji(anything: any): string {
        return typeof anything == 'string'
            ? this.emojiService.getEmoji(anything)
            : anything ? this.emojiService.getEmoji('green-box') : this.emojiService.getEmoji('red-box')
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onHighlightRow(id: any): void {
        this.helperService.highlightRow(id)
    }

    public onNewRecord(): void {
        this.router.navigate([this.url + '/new'])
    }

    public onShowCriteriaDialog(): void {
        const dialogRef = this.dialog.open(CriteriaDateRangeDialogComponent, {
            data: 'receiptListCriteria',
            height: '36.0625rem',
            panelClass: 'dialog',
            width: '32rem',
        })
        dialogRef.afterClosed().subscribe(criteria => {
            if (criteria !== undefined) {
                this.loadRecords().then(() => {
                    this.buildCriteriaVM(criteria)
                    this.clearTable()
                    this.resetTableFilters()
                    this.deleteStoredFilters()
                    this.doSearchTasks()
                })
            }
        })
    }

    public processSelectedRecords(): void {
        if (this.isAnyRowSelected()) {
            if (this.selectedRowsAreSameCustomer()) {
                const ids = []
                this.selectedRecords.forEach(record => {
                    ids.push(record.invoiceId)
                })
                this.receiptHttpService.buildPdf(ids).subscribe({
                    next: (response) => {
                        const criteria: EmailReceiptVM = {
                            customerId: this.selectedRecords[0].customer.id,
                            filenames: response.body
                        }
                        this.emailReceipts(criteria)
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        }
    }

    public resetTableFilters(): void {
        this.table != undefined ? this.helperService.clearTableTextFilters(this.table, ['invoiceNo', 'grossAmount']) : null
    }

    //#endregion

    //#region private methods

    private addSelectedRecordToSelectedRecords(record: ReceiptListVM): void {
        this.selectedRecords = []
        this.selectedRecords.push(record)
    }

    private buildCriteriaVM(event: ReceiptListCriteriaVM): void {
        this.criteria = {
            fromDate: event.fromDate,
            toDate: event.toDate
        }
    }

    private clearSelectedRecords(): void {
        this.selectedRecords = []
    }

    private clearTable(): void {
        this.table != undefined ? this.table.clear() : null
    }

    private createDateObjects(): void {
        this.records.forEach(record => {
            record.date = {
                id: this.dateHelperService.convertIsoDateToUnixTime(record.date.toString()),
                description: this.formatDateToLocale(record.date.toString()),
                isActive: true
            }
        })
    }

    private deleteStoredFilters(): void {
        this.sessionStorageService.deleteItems([{ 'item': 'receiptList-filters', 'when': 'always' }])
    }

    private doSearchTasks(): void {
        this.loadRecords().then(() => {
            this.createDateObjects()
            this.initFilteredRecordsCount()
            this.filterTableFromStoredFilters()
            this.populateDropdownFilters()
            this.doVirtualTableTasks()
            this.clearSelectedRecords()
        })
    }

    private doVirtualTableTasks(): void {
        setTimeout(() => {
            this.getVirtualElement()
            this.scrollToSavedPosition()
            this.hightlightSavedRow()
        }, 1000)
    }

    private emailReceipts(criteria: EmailReceiptVM): void {
        this.receiptHttpService.emailReceipts(criteria).subscribe({
            complete: () => {
                this.receiptHttpService.patchReceiptWithEmailSent(this.removeExtensionsFromFileNames(criteria.filenames)).subscribe({
                    next: () => {
                        this.doSearchTasks()
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, false)
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

    private filterColumn(element: { value: any }, field: string, matchMode: string): void {
        if (element != undefined && (element.value != null || element.value != undefined)) {
            this.table.filter(element.value, field, matchMode)
        }
    }

    private filterTableFromStoredFilters(): void {
        const filters = this.sessionStorageService.getFilters(this.feature + '-' + 'filters')
        if (filters != undefined) {
            setTimeout(() => {
                this.filterColumn(filters.customer, 'customer', 'in')
                this.filterColumn(filters.documentType, 'documentType', 'in')
            }, 500)
        }
    }

    private formatDateToLocale(date: string): string {
        return this.dateHelperService.formatISODateToLocale(date)
    }

    private getVirtualElement(): void {
        this.virtualElement = document.getElementsByClassName('p-scroller-inline')[0]
    }

    private getStoredCriteria(): void {
        const storedCriteria: any = this.sessionStorageService.getItem('receiptListCriteria') ? JSON.parse(this.sessionStorageService.getItem('receiptListCriteria')) : ''
        if (storedCriteria) {
            this.criteria = {
                fromDate: this.dateHelperService.formatISODateToLocale(storedCriteria.fromDate),
                toDate: this.dateHelperService.formatISODateToLocale(storedCriteria.toDate)
            }
        } else {
            this.criteria = {
                fromDate: this.dateHelperService.formatISODateToLocale(this.dateHelperService.formatDateToIso(new Date())),
                toDate: this.dateHelperService.formatISODateToLocale(this.dateHelperService.formatDateToIso(new Date()))
            }
        }
    }

    private hightlightSavedRow(): void {
        this.helperService.highlightSavedRow(this.feature)
    }

    private initContextMenu(): void {
        this.menuItems = [
            { label: 'Επεξεργασία', command: () => this.editRecord(this.selectedRecord.invoiceId.toString()) },
            {
                label: 'Αποστολή με email', command: (): void => {
                    this.addSelectedRecordToSelectedRecords(this.selectedRecord)
                    this.processSelectedRecords()
                }
            }
        ]
    }

    private initFilteredRecordsCount(): void {
        this.recordsFilteredCount = this.records.length
    }

    private isAnyRowSelected(): boolean {
        if (this.selectedRecords.length == 0) {
            this.dialogService.open(this.messageDialogService.noRecordsSelected(), 'error', ['ok'])
            return false
        }
        return true
    }

    private loadRecords(): Promise<ReceiptListVM[]> {
        return new Promise((resolve) => {
            this.receiptHttpService.getForList(this.criteria).subscribe(response => {
                this.records = response
                resolve(this.records)
            })
        })
    }

    private navigateToRecord(id: any): void {
        this.router.navigate([this.url, id])
    }

    private populateDropdownFilters(): void {
        this.dropdownDates = this.helperService.getDistinctRecords(this.records, 'date', 'description')
        this.dropdownCustomers = this.helperService.getDistinctRecords(this.records, 'customer', 'description')
        this.dropdownDocumentTypes = this.helperService.getDistinctRecords(this.records, 'documentType', 'description')
        this.dropdownShipOwners = this.helperService.getDistinctRecords(this.records, 'shipOwner', 'description')
    }

    private removeExtensionsFromFileNames(filenames: string[]): string[] {
        const x = []
        filenames.forEach(filename => {
            x.push(filename.substring(0, filename.length - 4))
        })
        return x
    }

    private scrollToSavedPosition(): void {
        this.helperService.scrollToSavedPosition(this.virtualElement, this.feature)
    }

    private selectedRowsAreSameCustomer(): boolean {
        const z = this.selectedRecords[0].customer.id
        const x = this.selectedRecords.filter(x => x.customer.id == z)
        if (x.length != this.selectedRecords.length) {
            this.dialogService.open(this.messageDialogService.selectedRowsAreSameCustomer(), 'error', ['ok'])
            return false
        }
        return true
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    private storeSelectedId(id: string): void {
        this.sessionStorageService.saveItem(this.feature + '-id', id.toString())
    }

    private storeScrollTop(): void {
        this.sessionStorageService.saveItem(this.feature + '-scrollTop', this.virtualElement.scrollTop)
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
