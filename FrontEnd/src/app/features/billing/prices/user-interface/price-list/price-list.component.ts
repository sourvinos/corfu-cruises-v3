import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { MatDialog } from '@angular/material/dialog'
import { Table } from 'primeng/table'
// Custom
import { ClonePricesDialogComponent } from '../clone-prices-dialog/clone-prices-dialog.component'
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { DialogService } from '../../../../../shared/services/modal-dialog.service'
import { EmojiService } from '../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../shared/services/interaction.service'
import { ListResolved } from '../../../../../shared/classes/list-resolved'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageDialogService } from '../../../../../shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { PriceCloneCriteria } from './../../classes/models/price-clone-criteria'
import { PriceListVM } from '../../classes/view-models/price-list-vm'
import { PriceService } from '../../classes/services/price.service'
import { SessionStorageService } from '../../../../../shared/services/session-storage.service'

@Component({
    selector: 'price-list',
    templateUrl: './price-list.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css']
})

export class PriceListComponent {

    //#region common #9

    @ViewChild('table') table: Table

    private url = 'prices'
    private virtualElement: any
    public feature = 'priceList'
    public featureIcon = 'prices'
    public icon = 'home'
    public parentUrl = '/home'
    public records: PriceListVM[]
    public recordsFilteredCount: number

    //#endregion

    //#region dropdown filters

    public dropdownCustomers = []
    public dropdownDestinations = []
    public dropdownPorts = []

    //#endregion

    //#region specific

    public recordsFiltered: PriceListVM[]
    public selectedRecords: PriceListVM[] = []
    public selectedIds: number[] = []

    //#endregion

    constructor(
        private activatedRoute: ActivatedRoute,
        private dateAdapter: DateAdapter<any>,
        private dateHelperService: DateHelperService,
        private dialogService: DialogService,
        private emojiService: EmojiService,
        private helperService: HelperService,
        private interactionService: InteractionService,
        private localStorageService: LocalStorageService,
        private messageDialogService: MessageDialogService,
        private messageLabelService: MessageLabelService,
        private priceService: PriceService,
        private router: Router,
        private sessionStorageService: SessionStorageService,
        public dialog: MatDialog,
    ) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords()
        this.populateDropdownFilters()
        this.filterTableFromStoredFilters()
        this.formatDatesToLocale()
        this.subscribeToInteractionService()
        this.setTabTitle()
        this.setLocale()
        this.setSidebarsHeight()
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

    public editRecord(id: number): void {
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
        this.helperService.clearTableTextFilters(this.table, ['customer', 'destination', 'port'])
    }

    //#endregion

    //#region public specific methods

    public onClonePrices(): void {
        if (this.isAnyRowSelected()) {
            this.saveSelectedIds()
            const dialogRef = this.dialog.open(ClonePricesDialogComponent, {
                data: ['customers', 'clonePrices'],
                height: '36.0625rem',
                panelClass: 'dialog',
                width: '32rem',
            })
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                    const priceCloneCriteria: PriceCloneCriteria = {
                        customerIds: result,
                        priceIds: this.selectedIds
                    }
                    this.priceService.clonePrices(priceCloneCriteria).subscribe(() => {
                        this.dialogService.open(this.messageDialogService.success(), 'ok', ['ok']).subscribe(() => {
                            this.clearSelectedRecords()
                            this.refreshList()
                        })
                    })
                }
            })
        }
    }

    //#endregion

    //#region private common methods #14

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
                this.filterColumn(filters.port, 'port', 'in')
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

    private storeSelectedId(id: number): void {
        this.sessionStorageService.saveItem(this.feature + '-id', id.toString())
    }

    private storeScrollTop(): void {
        this.sessionStorageService.saveItem(this.feature + '-scrollTop', this.virtualElement.scrollTop)
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
    }

    //#endregion

    //#region private specific methods

    private clearSelectedRecords(): void {
        this.selectedRecords = []
    }

    private formatDatesToLocale(): void {
        this.records.forEach(record => {
            record.formattedFrom = this.dateHelperService.formatISODateToLocale(record.from)
            record.formattedTo = this.dateHelperService.formatISODateToLocale(record.to)
        })
    }

    private isAnyRowSelected(): boolean {
        if (this.selectedRecords.length == 0) {
            this.dialogService.open(this.messageDialogService.noRecordsSelected(), 'error', ['ok'])
            return false
        }
        return true
    }

    private populateDropdownFilters(): void {
        this.dropdownCustomers = this.helperService.getDistinctRecords(this.records, 'customer', 'description')
        this.dropdownDestinations = this.helperService.getDistinctRecords(this.records, 'destination', 'description')
        this.dropdownPorts = this.helperService.getDistinctRecords(this.records, 'port', 'description')
    }

    private refreshList(): void {
        this.router.navigateByUrl(this.router.url)
    }

    private saveSelectedIds(): void {
        const ids = []
        this.selectedRecords.forEach(record => {
            ids.push(record.id)
        })
        this.selectedIds = ids
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    //#endregion

}
