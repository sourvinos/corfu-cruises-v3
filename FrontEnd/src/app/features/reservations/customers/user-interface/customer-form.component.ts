import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { CustomerHttpService } from '../classes/services/customer-http.service'
import { CustomerReadDto } from '../classes/dtos/customer-read-dto'
import { CustomerWriteDto } from '../classes/dtos/customer-write-dto'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { Observable, map, startWith } from 'rxjs'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './customer-form.component.css']
})

export class CustomerFormComponent {

    //#region common #8

    private record: CustomerReadDto
    private recordId: number
    public feature = 'customerForm'
    public featureIcon = 'customers'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/customers'

    //#endregion

    //#region autocompletes

    public isAutoCompleteDisabled = true
    public dropdownNationalities: Observable<SimpleEntity[]>
    public dropdownTaxOffices: Observable<SimpleEntity[]>
    public dropdownVatRegimes: Observable<SimpleEntity[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private customerHttpService: CustomerHttpService, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router) { }

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

    public formatPriceField(fieldName: string, digits: number): void {
        this.patchNumericFieldsWithZeroIfNullOrEmpty(fieldName, digits)
        this.form.patchValue({
            [fieldName]: parseFloat(this.form.value[fieldName]).toFixed(digits)
        })
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getRemarksLength(): any {
        return this.form.value.remarks != null ? this.form.value.remarks.length : 0
    }

    public onDelete(): void {
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'question', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.customerHttpService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('customers', this.form.value.id)
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

    private flattenForm(): CustomerWriteDto {
        return {
            id: this.form.value.id,
            nationalityId: this.form.value.nationality.id,
            taxOfficeId: this.form.value.taxOffice.id,
            vatRegimeId: this.form.value.vatRegime.id,
            description: this.form.value.description,
            fullDescription: this.form.value.fullDescription,
            vatNumber: this.form.value.vatNumber,
            branch: this.form.value.branch,
            profession: this.form.value.profession,
            street: this.form.value.street,
            number: this.form.value.number,
            postalCode: this.form.value.postalCode,
            city: this.form.value.city,
            phones: this.form.value.phones,
            personInCharge: this.form.value.personInCharge,
            email: this.form.value.email,
            balanceLimit: this.form.value.balanceLimit,
            remarks: this.form.value.remarks,
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
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['customerForm']
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
            fullDescription: ['', [Validators.required, Validators.maxLength(512)]],
            vatNumber: ['', [Validators.required, Validators.maxLength(36)]],
            branch: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
            profession: ['', [Validators.maxLength(128)]],
            street: ['', [Validators.maxLength(128)]],
            number: ['', [Validators.maxLength(4)]],
            postalCode: ['', [Validators.required, Validators.maxLength(10)]],
            city: ['', [Validators.required, Validators.maxLength(128)]],
            phones: ['', [Validators.maxLength(128)]],
            personInCharge: ['', [Validators.maxLength(128)]],
            email: ['', [Validators.email, Validators.maxLength(128)]],
            balanceLimit: [0, [Validators.required, Validators.min(0), Validators.max(99999.99)]],
            remarks: ['', Validators.maxLength(2048)],
            isActive: true,
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private patchNumericFieldsWithZeroIfNullOrEmpty(fieldName: string, digits: number): void {
        if (this.form.controls[fieldName].value == null || this.form.controls[fieldName].value == '') {
            this.form.patchValue({ [fieldName]: parseInt('0').toFixed(digits) })
        }
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
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                nationality: { 'id': this.record.nationality.id, 'description': this.record.nationality.description },
                taxOffice: { 'id': this.record.taxOffice.id, 'description': this.record.taxOffice.description },
                vatRegime: { 'id': this.record.vatRegime.id, 'description': this.record.vatRegime.description },
                description: this.record.description,
                fullDescription: this.record.fullDescription,
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
                balanceLimit: this.record.balanceLimit.toFixed(2),
                remarks: this.record.remarks,
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

    private saveRecord(customer: CustomerWriteDto): void {
        this.customerHttpService.save(customer).subscribe({
            next: (response: any) => {
                this.dexieService.update('customers', { 'id': parseInt(response.body.id), 'description': response.body.description, 'email': response.body.email, 'isActive': response.body.isActive })
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

    get fullDescription(): AbstractControl {
        return this.form.get('fullDescription')
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

    get balanceLimit(): AbstractControl {
        return this.form.get('balanceLimit')
    }

    get remarks(): AbstractControl {
        return this.form.get('remarks')
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
