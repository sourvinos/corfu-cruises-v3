import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PortReadDto } from '../../classes/dtos/form/port-read-dto'

@Component({
    selector: 'invoice-port-form',
    templateUrl: './port-form.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/forms.css', './port-form.component.css']
})

export class InvoicePortFormComponent {

    //#region variables

    @Input() port: PortReadDto
    @Input() portIndex: number
    @Output() outputPort = new EventEmitter()
    public feature = 'invoicePortForm'
    public form: FormGroup
    public input: InputTabStopDirective

    //#endregion

    constructor(private formBuilder: FormBuilder, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateFields()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDoCalculationTasks(): any {
        this.calculate()
        this.emitValues()
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            invoiceId: '',
            port: this.formBuilder.group({ id: this.port.port.id, description: this.port.port.description }),
            adultsWithTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            adultsPriceWithTransfer: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
            adultsAmountWithTransfer: [0],
            adultsWithoutTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            adultsPriceWithoutTransfer: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
            adultsAmountWithoutTransfer: [0],
            kidsWithTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            kidsPriceWithTransfer: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
            kidsAmountWithTransfer: [0],
            kidsWithoutTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            kidsPriceWithoutTransfer: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
            kidsAmountWithoutTransfer: [0],
            freeWithTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            freeWithoutTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            pax: 0,
            amount: 0
        })
    }

    private calculate(): void {
        const adultsAmountWithTransfer = this.form.value.adultsWithTransfer * this.form.value.adultsPriceWithTransfer
        const adultsAmountWithoutTransfer = this.form.value.adultsWithoutTransfer * this.form.value.adultsPriceWithoutTransfer
        const kidsAmountWithTransfer = this.form.value.kidsWithTransfer * this.form.value.kidsPriceWithTransfer
        const kidsAmountWithoutTransfer = this.form.value.kidsWithoutTransfer * this.form.value.kidsPriceWithoutTransfer
        const pax = this.form.value.adultsWithTransfer + this.form.value.adultsWithoutTransfer + this.form.value.kidsWithTransfer + this.form.value.kidsWithoutTransfer + this.form.value.freeWithTransfer + this.form.value.freeWithoutTransfer
        const amount = adultsAmountWithTransfer + adultsAmountWithoutTransfer + kidsAmountWithTransfer + kidsAmountWithoutTransfer
        this.form.patchValue({
            adultsAmountWithTransfer: adultsAmountWithTransfer,
            adultsAmountWithoutTransfer: adultsAmountWithoutTransfer,
            kidsAmountWithTransfer: kidsAmountWithTransfer,
            kidsAmountWithoutTransfer: kidsAmountWithoutTransfer,
            pax: pax,
            amount: amount
        })
    }

    private emitValues(): void {
        this.outputPort.emit(this.form.value)
    }

    private populateFields(): void {
        this.form.patchValue({
            invoiceId: this.port.invoiceId,
            port: {
                id: this.port.port.id,
                description: this.port.port.description
            },
            adultsWithTransfer: this.port.adultsWithTransfer,
            adultsPriceWithTransfer: this.port.adultsPriceWithTransfer,
            adultsAmountWithTransfer: this.port.adultsWithTransfer * this.port.adultsPriceWithTransfer,
            adultsWithoutTransfer: this.port.adultsWithoutTransfer,
            adultsPriceWithoutTransfer: this.port.adultsPriceWithoutTransfer,
            adultsAmountWithoutTransfer: this.port.adultsWithoutTransfer * this.port.adultsPriceWithoutTransfer,
            kidsWithTransfer: this.port.kidsWithTransfer,
            kidsPriceWithTransfer: this.port.kidsPriceWithTransfer,
            kidsAmountWithTransfer: this.port.kidsWithTransfer * this.port.kidsPriceWithTransfer,
            kidsWithoutTransfer: this.port.kidsWithoutTransfer,
            kidsPriceWithoutTransfer: this.port.kidsPriceWithoutTransfer,
            kidsAmountWithoutTransfer: this.port.kidsWithoutTransfer * this.port.kidsPriceWithoutTransfer,
            freeWithTransfer: this.port.freeWithTransfer,
            freeWithoutTransfer: this.port.freeWithoutTransfer,
            pax: this.port.adultsWithTransfer + this.port.adultsWithoutTransfer + this.port.kidsWithTransfer + this.port.kidsWithoutTransfer + this.port.freeWithTransfer + this.port.freeWithoutTransfer,
            amount: this.port.amount
        })
    }

    //#endregion

    //#region getters

    get description(): AbstractControl {
        return this.form.get('port.description')
    }

    get adultsWithTransfer(): AbstractControl {
        return this.form.get('adultsWithTransfer')
    }

    get adultsPriceWithTransfer(): AbstractControl {
        return this.form.get('adultsPriceWithTransfer')
    }

    get adultsAmountWithTransfer(): AbstractControl {
        return this.form.get('adultsAmountWithTransfer')
    }

    get adultsWithoutTransfer(): AbstractControl {
        return this.form.get('adultsWithoutTransfer')
    }

    get adultsPriceWithoutTransfer(): AbstractControl {
        return this.form.get('adultsPriceWithoutTransfer')
    }

    get adultsAmountWithoutTransfer(): AbstractControl {
        return this.form.get('adultsAmountWithoutTransfer')
    }

    get kidsWithTransfer(): AbstractControl {
        return this.form.get('kidsWithTransfer')
    }

    get kidsPriceWithTransfer(): AbstractControl {
        return this.form.get('kidsPriceWithTransfer')
    }

    get kidsAmountWithTransfer(): AbstractControl {
        return this.form.get('kidsAmountWithTransfer')
    }

    get kidsWithoutTransfer(): AbstractControl {
        return this.form.get('kidsWithoutTransfer')
    }

    get kidsPriceWithoutTransfer(): AbstractControl {
        return this.form.get('kidsPriceWithoutTransfer')
    }

    get kidsAmountWithoutTransfer(): AbstractControl {
        return this.form.get('kidsAmountWithoutTransfer')
    }

    get freeWithTransfer(): AbstractControl {
        return this.form.get('freeWithTransfer')
    }

    get freeWithoutTransfer(): AbstractControl {
        return this.form.get('freeWithoutTransfer')
    }

    get pax(): AbstractControl {
        return this.form.get('pax')
    }

    get amount(): AbstractControl {
        return this.form.get('amount')
    }

    //#endregion

}
