import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { Table } from 'primeng/table'
// Custom
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { RegistrarListVM } from '../classes/view-models/registrar-list-vm'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'registrar-list',
    templateUrl: './registrar-list.component.html',
    styleUrls: ['../../../../assets/styles/custom/lists.css']
})

export class RegistrarListComponent {

    //#region common #9

    @ViewChild('table') table: Table

    private url = 'registrars'
    private virtualElement: any
    public feature = 'registrarList'
    public featureIcon = 'registrars'
    public icon = 'home'
    public parentUrl = '/home'
    public records: RegistrarListVM[]
    public recordsFilteredCount: number

    //#endregion

    //#region dropdown filters #1

    public dropdownShips = []

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords().then(() => {
            this.populateDropdownFilters()
            this.filterTableFromStoredFilters()
            this.subscribeToInteractionService()
            this.setTabTitle()
        })
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getVirtualElement()
            this.scrollToSavedPosition()
            this.highlightSavedRow()
            this.enableDisableFilters()
        }, 500)
    }

    //#endregion

    //#region public common methods #7

    public editRecord(id: number): void {
        this.storeScrollTop()
        this.storeSelectedId(id)
        this.navigateToRecord(id)
    }

    public filterRecords(event: any): void {
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
        this.recordsFilteredCount = event.filteredValue.length
    }

    public getEmoji(anything: any): string {
        return typeof anything == 'string'
            ? this.emojiService.getEmoji(anything)
            : anything ? this.emojiService.getEmoji('green-circle') : this.emojiService.getEmoji('red-circle')
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public newRecord(): void {
        this.router.navigate([this.url + '/new'])
    }

    public resetTableFilters(): void {
        this.helperService.clearTableTextFilters(this.table, ['fullname'])
    }

    public unHighlightAllRows(): void {
        this.helperService.unHighlightAllRows()
    }

    //#endregion

    //#region private common list methods #13

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
                this.filterColumn(filters.isPrimary, 'isPrimary', 'equals')
                this.filterColumn(filters.ship, 'ship', 'in')
                this.filterColumn(filters.fullname, 'fullname', 'contains')
            }, 500)
        }
    }

    private getVirtualElement(): void {
        this.virtualElement = document.getElementsByClassName('p-scroller-inline')[0]
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private highlightSavedRow(): void {
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

    //#region private specific list methods #1

    private populateDropdownFilters(): void {
        this.dropdownShips = this.helperService.getDistinctRecords(this.records, 'ship', 'description')
    }

    //#endregion

}
