import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, EventEmitter, Input, Output } from '@angular/core'
// Custom
import { DateHelperService } from '../../services/date-helper.service'
import { InputTabStopDirective } from '../../directives/input-tabstop.directive'
import { MessageInputHintService } from '../../services/message-input-hint.service'
import { MessageLabelService } from '../../services/message-label.service'

@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css']
})

export class DatePickerComponent {

    //#region variables

    @Input() dataTabIndex: number
    @Input() label: string
    @Input() isAdminOrNewRecord: boolean
    @Input() parentDate: string
    @Input() readOnly: boolean
    @Input() showHint: boolean
    @Output() outputValue = new EventEmitter()

    public feature = 'date-picker'
    public form: FormGroup
    public input: InputTabStopDirective

    //#endregion

    constructor(private dateHelperService: DateHelperService, private formBuilder: FormBuilder, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
    }

    //#endregion

    //#region public methods

    public doTodayTasks(): void {
        this.form.patchValue({
            date: this.dateHelperService.formatDateToIso(new Date())
        })
        // this.emitFormValues()
    }

    public emitFormValues(): void {
        this.outputValue.emit(this.form)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
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

