import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { RegistrarReadDto } from '../classes/dtos/registrar-read-dto'
import { RegistrarService } from '../classes/services/registrar.service'
import { RegistrarWriteDto } from '../classes/dtos/registrar-write-dto'
import { ShipAutoCompleteVM } from '../../ships/classes/view-models/ship-autocomplete-vm'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'registrar-form',
    templateUrl: './registrar-form.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css']
})

export class RegistrarFormComponent {

    //#region common #8

    private record: RegistrarReadDto
    private recordId: number
    public feature = 'registrarForm'
    public featureIcon = 'registrars'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/registrars'

    //#endregion

    //#region autocompletes #2

    public isAutoCompleteDisabled = true
    public dropdownShips: Observable<ShipAutoCompleteVM[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private registrarService: RegistrarService, private router: Router) { }

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

    public autocompleteFields(fieldName: any, object: any): any {
        return object ? object[fieldName] : undefined
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
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'question', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.registrarService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
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
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): RegistrarWriteDto {
        return {
            id: this.form.value.id,
            shipId: this.form.value.ship.id,
            fullname: this.form.value.fullname,
            phones: this.form.value.phones,
            email: this.form.value.email,
            fax: this.form.value.fax,
            address: this.form.value.address,
            isPrimary: this.form.value.isPrimary,
            isActive: this.form.value.isActive,
            putAt: this.form.value.putAt
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['registrarForm']
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
            ship: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            fullname: ['', [Validators.required, Validators.maxLength(128)]],
            phones: ['', Validators.maxLength(128)],
            email: ['', [Validators.maxLength(128), Validators.email]],
            fax: ['', Validators.maxLength(128)],
            address: ['', Validators.maxLength(128)],
            isPrimary: true,
            isActive: true,
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('ships', 'dropdownShips', 'ship', 'description', 'description')
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
                fullname: this.record.fullname,
                ship: { 'id': this.record.ship.id, 'description': this.record.ship.description },
                phones: this.record.phones,
                email: this.record.email,
                fax: this.record.fax,
                address: this.record.address,
                isPrimary: this.record.isPrimary,
                isActive: this.record.isActive,
                postAt: this.record.postAt,
                postUser: this.record.postUser,
                putAt: this.record.putAt,
                putUser: this.record.putUser
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(registrar: RegistrarWriteDto): void {
        this.registrarService.save(registrar).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
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

    get fullname(): AbstractControl {
        return this.form.get('fullname')
    }

    get ship(): AbstractControl {
        return this.form.get('ship')
    }

    get phones(): AbstractControl {
        return this.form.get('phones')
    }

    get email(): AbstractControl {
        return this.form.get('email')
    }

    get fax(): AbstractControl {
        return this.form.get('fax')
    }

    get address(): AbstractControl {
        return this.form.get('address')
    }

    get postAt(): AbstractControl {
        return this.form.get('postAt')
    }

    get postUser(): AbstractControl {
        return this.form.get('postUser')
    }

    get putAt(): AbstractControl {
        return this.form.get('putAt')
    }

    get putUser(): AbstractControl {
        return this.form.get('putUser')
    }

    //#endregion

}
