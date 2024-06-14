import { Component, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MenuItem } from 'primeng/api'
import { Router } from '@angular/router'
import { Table } from 'primeng/table'
import { formatNumber } from '@angular/common'
// Custom
import { CriteriaDateRangeDialogComponent } from 'src/app/shared/components/criteria-date-range-dialog/criteria-date-range-dialog.component'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { RetailSaleHttpService } from '../../classes/services/retailSale-http.service'
import { RetailSaleListCriteriaVM } from '../../classes/view-models/criteria/retailSale-list-criteria-vm'
import { RetailSaleListVM } from '../../classes/view-models/list/retailSale-list-vm'
import { RetailSalePdfHttpService } from '../../classes/services/retailSale-pdf-http.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'retailSale-list',
    templateUrl: './retailSale-list.component.html',
    styleUrls: ['../../../../../assets/styles/custom/lists.css', './retailSale-list.component.css']
})

export class RetailSaleListComponent {

    //#region variables

    @ViewChild('table') table: Table

    private criteria: RetailSaleListCriteriaVM
    private url = 'retailSales'
    private virtualElement: any
    public feature = 'retailSaleList'
    public featureIcon = 'retailSales'
    public icon = 'home'
    public parentUrl = '/home'
    public records: RetailSaleListVM[] = []
    public selectedRecords: RetailSaleListVM[] = []
    public recordsFilteredCount = 0
    public recordsFiltered: RetailSaleListVM[]

    //#endregion

    //#region dropdown filters

    public dropdownDates = []
    public dropdownCustomers = []
    public dropdownDocumentTypes = []
    public dropdownShipOwners = []

    //#endregion

    //#region context menu

    public menuItems!: MenuItem[]
    public selectedRecord!: RetailSaleListVM

    //#endregion

    constructor(private dateHelperService: DateHelperService, private dialogService: DialogService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private retailSalePdfHttpService: RetailSalePdfHttpService, private retailSaleHttpService: RetailSaleHttpService, private router: Router, private sessionStorageService: SessionStorageService, public dialog: MatDialog) { }

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

    public onFilter(event: any, column: string, matchMode: string): void {
        if (event) this.table.filter(event, column, matchMode)
    }

    public onFilterRecords(event: any): void {
        setTimeout(() => {
            this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
            this.recordsFiltered = event.filteredValue
            this.recordsFilteredCount = event.filteredValue.length
        }, 500)
    }

    public formatNumberToLocale(number: number, decimals = true): string {
        return formatNumber(number, this.localStorageService.getItem('language'), decimals ? '1.2' : '1.0')
    }

    public getCriteria(): string {
        return this.criteria
            ? this.dateHelperService.formatISODateToLocale(this.criteria.fromDate) + ' - ' + this.dateHelperService.formatISODateToLocale(this.criteria.toDate)
            : ''
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

    public onBuildAndOpenSelectedInSingleDocument(): void {
        if (this.isAnyRowSelected()) {
            const ids = []
            this.selectedRecords.forEach(record => {
                ids.push(record.id)
            })
            this.retailSalePdfHttpService.buildMultiPagePdf(ids).subscribe({
                next: (response) => {
                    this.retailSalePdfHttpService.openPdf(response.body).subscribe({
                        next: (response) => {
                            const blob = new Blob([response], { type: 'application/pdf' })
                            const fileURL = URL.createObjectURL(blob)
                            window.open(fileURL, '_blank')
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
    }

    public onShowCriteriaDialog(): void {
        const dialogRef = this.dialog.open(CriteriaDateRangeDialogComponent, {
            data: 'retailSaleListCriteria',
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

    public resetTableFilters(): void {
        this.table != undefined ? this.helperService.clearTableTextFilters(this.table, ['refNo', 'invoiceNo', 'grossAmount']) : null
    }

    //#endregion

    //#region private methods

    private buildCriteriaVM(event: RetailSaleListCriteriaVM): void {
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
        this.sessionStorageService.deleteItems([{ 'item': 'retailSaleList-filters', 'when': 'always' }])
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

    private filterColumn(element: { value: any }, field: string, matchMode: string): void {
        if (element != undefined && (element.value != null || element.value != undefined)) {
            this.table.filter(element.value, field, matchMode)
        }
    }

    private filterTableFromStoredFilters(): void {
        const filters = this.sessionStorageService.getFilters(this.feature + '-' + 'filters')
        if (filters != undefined) {
            setTimeout(() => {
                this.filterColumn(filters.date, 'date', 'in')
                this.filterColumn(filters.refNo, 'refNo', 'contains')
                this.filterColumn(filters.shipOwner, 'shipOwner', 'in')
                this.filterColumn(filters.customer, 'customer', 'in')
                this.filterColumn(filters.documentType, 'documentType', 'in')
                this.filterColumn(filters.invoiceNo, 'invoiceNo', 'contains')
                this.filterColumn(filters.grossAmount, 'grossAmount', 'contains')
            }, 500)
        }
    }

    private formatDateToLocale(date: string): string {
        return this.dateHelperService.formatISODateToLocale(date)
    }

    private getStoredCriteria(): void {
        const storedCriteria: any = this.sessionStorageService.getItem('retailSaleListCriteria') ? JSON.parse(this.sessionStorageService.getItem('retailSaleListCriteria')) : ''
        if (storedCriteria) {
            this.criteria = {
                fromDate: storedCriteria.fromDate,
                toDate: storedCriteria.toDate
            }
        } else {
            this.criteria = {
                fromDate: this.dateHelperService.formatDateToIso(new Date()),
                toDate: this.dateHelperService.formatDateToIso(new Date())
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
        // 
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

    private loadRecords(): Promise<RetailSaleListVM[]> {
        return new Promise((resolve) => {
            this.retailSaleHttpService.getForList(this.criteria).subscribe(response => {
                this.records = response
                resolve(this.records)
            })
        })
    }

    private navigateToRecord(id: any): void {
        this.router.navigate([this.url, id])
    }

    private populateDropdownFilters(): void {
        this.dropdownDates = this.helperService.getDistinctRecords(this.records, 'date', 'date')
        this.dropdownCustomers = this.helperService.getDistinctRecords(this.records, 'customer', 'description')
        this.dropdownDocumentTypes = this.helperService.getDistinctRecords(this.records, 'documentType', 'description')
        this.dropdownShipOwners = this.helperService.getDistinctRecords(this.records, 'shipOwner', 'description')
    }

    private scrollToSavedPosition(): void {
        this.helperService.scrollToSavedPosition(this.virtualElement, this.feature)
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
                this.criteria.fromDate = response.fromDate
                this.criteria.toDate = response.toDate
            }
        })
    }

    //#endregion

}
