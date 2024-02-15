import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms'
// Custom
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PortReadDto } from '../../classes/dtos/form/port-read-dto'

@Component({
    selector: 'invoice-port-totals-form',
    templateUrl: './port-totals-form.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/forms.css', './port-totals-form.component.css']
})

export class InvoicePortTotalsFormComponent {

    //#region variables

    @Input() ports: PortReadDto[]
    @Output() outputPorts = new EventEmitter()
    public feature = 'invoicePortForm'
    public featureIcon = 'ports'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/invoices'

    //#endregion

    //#region amounts

    private aWT = 0
    private aAWT = 0
    private aWoT = 0
    private aAWoT = 0
    private kWT = 0
    private kAWT = 0
    private kWoT = 0
    private kAWoT = 0
    private fWT = 0
    private fWoT = 0
    private p = 0
    private a = 0

    //#endregion

    constructor(private formBuilder: FormBuilder, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.doCalculations()
        this.patchForm()
        this.emitValues()
    }

    ngDoCheck(): void {
        this.doCalculations()
        this.patchForm()
        this.emitValues()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    //#endregion

    //#region private methods

    private doCalculations(): void {
        this.aWT = 0
        this.aAWT = 0
        this.aWoT = 0
        this.aAWoT = 0
        this.kWT = 0
        this.kAWT = 0
        this.kWoT = 0
        this.kAWoT = 0
        this.fWT = 0
        this.fWoT = 0
        this.p = 0
        this.a = 0
        this.ports.forEach(port => {
            this.aWT += port.adultsWithTransfer
            this.aAWT += port.adultsWithTransfer * port.adultsPriceWithTransfer
            this.aWoT += port.adultsWithoutTransfer
            this.aAWT += port.adultsWithoutTransfer * port.adultsPriceWithoutTransfer
            this.kWT += port.kidsWithTransfer
            this.kAWT += port.kidsWithTransfer * port.kidsPriceWithTransfer
            this.kWoT += port.kidsWithoutTransfer
            this.kAWT += port.kidsWithoutTransfer * port.kidsPriceWithoutTransfer
            this.fWT += port.freeWithTransfer
            this.fWoT += port.freeWithoutTransfer
            this.p += port.adultsWithTransfer + port.adultsWithoutTransfer + port.kidsWithTransfer + port.kidsWithoutTransfer + port.freeWithTransfer + port.freeWithoutTransfer
            this.a += (port.adultsWithTransfer * port.adultsPriceWithTransfer) + (port.adultsWithoutTransfer * port.adultsPriceWithoutTransfer) + (port.kidsWithTransfer * port.kidsPriceWithTransfer) + (port.kidsWithoutTransfer * port.kidsPriceWithoutTransfer)
        })
    }

    private patchForm(): void {
        this.form.patchValue({
            adultsWithTransfer: this.aWT,
            adultsAmountWithTransfer: this.aAWT,
            adultsWithoutTransfer: this.aWoT,
            adultsAmountWithoutTransfer: this.aAWoT,
            kidsWithTransfer: this.kWT,
            kidsAmountWithTransfer: this.kAWT,
            kidsWithoutTransfer: this.kWoT,
            kidsAmountWithoutTransfer: this.kAWoT,
            freeWithTransfer: this.fWT,
            freeWithoutTransfer: this.fWoT,
            pax: this.p,
            amount: this.a
        })
    }

    private emitValues(): void {
        this.outputPorts.emit(this.form.value)
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            port: '',
            adultsWithTransfer: 0,
            adultsAmountWithTransfer: 0,
            adultsWithoutTransfer: 0,
            adultsAmountWithoutTransfer: 0,
            kidsWithTransfer: 0,
            kidsAmountWithTransfer: 0,
            kidsWithoutTransfer: 0,
            kidsAmountWithoutTransfer: 0,
            freeWithTransfer: 0,
            freeWithoutTransfer: 0,
            pax: 0,
            amount: 0
        })
    }

    //#endregion

    //#region getters

    get port(): AbstractControl {
        return this.form.get('port')
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
