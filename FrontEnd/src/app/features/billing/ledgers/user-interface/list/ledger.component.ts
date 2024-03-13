import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { Table } from 'primeng/table'
// Custom
import { DateHelperService } from '../../../../../shared/services/date-helper.service'
import { EmojiService } from '../../../../../shared/services/emoji.service'
import { HelperService } from '../../../../../shared/services/helper.service'
import { InteractionService } from '../../../../../shared/services/interaction.service'
import { LocalStorageService } from '../../../../../shared/services/local-storage.service'
import { MessageDialogService } from '../../../../../shared/services/message-dialog.service'
import { MessageLabelService } from '../../../../../shared/services/message-label.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { LedgerHttpService } from '../../classes/services/ledger-http.service'
import { LedgerCriteriaVM } from '../../classes/view-models/criteria/ledger-criteria-vm'
import { LedgerVM } from '../../classes/view-models/criteria/ledger-vm'

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
    public records: LedgerVM[] = []
    private criteria: LedgerCriteriaVM

    //#endregion


    constructor(private ledgerHttpService: LedgerHttpService, private dialogService: DialogService, private activatedRoute: ActivatedRoute, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        // this.loadRecords().then(() => {
        // this.formatDatesToLocale()
        this.subscribeToInteractionService()
        // this.setTabTitle()
        this.setLocale()
        // this.setSidebarsHeight()
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

    public onPrint(): void {
        // this.router.navigate([this.url + '/new'])
    }

    public resetTableFilters(): void {
        this.helperService.clearTableTextFilters(this.table, [''])
    }

    //#endregion

    public doTasks(event: any): void {
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


    //#region private common methods

    private loadRecords(criteria: LedgerCriteriaVM): Promise<LedgerVM[]> {
        return new Promise((resolve) => {
            this.ledgerHttpService.get(criteria).subscribe(response => {
                this.records = response
                resolve(this.records)
            })
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
        this.records.forEach(record => {
            record.formattedDate = this.dateHelperService.formatISODateToLocale(record.date)
        })
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    //#endregion

}
