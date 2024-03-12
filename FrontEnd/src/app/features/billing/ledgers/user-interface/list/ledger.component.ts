import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { DialogService } from '../../../../../shared/services/modal-dialog.service'
import { EmojiService } from '../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../shared/services/interaction.service'
import { LedgerVM } from '../../classes/view-models/criteria/ledger-vm'
import { ListResolved } from '../../../../../shared/classes/list-resolved'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageDialogService } from '../../../../../shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'

@Component({
    selector: 'ledger',
    templateUrl: './ledger.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/lists.css', './ledger.component.css']
})

export class LedgerBillingComponent {

    //#region common

    @ViewChild('table') table: Table

    private url = 'billing-ledgers'
    private virtualElement: any
    public feature = 'billingLedger'
    public featureIcon = 'ledgers'
    public icon = 'home'
    public parentUrl = '/home'
    public records: LedgerVM

    //#endregion


    constructor(private activatedRoute: ActivatedRoute, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dialogService: DialogService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        // this.records.requestedPeriod = []
        // this.loadRecords().then(() => {
        //     this.formatDatesToLocale()
        //     this.subscribeToInteractionService()
        //     this.setTabTitle()
        //     this.setLocale()
        //     this.setSidebarsHeight()
        // })
    }

    // ngAfterViewInit(): void {
    //     setTimeout(() => {
    //         this.getVirtualElement()
    //         this.scrollToSavedPosition()
    //         this.hightlightSavedRow()
    //     }, 500)
    // }

    //#endregion

    //#region public common methods


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

    //#endregion

    //#region private common methods

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private loadRecords(): Promise<any> {
        return new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data[this.feature]
            if (listResolved.error == null) {
                this.records = listResolved.list
                resolve(this.records)
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
        })
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

    //#region private specific methods

    private formatDatesToLocale(): void {
        this.records.requestedPeriod.forEach(record => {
            record.date = this.dateHelperService.formatISODateToLocale(record.date)
        })
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    //#endregion

}
