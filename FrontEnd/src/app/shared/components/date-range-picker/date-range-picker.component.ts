import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, EventEmitter, Output } from '@angular/core'
// Custom
import { DateHelperService } from '../../services/date-helper.service'
import { MessageInputHintService } from '../../services/message-input-hint.service'
import { MessageLabelService } from '../../services/message-label.service'

@Component({
    selector: 'date-range-picker',
    templateUrl: './date-range-picker.component.html'
})

export class DateRangePickerComponent {

    //#region variables

    @Output() outputValues = new EventEmitter()

    private formValue = new EventEmitter<any>()
    public feature = 'ledgerCriteria'
    public form: FormGroup

    //#endregion

    constructor(private dateHelperService: DateHelperService, private formBuilder: FormBuilder, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
    }

    //#endregion

    //#region public methods

    public emitFormValues(): void {
        this.outputValues.emit(this.form)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public gotoToday(): void {
        this.form.patchValue({ fromDate: this.dateHelperService.formatDateToIso(new Date()), toDate: this.dateHelperService.formatDateToIso(new Date()) })
    }

    public patchFormWithSelectedDates(
        fromDate: any, toDate: any): void { this.form.patchValue({ fromDate: fromDate.value != null ? this.dateHelperService.formatDateToIso(new Date(fromDate.value)) : '', toDate: toDate.value != null ? this.dateHelperService.formatDateToIso(new Date(toDate.value)) : '' }) }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            toDate: [this.dateHelperService.formatDateToIso(new Date()), [Validators.required]],
            fromDate: [this.dateHelperService.formatDateToIso(new Date()), [Validators.required]],
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

    //#endregion

}

