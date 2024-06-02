import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { Table } from 'primeng/table'
// Custom
import { BalanceSheetCriteriaVM } from '../../classes/criteria/balanceSheet-criteria-vm'
import { BalanceSheetHttpService } from '../../classes/services/balanceSheet-http.service'
import { BalanceSheetVM } from '../../classes/list/balanceSheet-vm'
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'

@Component({
    selector: 'balanceSheet',
    templateUrl: './balanceSheet.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './balanceSheet.component.css']
})

export class BalanceSheetComponent {

    //#region variables

    @ViewChild('table') table: Table

    public criteria: BalanceSheetCriteriaVM
    public feature = 'balanceSheet'
    public featureIcon = 'balanceSheet'
    public icon = 'home'
    public parentUrl = '/home'
    public shipOwnerRecordsA: BalanceSheetVM[] = []
    public shipOwnerRecordsB: BalanceSheetVM[] = []
    public shipOwnerTotal: BalanceSheetVM[] = []
    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private helperService: HelperService, private balanceSheetHttpService: BalanceSheetHttpService, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setLocale()
        this.setTabTitle()
        this.setListHeight()
    }

    ngAfterViewInit(): void {
        // document.getElementById('table-wrapper').style.visibility = 'hidden'
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDoSearchTasks(event: BalanceSheetCriteriaVM): void {
        this.populateCriteria(event)
        this.loadRecordsForShipOwner(this.criteria, 'shipOwnerRecordsA', 1)
        this.loadRecordsForShipOwner(this.criteria, 'shipOwnerRecordsB', 2)
        this.loadRecordsForShipOwner(this.criteria, 'shipOwnerTotal', null)
    }

    public onSelectedTabChange(): void {
        setTimeout(() => {
            document.getElementById('table-wrapper').style.height = document.getElementById('content').offsetHeight - 278 + 'px'
        }, 1000)
    }

    //#endregion

    //#region private methods

    private loadRecordsForShipOwner(criteria: BalanceSheetCriteriaVM, shipOwnerRecords: string, shipOwnerId: number): void {
        const x: BalanceSheetCriteriaVM = {
            fromDate: criteria.fromDate,
            toDate: criteria.toDate,
            shipOwnerId: shipOwnerId
        }
        this.balanceSheetHttpService.get(x).subscribe(response => {
            this[shipOwnerRecords] = response
        })
    }

    private populateCriteria(event: BalanceSheetCriteriaVM): void {
        this.criteria = {
            fromDate: event.fromDate,
            toDate: event.toDate,
            shipOwnerId: event.shipOwnerId
        }
    }

    private setListHeight(): void {
        setTimeout(() => {
            document.getElementById('content').style.height = document.getElementById('list-wrapper').offsetHeight - 64 + 'px'
        }, 100)
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    //#endregion

}
