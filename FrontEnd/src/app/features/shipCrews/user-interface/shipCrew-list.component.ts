import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ShipCrewListVM } from '../classes/view-models/shipCrew-list-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

@Component({
    selector: 'ship-crew-list',
    templateUrl: './shipCrew-list.component.html',
    styleUrls: ['../../../../assets/styles/custom/lists.css']
})

export class ShipCrewListComponent {

    //#region variables

    @ViewChild('table') table: Table

    private url = 'shipCrews'
    public feature = 'shipCrewList'
    public featureIcon = 'shipCrews'
    public icon = 'home'
    public parentUrl = '/home'
    public records: ShipCrewListVM[] = []

    public recordsFilteredCount: number
    private virtualElement: any

    public filterDate = ''
    public distinctShips: SimpleEntity[] = []

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private dialogService: ModalDialogService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords().then(() => {
            this.populateDropdownFilters()
            this.filterTableFromStoredFilters()
            this.formatDatesToLocale()
            this.subscribeToInteractionService()
            this.setTabTitle()
            this.setLocale()
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

    //#region public methods

    public clearDateFilter(): void {
        this.table.filter('', 'birthdate', 'equals')
        this.filterDate = ''
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
    }

    public editRecord(id: number): void {
        this.storeScrollTop()
        this.storeSelectedId(id)
        this.navigateToRecord(id)
    }

    public filterByDate(event: MatDatepickerInputEvent<Date>): void {
        const date = this.dateHelperService.formatDateToIso(new Date(event.value), false)
        this.table.filter(date, 'birthdate', 'equals')
        this.filterDate = date
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
    }

    public filterRecords(event: { filteredValue: any[] }): void {
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
        this.recordsFilteredCount = event.filteredValue.length
    }

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public hasDateFilter(): string {
        return this.filterDate == '' ? 'hidden' : ''
    }

    public newRecord(): void {
        this.router.navigate([this.url + '/new'])
    }

    public resetTableFilters(): void {
        this.filterDate = ''
        this.helperService.clearTableTextFilters(this.table, ['lastname', 'firstname', 'birthdate'])
    }

    public unHighlightAllRows(): void {
        this.helperService.unHighlightAllRows()
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
                this.filterColumn(filters.isActive, 'isActive', 'contains')
                this.filterColumn(filters.ship, 'ship', 'in')
                this.filterColumn(filters.lastname, 'lastname', 'contains')
                this.filterColumn(filters.firstname, 'firstname', 'contains')
                this.filterColumn(filters.birthdate, 'birthdate', 'equals')
                if (filters.birthdate != undefined) {
                    const date = new Date(Date.parse(filters.birthdate.value))
                    this.filterDate = this.dateAdapter.createDate(date.getFullYear(), date.getMonth(), parseInt(date.getDate().toLocaleString()))
                }
            }, 500)
        }
    }

    private formatDatesToLocale(): void {
        this.records.forEach(record => {
            record.formattedBirthdate = this.dateHelperService.formatISODateToLocale(record.birthdate)
        })
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
                this.recordsFilteredCount = this.records.length
                resolve(this.records)
            } else {
                this.dialogService.open(this.messageSnackbarService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
        })
    }

    private navigateToRecord(id: any): void {
        this.router.navigate([this.url, id])
    }

    private populateDropdownFilters(): void {
        this.distinctShips = this.helperService.getDistinctRecords(this.records, 'ship', 'description')
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private scrollToSavedPosition(): void {
        this.helperService.scrollToSavedPosition(this.virtualElement, this.feature)
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
        this.interactionService.refreshDateAdapter.subscribe(() => {
            this.formatDatesToLocale()
            this.setLocale()
        })
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
    }

    //#endregion

}
