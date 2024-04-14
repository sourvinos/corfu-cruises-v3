import { Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { MenuItem } from 'primeng/api'
import { Table } from 'primeng/table'
import { formatNumber } from '@angular/common'
// Custom
import { DateHelperService } from '../../../../../../shared/services/date-helper.service'
import { EmojiService } from '../../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../../shared/services/interaction.service'
import { LocalStorageService } from '../../../../../../shared/services/local-storage.service'
import { MessageLabelService } from '../../../../../../shared/services/message-label.service'
import { ReceiptHttpService } from '../../../classes/services/receipt-http.service'
import { ReceiptListCriteriaVM } from '../../../classes/view-models/criteria/receipt-list-criteria-vm'
import { ReceiptListExportService } from '../../../classes/services/receipt-list-export.service'
import { ReceiptListVM } from '../../../classes/view-models/list/receipt-list-vm'
import { SessionStorageService } from '../../../../../../shared/services/session-storage.service'

@Component({
    selector: 'receipt-list',
    templateUrl: './receipt-list.component.html',
    styleUrls: ['../../../../../../../assets/styles/custom/lists.css']
})

export class ReceiptListComponent {

    //#region common

    @ViewChild('table') table: Table

    private url = 'receipts'
    private virtualElement: any
    public feature = 'receiptList'
    public featureIcon = 'receipts'
    public icon = 'home'
    public parentUrl = '/home'
    public records: ReceiptListVM[] = []
    public recordsFilteredCount = 0

    //#endregion

    //#region dropdown filters

    public dropdownCustomers = []
    public dropdownShipOwners = []
    public dropdownDestinations = []
    public dropdownDocumentTypes = []

    //#endregion

    //#region context menu

    public menuItems!: MenuItem[]
    public selectedRecord!: ReceiptListVM

    //#endregion

    //#region specific

    public recordsFiltered: ReceiptListVM[]
    public filterDate = ''

    //#endregion

    constructor(
        private dateAdapter: DateAdapter<any>,
        private dateHelperService: DateHelperService,
        private emojiService: EmojiService,
        private helperService: HelperService,
        private interactionService: InteractionService,
        private localStorageService: LocalStorageService,
        private messageLabelService: MessageLabelService,
        private receiptHttpService: ReceiptHttpService,
        private receiptListExportService: ReceiptListExportService,
        private router: Router,
        private sessionStorageService: SessionStorageService,
    ) { }

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

    //#region public common methods

    public editRecord(id: string): void {
        this.storeScrollTop()
        this.storeSelectedId(id)
        this.navigateToRecord(id)
    }

    public exportRecords(): void {
        this.receiptListExportService.exportToExcel(this.receiptListExportService.buildList(this.recordsFiltered))
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
                this.filterColumn(filters.documentType, 'documentType', 'in')
            }, 500)
        }
    }

    private getVirtualElement(): void {
        this.virtualElement = document.getElementsByClassName('p-scroller-inline')[0]
    }

    private hightlightSavedRow(): void {
        this.helperService.highlightSavedRow(this.feature)
    }

    private loadRecords(criteria: ReceiptListCriteriaVM): Promise<ReceiptListVM[]> {
        return new Promise((resolve) => {
            this.receiptHttpService.getForList(criteria).subscribe(response => {
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
        this.dropdownDocumentTypes = this.helperService.getDistinctRecords(this.records, 'documentType', 'description')
        this.dropdownShipOwners = this.helperService.getDistinctRecords(this.records, 'shipOwner', 'description')
    }

    private initContextMenu(): void {
        this.menuItems = [
            { label: 'Επεξεργασία', command: () => this.editRecord(this.selectedRecord.invoiceId.toString()) }
        ]
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    //#endregion

}
