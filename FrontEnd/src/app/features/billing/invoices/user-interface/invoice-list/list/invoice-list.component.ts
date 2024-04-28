import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { FormGroup } from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { MenuItem } from 'primeng/api'
import { Router } from '@angular/router'
import { Table } from 'primeng/table'
import { formatNumber } from '@angular/common'
// Custom
import { DateHelperService } from '../../../../../../shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from '../../../../../../shared/services/modal-dialog.service'
import { EmojiService } from '../../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../../shared/services/interaction.service'
import { InvoiceHttpService } from '../../../classes/services/invoice-http.service'
import { InvoiceListCriteriaVM } from '../../../classes/view-models/criteria/invoice-list-criteria-vm'
import { InvoiceListVM } from '../../../classes/view-models/list/invoice-list-vm'
import { LocalStorageService } from '../../../../../../shared/services/local-storage.service'
import { MessageDialogService } from '../../../../../../shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../../shared/services/message-label.service'
import { SessionStorageService } from '../../../../../../shared/services/session-storage.service'
import { EmailInvoiceVM } from '../../../classes/view-models/email/email-invoice-vm'

@Component({
    selector: 'invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['../../../../../../../assets/styles/custom/lists.css', './invoice-list.component.css']
})

export class InvoiceListComponent {

    //#region common

    @ViewChild('table') table: Table

    private url = 'invoices'
    private virtualElement: any
    public feature = 'invoiceList'
    public featureIcon = 'invoices'
    public icon = 'home'
    public parentUrl = '/home'
    public records: InvoiceListVM[] = []
    public recordsFilteredCount = 0

    //#endregion

    //#region dropdown filters

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

    //#region specific

    public filterDate = ''
    public form: FormGroup
    public recordsFiltered: InvoiceListVM[]
    private criteria: InvoiceListCriteriaVM

    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dexieService: DexieService, private dialogService: DialogService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private invoiceHttpService: InvoiceHttpService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setTabTitle()
        this.setLocale()
        this.setSidebarsHeight()
        this.initContextMenu()
        this.enableDisableFilters()
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getVirtualElement()
            this.scrollToSavedPosition()
            this.hightlightSavedRow()
            this.enableDisableFilters()
        }, 500)
    }

    //#endregion

    //#region public methods

    public doSearchTasks(event: any): void {
        if (event.fromDate != '' && event.toDate != '') {
            this.loadRecords(event).then(() => {
                this.filterTableFromStoredFilters()
                this.populateDropdownFilters()
                this.enableDisableFilters()
                this.formatDatesToLocale()
                this.subscribeToInteractionService()
            })
        }
    }

    public editRecord(id: string): void {
        this.storeScrollTop()
        this.storeSelectedId(id)
        this.navigateToRecord(id)
    }

    public filterRecords(event: any): void {
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
        this.recordsFiltered = event.filteredValue
        this.recordsFilteredCount = event.filteredValue.length
    }

    public formatNumberToLocale(number: number, decimals = true): string {
        return formatNumber(number, this.localStorageService.getItem('language'), decimals ? '1.2' : '1.0')
    }

    public getEmoji(anything: any): string {
        return typeof anything == 'string'
            ? this.emojiService.getEmoji(anything)
            : anything ? this.emojiService.getEmoji('green-box') : this.emojiService.getEmoji('red-box')
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public highlightRow(id: any): void {
        this.helperService.highlightRow(id)
    }

    public newRecord(): void {
        this.router.navigate([this.url + '/new'])
    }

    public resetTableFilters(): void {
        this.helperService.clearTableTextFilters(this.table, [''])
    }

    //#endregion

    //#region private methods

    private enableDisableFilters(): void {
        this.records.length == 0 ? this.helperService.disableTableFilters() : this.helperService.enableTableFilters()
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
                this.filterColumn(filters.destination, 'destination', 'in')
                this.filterColumn(filters.ship, 'ship', 'in')
                this.filterColumn(filters.shipOwner, 'shipOwner', 'in')
                this.filterColumn(filters.documentType, 'documentType', 'in')
            }, 500)
        }
    }

    private getCustomerDataFromStorage(customerId: number): Promise<any> {
        return this.dexieService.getById('customers', customerId)
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
            { label: 'Αποστολή με email', command: () => this.sendInvoiceToEmail(this.selectedRecord.invoiceId) }
        ]
    }

    private loadRecords(criteria: InvoiceListCriteriaVM): Promise<InvoiceListVM[]> {
        return new Promise((resolve) => {
            this.invoiceHttpService.getForList(criteria).subscribe(response => {
                this.records = response
                resolve(this.records)
            })
        })
    }

    private navigateToRecord(id: any): void {
        this.router.navigate([this.url, id])
    }

    private scrollToSavedPosition(): void {
        this.helperService.scrollToSavedPosition(this.virtualElement, this.feature)
    }

    private setSidebarsHeight(): void {
        this.helperService.setSidebarsTopMargin('0')
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
            this.formatDatesToLocale()
            this.setLocale()
        })
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
    }

    private sendInvoiceLinkToEmail(customerId: number, invoiceId: string): void {
        this.getCustomerDataFromStorage(customerId).then((response) => {
            this.invoiceHttpService.sendInvoiceLinkToEmail(invoiceId, response.email).subscribe({
                next: () => {
                    this.invoiceHttpService.patchInvoiceWithEmailSent(invoiceId).subscribe({
                        next: () => {
                            const criteria: InvoiceListCriteriaVM = JSON.parse(this.sessionStorageService.getItem('invoice-list-criteria'))
                            this.loadRecords(criteria).then(() => {
                                this.filterTableFromStoredFilters()
                                this.populateDropdownFilters()
                                this.enableDisableFilters()
                                this.formatDatesToLocale()
                            })
                            this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, false)
                        },
                        error: (errorFromInterceptor) => {
                            this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                        }
                    })
                },
                error: (errorFromInterceptor: any) => {
                    this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                }
            })
        })
    }

    private sendInvoiceToEmail(invoiceId: string): void {
        this.invoiceHttpService.buildPdf(invoiceId).subscribe({
            next: (response) => {
                const criteria: EmailInvoiceVM = {
                    customerId: response.body.customerId,
                    filename: response.body.filename
                }
                this.invoiceHttpService.emailInvoice(criteria).subscribe({
                    complete: () => {
                        this.invoiceHttpService.patchInvoiceWithEmailSent(invoiceId).subscribe({
                            next: () => {
                                const criteria: InvoiceListCriteriaVM = JSON.parse(this.sessionStorageService.getItem('invoice-list-criteria'))
                                this.loadRecords(criteria).then(() => {
                                    this.filterTableFromStoredFilters()
                                    this.populateDropdownFilters()
                                    this.enableDisableFilters()
                                    this.formatDatesToLocale()
                                })
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
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    //#endregion

    //#region specific methods

    public clearDateFilter(): void {
        this.table.filter('', 'date', 'equals')
        this.filterDate = ''
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
    }

    public filterByDate(event: MatDatepickerInputEvent<Date>): void {
        const date = this.dateHelperService.formatDateToIso(new Date(event.value), false)
        this.table.filter(date, 'date', 'equals')
        this.filterDate = date
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
    }

    public hasDateFilter(): string {
        return this.filterDate == '' ? 'hidden' : ''
    }

    private formatDatesToLocale(): void {
        this.records.forEach(record => {
            record.formattedDate = this.dateHelperService.formatISODateToLocale(record.date)
        })
    }

    private populateDropdownFilters(): void {
        this.dropdownCustomers = this.helperService.getDistinctRecords(this.records, 'customer', 'abbreviation')
        this.dropdownDestinations = this.helperService.getDistinctRecords(this.records, 'destination', 'description')
        this.dropdownDocumentTypes = this.helperService.getDistinctRecords(this.records, 'documentType', 'description')
        this.dropdownShipOwners = this.helperService.getDistinctRecords(this.records, 'shipOwner', 'description')
        this.dropdownShips = this.helperService.getDistinctRecords(this.records, 'ship', 'description')
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    //#endregion

}
