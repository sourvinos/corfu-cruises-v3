import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { ManifestCriteriaPanelVM } from '../../classes/view-models/criteria/manifest-criteria-panel-vm'
import { ManifestPdfService } from '../../classes/services/manifest-pdf.service'
import { ManifestRouteSelectorComponent } from './manifest-route-selector.component'
import { ManifestVM } from '../../classes/view-models/list/manifest-vm'
import { MessageDialogService } from '../../../../../shared/services/message-dialog.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { RegistrarService } from '../../../registrars/classes/services/registrar.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'manifest-list',
    templateUrl: './manifest-list.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css']
})

export class ManifestListComponent {

    //#region common

    @ViewChild('table') table: Table

    public feature = 'manifestList'
    public featureIcon = 'manifest'
    public icon = 'arrow_back'
    public parentUrl = '/manifest'
    public records: ManifestVM
    public criteriaPanels: ManifestCriteriaPanelVM

    //#endregion

    //#region specific

    public totals = [0, 0, 0]
    public totalsFiltered = [0, 0, 0]

    public distinctGenders: SimpleEntity[]
    public distinctNationalities: SimpleEntity[]
    public distinctOccupants: SimpleEntity[]

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dateHelperService: DateHelperService, private dialogService: DialogService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private manifestPdfService: ManifestPdfService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private registrarService: RegistrarService, private router: Router, private sessionStorageService: SessionStorageService, public dialog: MatDialog) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords().then(() => {
            this.addCrewToList()
            this.populateDropdownFilters()
            this.enableDisableFilters()
            this.updateTotals(this.totals, this.records.passengers)
            this.updateTotals(this.totalsFiltered, this.records.passengers)
            this.populateCriteriaPanelsFromStorage()
        })
        this.subscribeToInteractionService()
        this.setTabTitle()

    }

    //#endregion

    //#region public methods

    public async doTasks(): Promise<void> {
        this.validateRegistrarsForManifest().then((response) => {
            response.code == 200
                ? this.showRouteSelectionDialog()
                : this.dialogService.open(this.messageDialogService.errorsInRegistrars(), 'error', ['ok'])
        })
    }

    public filterRecords(event: any): void {
        this.updateTotals(this.totalsFiltered, event.filteredValue)
        this.storeFilters()
    }

    public formatDateToLocale(date: string, showWeekday = false, showYear = false): string {
        return this.dateHelperService.formatISODateToLocale(date, showWeekday, showYear)
    }

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getNationalityIcon(nationalityCode: string): any {
        return environment.nationalitiesIconDirectory + nationalityCode.toLowerCase() + '.png'
    }

    public goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    public isFilterDisabled(): boolean {
        return this.records.passengers.length == 0
    }

    public resetTableFilters(): void {
        this.helperService.clearTableTextFilters(this.table, ['lastname', 'firstname'])
    }

    //#endregion

    //#region private methods

    private addCrewToList(): void {
        if (this.records.passengers.length > 0) {
            this.records.ship.crew.forEach(crew => {
                this.records.passengers.push(crew)
            })
        }
    }

    private enableDisableFilters(): void {
        this.records.passengers.length == 0
            ? this.helperService.disableTableFilters()
            : this.helperService.enableTableFilters()
    }

    private loadRecords(): Promise<any> {
        const promise = new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data[this.feature]
            if (listResolved.error === null) {
                this.records = listResolved.list
                resolve(this.records)
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
        })
        return promise
    }

    private populateCriteriaPanelsFromStorage(): void {
        if (this.sessionStorageService.getItem('manifest-criteria')) {
            this.criteriaPanels = JSON.parse(this.sessionStorageService.getItem('manifest-criteria'))
        }
    }

    private populateDropdownFilters(): void {
        if (this.records.passengers.length > 0) {
            this.distinctGenders = this.helperService.getDistinctRecords(this.records.passengers, 'gender', 'description')
            this.distinctNationalities = this.helperService.getDistinctRecords(this.records.passengers, 'nationality', 'description')
            this.distinctOccupants = this.helperService.getDistinctRecords(this.records.passengers, 'occupant', 'description')
        }
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    private showRouteSelectionDialog(): void {
        const response = this.dialog.open(ManifestRouteSelectorComponent, {
            data: this.records,
            disableClose: true,
            height: '36.0625rem',
            panelClass: 'dialog',
            width: '31rem',
        })
        response.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.records.shipRoute = result
                this.manifestPdfService.createReport(this.records)
            }
        })
    }

    private storeFilters(): void {
        this.sessionStorageService.saveItem(this.feature, JSON.stringify(this.table.filters))
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
    }

    private updateTotals(totals: number[], filteredVelue: any[]): void {
        totals[0] = filteredVelue.length
        totals[1] = filteredVelue.filter(x => x.occupant.description == 'PASSENGER').length
        totals[2] = filteredVelue.filter(x => x.occupant.description == 'CREW').length
    }

    private validateRegistrarsForManifest(): Promise<any> {
        return new Promise((resolve) => {
            this.registrarService.validateRegistrarsForManifest(this.records.ship.id).then((response) => {
                resolve(response)
            })
        })
    }

    //#endregion

}
