import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InvoiceListCriteriaVM } from './../../../classes/view-models/criteria/invoice-list-criteria-vm'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Component({
    selector: 'invoice-list-criteria',
    templateUrl: './invoice-list-criteria.component.html',
    styleUrls: ['./invoice-list-criteria.component.css']
})

export class InvoiceListCriteriaComponent {

    //#region variables

    @Output() outputSelected = new EventEmitter()

    private criteria: InvoiceListCriteriaVM
    public feature = 'invoiceListCriteria'
    public form: FormGroup

    //#endregion

    constructor(private dateHelperService: DateHelperService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setInvoiceListCriteria()
        this.populateFieldsFromStoredVariables()
        this.emitValues()
    }

    //#endregion

    //#region public methods

    public doDateTasks(event: any): void {
        this.updateFormControls(event)
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

    public onSearch(): void {
        this.sessionStorageService.saveItem('invoice-list-criteria', JSON.stringify(this.form.value))
        this.outputSelected.emit(this.form.value)
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    public patchFormWithSelectedDateRange(event: any): void {
        this.form.patchValue({
            fromDate: this.dateHelperService.formatDateToIso(new Date(event.value.fromDate)),
            toDate: this.dateHelperService.formatDateToIso(new Date(event.value.toDate))
        })
    }

    //#endregion

    //#region private methods

    private emitValues(): void {
        this.outputSelected.emit(this.form.value)
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            fromDate: ['', [Validators.required]],
            toDate: ['', [Validators.required]]
        })
    }

    private setInvoiceListCriteria(): void {
        if (this.sessionStorageService.getItem('invoice-list-criteria') == '') {
            const criteria: InvoiceListCriteriaVM = {
                fromDate: this.dateHelperService.formatDateToIso(new Date()),
                toDate: this.dateHelperService.formatDateToIso(new Date())
            }
            this.sessionStorageService.saveItem('invoice-list-criteria', JSON.stringify(criteria))
        }
    }

    private populateFieldsFromStoredVariables(): void {
        if (this.sessionStorageService.getItem('invoice-list-criteria')) {
            this.criteria = JSON.parse(this.sessionStorageService.getItem('invoice-list-criteria'))
            this.form.patchValue({
                fromDate: this.criteria.fromDate,
                toDate: this.criteria.toDate
            })
        }
    }

    private updateFormControls(event: any): void {
        this.form.patchValue({
            fromDate: this.dateHelperService.formatDateToIso(new Date(event.value.fromDate)),
            toDate: this.dateHelperService.formatDateToIso(new Date(event.value.toDate))
        })
    }

    //#endregion

}
