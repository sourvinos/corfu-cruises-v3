import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Observable, map, startWith } from 'rxjs'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { NationalityVM } from '../../reservations/classes/view-models/passenger/nationality-vm'
import { ShipOwnerReadDto } from '../classes/dtos/shipOwner-read-dto'
import { ShipOwnerHttpService } from '../classes/services/shipOwner-http.service'
import { ShipOwnerWriteDto } from '../classes/dtos/shipOwner-write-dto'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'ship-owner-form',
    templateUrl: './shipOwner-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css']
})

export class ShipOwnerFormComponent {

    //#region common

    private record: ShipOwnerReadDto
    private recordId: number
    public feature = 'shipOwnerForm'
    public featureIcon = 'shipOwners'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/shipOwners'

    //#endregion

    //#region autocompletes

    public isAutoCompleteDisabled = true
    public dropdownNationalities: Observable<NationalityVM[]>
    public dropdownTaxOffices: Observable<SimpleEntity[]>
    public dropdownVatRegimes: Observable<SimpleEntity[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router, private shipOwnerService: ShipOwnerHttpService) { }

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
                this.shipOwnerService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('shipOwners', this.form.value.id)
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
            return this[array].filter((element: { [x: string]: string; }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): ShipOwnerWriteDto {
        return {
            id: this.form.value.id,
            nationalityId: this.form.value.nationality.id,
            taxOfficeId: this.form.value.taxOffice.id,
            vatRegimeId: this.form.value.vatRegime.id,
            description: this.form.value.description,
            vatNumber: this.form.value.vatNumber,
            branch: this.form.value.branch,
            profession: this.form.value.profession,
            street: this.form.value.street,
            number: this.form.value.number,
            postalCode: this.form.value.postalCode,
            city: this.form.value.city,
            personInCharge: this.form.value.personInCharge,
            phones: this.form.value.phones,
            email: this.form.value.email,
            demoUrl: this.form.value.demoUrl,
            demoUsername: this.form.value.demoUsername,
            demoSubscriptionKey: this.form.value.demoSubscriptionKey,
            liveUrl: this.form.value.liveUrl,
            liveUsername: this.form.value.liveUsername,
            liveSubscriptionKey: this.form.value.liveSubscriptionKey,
            isDemoMyData: this.form.value.isDemoMyData,
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
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['shipOwnerForm']
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
            nationality: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            taxOffice: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            vatRegime: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            description: ['', [Validators.required, Validators.maxLength(128)]],
            vatNumber: ['', [Validators.required, Validators.maxLength(36)]],
            branch: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
            profession: ['', [Validators.maxLength(128)]],
            street: ['', [Validators.maxLength(128)]],
            number: ['', [Validators.maxLength(4)]],
            postalCode: ['', [Validators.required, Validators.maxLength(10)]],
            city: ['', [Validators.required, Validators.maxLength(128)]],
            personInCharge: ['', [Validators.maxLength(128)]],
            phones: ['', [Validators.maxLength(128)]],
            email: ['', [Validators.email, Validators.maxLength(128)]],
            demoUrl: ['', [Validators.maxLength(256)]],
            demoUsername: ['', [Validators.maxLength(256)]],
            demoSubscriptionKey: ['', [Validators.maxLength(256)]],
            liveUrl: ['', [Validators.maxLength(256)]],
            liveUsername: ['', [Validators.maxLength(256)]],
            liveSubscriptionKey: ['', [Validators.maxLength(256)]],
            isDemoMyData: true,
            isActive: true,
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('nationalities', 'dropdownNationalities', 'nationality', 'description', 'description')
        this.populateDropdownFromDexieDB('taxOffices', 'dropdownTaxOffices', 'taxOffice', 'description', 'description')
        this.populateDropdownFromDexieDB('vatRegimes', 'dropdownVatRegimes', 'vatRegime', 'description', 'description')
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = this.recordId == undefined ? response.filter(x => x.isActive) : response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private populateFields(): void {
        if (this.recordId != undefined) {
            this.form.setValue({
                id: this.record.id,
                nationality: { 'id': this.record.nationality.id, 'description': this.record.nationality.description },
                taxOffice: { 'id': this.record.taxOffice.id, 'description': this.record.taxOffice.description },
                vatRegime: { 'id': this.record.vatRegime.id, 'description': this.record.vatRegime.description },
                description: this.record.description,
                vatNumber: this.record.vatNumber,
                branch: this.record.branch,
                profession: this.record.profession,
                street: this.record.street,
                number: this.record.number,
                postalCode: this.record.postalCode,
                city: this.record.city,
                personInCharge: this.record.personInCharge,
                phones: this.record.phones,
                email: this.record.email,
                demoUrl: this.record.demoUrl,
                demoUsername: this.record.demoUsername,
                demoSubscriptionKey: this.record.demoSubscriptionKey,
                liveUrl: this.record.liveUrl,
                liveUsername: this.record.liveUsername,
                liveSubscriptionKey: this.record.liveSubscriptionKey,
                isDemoMyData: this.record.isDemoMyData,
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

    private saveRecord(shipOwner: ShipOwnerWriteDto): void {
        this.shipOwnerService.save(shipOwner).subscribe({
            next: (response) => {
                this.dexieService.update('shipOwners', { 'id': parseInt(response.id), 'description': shipOwner.description, 'isActive': shipOwner.isActive })
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

    get nationality(): AbstractControl {
        return this.form.get('nationality')
    }

    get taxOffice(): AbstractControl {
        return this.form.get('taxOffice')
    }

    get vatRegime(): AbstractControl {
        return this.form.get('vatRegime')
    }

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get vatNumber(): AbstractControl {
        return this.form.get('vatNumber')
    }

    get branch(): AbstractControl {
        return this.form.get('branch')
    }

    get profession(): AbstractControl {
        return this.form.get('profession')
    }

    get street(): AbstractControl {
        return this.form.get('street')
    }

    get number(): AbstractControl {
        return this.form.get('number')
    }

    get postalCode(): AbstractControl {
        return this.form.get('postalCode')
    }

    get city(): AbstractControl {
        return this.form.get('city')
    }

    get personInCharge(): AbstractControl {
        return this.form.get('personInCharge')
    }

    get phones(): AbstractControl {
        return this.form.get('phones')
    }

    get email(): AbstractControl {
        return this.form.get('email')
    }

    get demoUrl(): AbstractControl {
        return this.form.get('demoUrl')
    }

    get demoUsername(): AbstractControl {
        return this.form.get('demoUsername')
    }

    get demoSubscriptionKey(): AbstractControl {
        return this.form.get('demoSubscriptionKey')
    }

    get liveUrl(): AbstractControl {
        return this.form.get('liveUrl')
    }

    get liveUsername(): AbstractControl {
        return this.form.get('liveUsername')
    }

    get liveSubscriptionKey(): AbstractControl {
        return this.form.get('liveSubscriptionKey')
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
