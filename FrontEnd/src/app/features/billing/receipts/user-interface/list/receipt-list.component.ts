import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { MatDialog } from '@angular/material/dialog'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { DialogService } from '../../../../../shared/services/modal-dialog.service'
import { EmojiService } from '../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../shared/services/interaction.service'
import { ReceiptHttpService } from '../../classes/services/receipt-http.service'
import { ListResolved } from '../../../../../shared/classes/list-resolved'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { MessageDialogService } from '../../../../../shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { SessionStorageService } from '../../../../../shared/services/session-storage.service'
import { ReceiptListVM } from '../../classes/view-models/list/receipt-list-vm'

@Component({
    selector: 'receipt-list',
    templateUrl: './receipt-list.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css']
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
    public records: ReceiptListVM[]
    public recordsFilteredCount = 0

    //#endregion

    //#region dropdown filters

    public dropdownCustomers = []
    public dropdownDestinations = []
    public dropdownDocumentTypes = []
    public dropdownShips = []

    //#endregion

    //#region specific

    public recordsFiltered: ReceiptListVM[]
    public filterDate = ''

    //#endregion

    constructor(
        private activatedRoute: ActivatedRoute,
        private dateAdapter: DateAdapter<any>,
        private dateHelperService: DateHelperService,
        private dialogService: DialogService,
        private emojiService: EmojiService,
        private helperService: HelperService,
        private interactionService: InteractionService,
        private receiptHttpService: ReceiptHttpService,
        private localStorageService: LocalStorageService,
        private messageDialogService: MessageDialogService,
        private messageLabelService: MessageLabelService,
        private router: Router,
        private sessionStorageService: SessionStorageService,
        public dialog: MatDialog
    ) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords().then(() => {
            this.populateDropdownFilters()
            this.filterTableFromStoredFilters()
            this.formatDatesToLocale()
            this.subscribeToInteractionService()
            this.setTabTitle()
            this.setLocale()
            this.setSidebarsHeight()
        })
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

    public filterRecords(event: any): void {
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
        this.recordsFiltered = event.filteredValue
        this.recordsFilteredCount = event.filteredValue.length
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

    //#region public specific methods

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

    //#endregion

    //#region private common methods

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

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private hightlightSavedRow(): void {
        this.helperService.highlightSavedRow(this.feature)
    }

    private loadRecords(): Promise<any> {
        return new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data[this.feature]
            if (listResolved.error == null) {
                this.records = listResolved.list
                this.recordsFiltered = listResolved.list
                this.recordsFilteredCount = this.records.length
                resolve(this.records)
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
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

    //#region private specific methods

    private formatDatesToLocale(): void {
        this.records.forEach(record => {
            record.formattedDate = this.dateHelperService.formatISODateToLocale(record.date)
        })
    }

    private populateDropdownFilters(): void {
        this.dropdownCustomers = this.helperService.getDistinctRecords(this.records, 'customer', 'abbreviation')
        this.dropdownDocumentTypes = this.helperService.getDistinctRecords(this.records, 'documentType', 'description')
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    //#endregion

}
