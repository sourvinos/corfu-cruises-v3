import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
// Custom
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { StatisticsVM } from '../classes/view-models/statistics-vm'

@Component({
    selector: 'statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['../../../../assets/styles/custom/lists.css', './statistics.component.css']
})

export class StatisticsComponent {

    //#region variables

    public ytd: StatisticsVM[]
    public customers: StatisticsVM[]
    public destinations: StatisticsVM[]
    public drivers: StatisticsVM[]
    public ports: StatisticsVM[]
    public ships: StatisticsVM[]
    public feature = 'statistics'
    public featureIcon = 'statistics'
    public icon = 'arrow_back'
    public parentUrl = '/home'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.getRecords('ytd')
        this.getRecords('customers')
        this.getRecords('destinations')
        this.getRecords('drivers')
        this.getRecords('ports')
        this.getRecords('ships')
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onClose(): void {
        this.goBack()
    }

    //#endregion

    //#region private methods

    private getRecords(array: string): Promise<any> {
        return new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data[array]
            if (listResolved.error == null) {
                this[array] = listResolved.list
                resolve([array])
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
        })
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    //#endregion

}
