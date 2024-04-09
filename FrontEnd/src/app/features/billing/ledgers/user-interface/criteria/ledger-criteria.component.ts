import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, EventEmitter, Output } from '@angular/core'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Observable, map, startWith } from 'rxjs'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ValidationService } from 'src/app/shared/services/validation.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'ledger-criteria',
    templateUrl: './ledger-criteria.component.html',
    styleUrls: ['./ledger-criteria.component.css']
})

export class LedgerCriteriaComponent {

    //#region common variables

    public feature = 'ledgerCriteria'
    public featureIcon = 'ledgers'
    public form: FormGroup
    public icon = 'arrow_back'

    public parentUrl = '/home'
    @Output() outputSelected = new EventEmitter()

    //#endregion

    //#region autocompletes

    public isAutoCompleteDisabled = true
    public dropdownCustomers: Observable<SimpleEntity[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dateHelperService: DateHelperService, private dexieService: DexieService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
    }

    //#endregion

    //#region public methods

    public autocompleteFields(fieldName: any, object: any): any {
        return object ? object[fieldName] : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public doDateTasks(event: any): void {
        this.updateFormControls(event)
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getDateRange(): any[] {
        const x = []
        x.push(this.form.value.fromDate)
        x.push(this.form.value.toDate)
        return x
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    public onSearch(): void {
        this.outputSelected.emit(this.form.value)
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            fromDate: ['', [Validators.required]],
            toDate: ['', [Validators.required]],
            customer: ['', [Validators.required, ValidationService.RequireAutocomplete]]
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('customersCriteria', 'dropdownCustomers', 'customer', 'description', 'description')
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string; }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private updateFormControls(event: any): void {
        this.form.patchValue({
            fromDate: this.dateHelperService.formatDateToIso(new Date(event.value.fromDate)),
            toDate: this.dateHelperService.formatDateToIso(new Date(event.value.toDate))
        })
    }

    //#endregion

    //#region getters

    get fromDate(): AbstractControl {
        return this.form.get('fromDate')
    }

    get toDate(): AbstractControl {
        return this.form.get('toDate')
    }

    get customer(): AbstractControl {
        return this.form.get('customer')
    }

    //#endregion

}
