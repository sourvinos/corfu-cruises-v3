import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
// Custom
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { StatisticsService } from '../classes/services/statistics.service'
import { StatisticsVM } from '../classes/view-models/statistics-vm'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css', './statistics.component.css']
})

export class StatisticsComponent {

    //#region common #8

    public ytd: StatisticsVM
    public destinations: StatisticsVM[]
    public feature = 'statistics'
    public featureIcon = 'statistics'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/home'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private statisticsService: StatisticsService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.getYTD()
        this.getDestinations()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getIcon(filename: string): string {
        return environment.menuDropdownIconDirectory + filename + '.svg'
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onClose(): void {
        this.goBack()
    }

    //#endregion

    //#region private methods

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getYTD(): Promise<any> {
        return new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data['ytd']
            if (listResolved.error == null) {
                this.ytd = listResolved.list[0]
                resolve(this.ytd)
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
        })
    }

    private getDestinations(): Promise<any> {
        return new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data['destinations']
            if (listResolved.error == null) {
                this.destinations = listResolved.list
                resolve(this.destinations)
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
