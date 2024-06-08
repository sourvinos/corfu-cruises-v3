import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { MatDialog } from '@angular/material/dialog'
import { MenuItem } from 'primeng/api'
import { Router } from '@angular/router'
import { Table } from 'primeng/table'
import { formatNumber } from '@angular/common'
// Custom
import { CriteriaDateRangeDialogComponent } from './../../../../../shared/components/criteria-date-range-dialog/criteria-date-range-dialog.component'
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { DialogService } from '../../../../../shared/services/modal-dialog.service'
import { EmailInvoiceVM } from '../../classes/view-models/email/email-invoice-vm'
import { EmojiService } from '../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../shared/services/interaction.service'
import { InvoiceHttpDataService } from '../../classes/services/invoice-http-data.service'
import { InvoiceHttpPdfService } from '../../classes/services/invoice-http-pdf.service'
import { InvoiceListCriteriaVM } from './../../classes/view-models/criteria/invoice-list-criteria-vm'
import { InvoiceListVM } from '../../classes/view-models/list/invoice-list-vm'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageDialogService } from '../../../../../shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { SessionStorageService } from '../../../../../shared/services/session-storage.service'

@Component({
    selector: 'invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './invoice-list.component.css']
})

export class InvoiceListComponent {

    //#region variables

    @ViewChild('table') table: Table

    private criteria: InvoiceListCriteriaVM
    private url = 'invoices'
    private virtualElement: any
    public feature = 'invoiceList'
    public featureIcon = 'invoices'
    public icon = 'home'
    public parentUrl = '/home'
    public records: InvoiceListVM[] = []
    public selectedRecords: InvoiceListVM[] = []
    public recordsFilteredCount = 0
    public filterDate = ''
    public recordsFiltered: InvoiceListVM[]

    //#endregion

    //#region dropdown filters

    public dropdownDates = []
    public dropdownCustomers = []
    public dropdownDestinations = []
    public dropdownDocumentTypes = []
    public dropdownShipOwners = []
    public dropdownShips = []

    //#endregion

    //#region context menu

    public menuItems!: MenuItem[]
    public selectedRecord!: InvoiceListVM

    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dialogService: DialogService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private invoiceHttpPdfService: InvoiceHttpPdfService, private invoiceHttpService: InvoiceHttpDataService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService, public dialog: MatDialog) { }

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

    public clearDateFilter(): void {
        this.table.filter('', 'date', 'equals')
        this.filterDate = ''
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
    }

    public editRecord(id: string): void {
        this.storeScrollTop()
        this.storeSelectedId(id)
        this.navigateToRecord(id)
    }

    public filterByDate(event: MatDatepickerInputEvent<Date>): void {
        const date = this.dateHelperService.formatDateToIso(new Date(event.value), false)
        this.table.filter(date, 'date', 'equals')
        this.filterDate = date
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
    }

    public filterRecords(event: any): void {
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

    public hasDateFilter(): string {
        return this.filterDate == '' ? 'hidden' : ''
    }

    public onHighlightRow(id: any): void {
        this.helperService.highlightRow(id)
    }

    public onNewRecord(): void {
        this.router.navigate([this.url + '/new'])
    }

    public buildAndEmailSelectedRecords(): void {
        if (this.isAnyRowSelected()) {
            if (this.selectedRowsAreSameCustomer()) {
                const ids = []
                this.selectedRecords.forEach(record => {
                    ids.push(record.invoiceId)
                })
                this.invoiceHttpPdfService.buildPdf(ids).subscribe({
                    next: (response) => {
                        const criteria: EmailInvoiceVM = {
                            customerId: this.selectedRecords[0].customer.id,
                            filenames: response.body
                        }
                        this.emailInvoices(criteria)
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        }
    }

    public buildAndOpenSelectedRecords(): void {
        if (this.isAnyRowSelected()) {
            if (this.selectedRowsAreSameCustomer()) {
                const ids = []
                this.selectedRecords.forEach(record => {
                    ids.push(record.invoiceId)
                })
                this.invoiceHttpPdfService.buildPdf(ids).subscribe({
                    next: () => {
                        ids.forEach(id => {
                            this.invoiceHttpPdfService.openPdf(id + '.pdf').subscribe({
                                next: (response) => {
                                    const blob = new Blob([response], { type: 'application/pdf' })
                                    const fileURL = URL.createObjectURL(blob)
                                    window.open(fileURL, '_blank')
                                },
                                error: (errorFromInterceptor) => {
                                    this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                                }
                            })
                        })
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        }
    }

    public resetTableFilters(): void {
        this.helperService.clearTableTextFilters(this.table, [''])
    }

    public onShowCriteriaDialog(): void {
        const dialogRef = this.dialog.open(CriteriaDateRangeDialogComponent, {
            data: 'invoiceListCriteria',
            height: '36.0625rem',
            panelClass: 'dialog',
            width: '32rem',
        })
        dialogRef.afterClosed().subscribe(criteria => {
            if (criteria !== undefined) {
                this.buildCriteriaVM(criteria)
                this.doSearchTasks()
            }
        })
    }

    //#endregion

    //#region private methods

    private addSelectedRecordToSelectedRecords(record: InvoiceListVM): void {
        this.selectedRecords = []
        this.selectedRecords.push(record)
    }

    private buildCriteriaVM(event: InvoiceListCriteriaVM): void {
        this.criteria = {
            fromDate: event.fromDate,
            toDate: event.toDate
        }
    }

    private doSearchTasks(): void {
        this.loadRecords().then(() => {
            this.flattenNestedObjects()
            this.filterTableFromStoredFilters()
            this.populateDropdownFilters()
            this.formatDatesToLocale()
            this.doVirtualTableTasks()
        })
    }

    private doVirtualTableTasks(): void {
        setTimeout(() => {
            this.getVirtualElement()
            this.scrollToSavedPosition()
            this.hightlightSavedRow()
        }, 1000)
    }

    private emailInvoices(criteria: EmailInvoiceVM): void {
        this.invoiceHttpService.emailInvoices(criteria).subscribe({
            complete: () => {
                this.invoiceHttpService.patchInvoicesWithEmailSent(this.removeExtensionsFromFileNames(criteria.filenames)).subscribe({
                    next: () => {
                        this.loadRecords().then(() => {
                            this.filterTableFromStoredFilters()
                            this.populateDropdownFilters()
                            this.formatDatesToLocale()
                        })
                        this.selectedRecords = []
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

    private filterColumn(element: any, field: string, matchMode: string): void {
        if (element != undefined && (element.value != null || element.value != undefined)) {
            this.table.filter(element.value, field, matchMode)
        }
    }

    private filterTableFromStoredFilters(): void {
        const filters = this.sessionStorageService.getFilters(this.feature + '-' + 'filters')
        if (filters != undefined) {
            setTimeout(() => {
                this.filterDate = filters.date ? filters.date.value : ''
                this.filterColumn(filters.date, 'date', 'equals')
                this.filterColumn(filters.customer, 'customer', 'in')
                this.filterColumn(filters.destination, 'destination', 'in')
                this.filterColumn(filters.ship, 'ship', 'in')
                this.filterColumn(filters.shipOwner, 'shipOwner', 'in')
                this.filterColumn(filters.documentType, 'documentType', 'in')
                this.filterColumn(filters.batch, 'batch', 'contains')
                this.filterColumn(filters.invoiceNo, 'invoiceNo', 'contains')
                this.filterColumn(filters.grossAmount, 'grossAmount', 'contains')
            }, 500)
        }
    }

    private flattenNestedObjects(): void {
        this.records.forEach(record => {
            record.batch = record.documentType.batch
        })
    }

    private formatDatesToLocale(): void {
        this.records.forEach(record => {
            record.formattedDate = this.dateHelperService.formatISODateToLocale(record.date)
        })
    }

    private getStoredCriteria(): void {
        const storedCriteria: any = this.sessionStorageService.getItem('invoiceListCriteria') ? JSON.parse(this.sessionStorageService.getItem('invoiceListCriteria')) : ''
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

    private getVirtualElement(): void {
        this.virtualElement = document.getElementsByClassName('p-scroller-inline')[0]
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
                    this.buildAndEmailSelectedRecords()
                }
            }
        ]
    }

    private isAnyRowSelected(): boolean {
        if (this.selectedRecords.length == 0) {
            this.dialogService.open(this.messageDialogService.noRecordsSelected(), 'error', ['ok'])
            return false
        }
        return true
    }

    private loadRecords(): Promise<InvoiceListVM[]> {
        return new Promise((resolve) => {
            this.invoiceHttpService.getForList(this.criteria).subscribe(response => {
                this.records = response
                resolve(this.records)
            })
        })
    }

    private navigateToRecord(id: any): void {
        this.router.navigate([this.url, id])
    }

    private populateDropdownFilters(): void {
        this.dropdownDates = this.getDistinctDates(this.records, 'date', 'date')
        this.dropdownCustomers = this.helperService.getDistinctRecords(this.records, 'customer', 'description')
        this.dropdownDestinations = this.helperService.getDistinctRecords(this.records, 'destination', 'description')
        this.dropdownDocumentTypes = this.helperService.getDistinctRecords(this.records, 'documentType', 'description')
        this.dropdownShipOwners = this.helperService.getDistinctRecords(this.records, 'shipOwner', 'description')
        this.dropdownShips = this.helperService.getDistinctRecords(this.records, 'ship', 'description')
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

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
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
        this.interactionService.refreshDateAdapter.subscribe(() => {
            this.setLocale()
            this.formatDatesToLocale()
        })
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

    private getDistinctDates(records: any[], object: string, orderField: string): any[] {
        const distinctRecords = (Object.values(records.reduce(function (x, item) {
            if (!x[item[object]]) {
                x[item[object]] = item[object]
            }
            return x
        }, {})))
        distinctRecords.sort((a, b) => (a[orderField] > b[orderField]) ? 1 : -1)
        return distinctRecords
    }

}
