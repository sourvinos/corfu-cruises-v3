import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { map, startWith } from 'rxjs/operators'
// Custom
import { CoachRouteReadDto } from '../../classes/dtos/coachRoute-read-dto'
import { CoachRouteService } from '../../classes/services/coachRoute.service'
import { CoachRouteWriteDto } from '../../classes/dtos/coachRoute-write-dto'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PortAutoCompleteVM } from 'src/app/features/ports/classes/view-models/port-autocomplete-vm'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'coach-route-form',
    templateUrl: './coachRoute-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css']
})

export class CoachRouteFormComponent {

    //#region common #8

    private record: CoachRouteReadDto
    private recordId: number
    public feature = 'coachRouteForm'
    public featureIcon = 'coachRoutes'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/coachRoutes'

    //#endregion

    //#region autocompletes #2

    public isAutoCompleteDisabled = true
    public dropdownPorts: Observable<PortAutoCompleteVM[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private coachRouteService: CoachRouteService, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
        this.populateDropdowns()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public autocompleteFields(subject: { description: any }): any {
        return subject ? subject.description : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDelete(): void {
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'warning', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.coachRouteService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('coachRoutes', this.form.value.id)
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'success', this.parentUrl, true)
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        })
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    //#endregion

    //#region private methods

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string; }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): CoachRouteWriteDto {
        return {
            id: this.form.value.id,
            portId: this.form.value.port.id,
            abbreviation: this.form.value.abbreviation,
            description: this.form.value.description,
            hasTransfer: this.form.value.hasTransfer,
            isActive: this.form.value.isActive,
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['coachRouteForm']
                if (formResolved.error == null) {
                    this.record = formResolved.record.body
                    resolve(this.record)
                } else {
                    this.dialogService.open(this.messageDialogService.filterResponse(formResolved.error), 'error', ['ok']).subscribe(() => {
                        this.resetForm()
                        this.goBack()
                    })
                }
            })
        }
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            abbreviation: ['', [Validators.required, Validators.maxLength(10)]],
            description: ['', [Validators.required, Validators.maxLength(128)]],
            port: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            hasTransfer: true,
            isActive: true,
            user: [''],
            lastUpdate: ['']
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('ports', 'dropdownPorts', 'port', 'description', 'description')
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = this.recordId == undefined ? response.filter(x => x.isActive) : response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                abbreviation: this.record.abbreviation,
                description: this.record.description,
                port: { 'id': this.record.port.id, 'description': this.record.port.description },
                hasTransfer: this.record.hasTransfer,
                isActive: this.record.isActive,
                user: this.record.user,
                lastUpdate: this.record.lastUpdate
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(coachRoute: CoachRouteWriteDto): void {
        this.coachRouteService.save(coachRoute).subscribe({
            next: (response) => {
                this.dexieService.update('coachRoutes', { 'id': parseInt(response.id), 'description': coachRoute.abbreviation, 'isActive': coachRoute.isActive })
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'success', this.parentUrl, true)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    //#endregion

    //#region getters

    get abbreviation(): AbstractControl {
        return this.form.get('abbreviation')
    }

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get port(): AbstractControl {
        return this.form.get('port')
    }

    get user(): AbstractControl {
        return this.form.get('user')
    }

    get lastUpdate(): AbstractControl {
        return this.form.get('lastUpdate')
    }

    //#endregion

}
