import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { EmojiService } from '../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../shared/services/interaction.service'
import { LedgerCriteriaVM } from '../../classes/view-models/criteria/ledger-criteria-vm'
import { LedgerHttpService } from '../../classes/services/ledger-http.service'
import { LedgerVM } from '../../classes/view-models/criteria/ledger-vm'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { formatNumber } from '@angular/common'

@Component({
    selector: 'ledger',
    templateUrl: './ledger.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './ledger.component.css']
})

export class LedgerBillingComponent {

    //#region common

    @ViewChild('table') table: Table

    public feature = 'billingLedger'
    public featureIcon = 'ledgers'
    public icon = 'home'
    public parentUrl = '/home'
    public records: LedgerVM[] = []
    private criteria: LedgerCriteriaVM

    //#endregion

    constructor(private ledgerHttpService: LedgerHttpService, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.subscribeToInteractionService()
        this.setLocale()
    }

    //#endregion

    //#region public methods

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

    public onDoSearchTasks(event: any): void {
        this.criteria = {
            fromDate: event.fromDate,
            toDate: event.toDate,
            customerId: event.customer.id
        }
        this.loadRecords(this.criteria).then(() => {
            this.formatDatesToLocale()
            this.subscribeToInteractionService()
            this.setTabTitle()
            this.setLocale()
            this.setSidebarsHeight()
        })
    }

    public onPrint(): void {
        // this.router.navigate([this.url + '/new'])
    }

    public resetTableFilters(): void {
        this.helperService.clearTableTextFilters(this.table, [''])
    }

    //#endregion

    //#region private methods

    private formatDatesToLocale(): void {
        this.records.forEach(record => {
            record.formattedDate = this.dateHelperService.formatISODateToLocale(record.date)
        })
    }

    private loadRecords(criteria: LedgerCriteriaVM): Promise<LedgerVM[]> {
        return new Promise((resolve) => {
            this.ledgerHttpService.get(criteria).subscribe(response => {
                this.records = response
                resolve(this.records)
            })
        })
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private setSidebarsHeight(): void {
        this.helperService.setSidebarsTopMargin('0')
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
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
