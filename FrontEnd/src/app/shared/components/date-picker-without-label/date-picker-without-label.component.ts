import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, EventEmitter, Input, Output } from '@angular/core'
// Custom
import { DateHelperService } from '../../services/date-helper.service'
import { MessageInputHintService } from '../../services/message-input-hint.service'
import { MessageLabelService } from '../../services/message-label.service'

@Component({
    selector: 'date-picker-without-label',
    templateUrl: './date-picker-without-label.component.html'
})

export class DatePickerWithOutLabelComponent {

    //#region variables

    @Input() parentDate: string
    @Output() outputValue = new EventEmitter()

    public feature = 'date-picker'
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
        this.outputValue.emit(this.form)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public doTodayTasks(): void {
        this.form.patchValue({
            date: this.dateHelperService.formatDateToIso(new Date())
        })
        this.emitFormValues()
    }

    public patchFormWithSelectedDates(date: any): void {
        this.form.patchValue({
            date: date.value != null ? this.dateHelperService.formatDateToIso(new Date(date.value)) : ''
        })
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            date: [this.parentDate, [Validators.required]]
        })
    }

    //#endregion

    //#region getters

    get date(): AbstractControl {
        return this.form.get('date')
    }

    //#endregion

}
