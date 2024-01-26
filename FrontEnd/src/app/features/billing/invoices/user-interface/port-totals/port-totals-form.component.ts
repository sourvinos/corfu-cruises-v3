import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PortReadDto } from '../../classes/dtos/port-read-dto'

@Component({
    selector: 'invoice-port-totals-form',
    templateUrl: './port-totals-form.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/forms.css', './port-totals-form.component.css']
})

export class InvoicePortTotalsFormComponent {

    //#region common #8

    private record: PortReadDto
    private recordId: string
    public feature = 'invoicePortForm'
    public featureIcon = 'ports'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/invoices'

    //#endregion

    constructor(private formBuilder: FormBuilder, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
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

    private initForm(): void {
        this.form = this.formBuilder.group({
            port: '',
            adultsWithTransfer: 0,
            adultsPriceWithTransfer: 0,
            adultsAmountWithTransfer: 0,
            adultsWithoutTransfer: 0,
            adultsPriceWithoutTransfer: 0,
            adultsAmountWithoutTransfer: 0,
            kidsWithTransfer: 0,
            kidsPriceWithTransfer: 0,
            kidsAmountWithTransfer: 0,
            kidsWithoutTransfer: 0,
            kidsPriceWithoutTransfer: 0,
            kidsAmountWithoutTransfer: 0,
            free: 0,
            total: 0,
            totalAmount: 0
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

    get free(): AbstractControl {
        return this.form.get('free')
    }

    get total(): AbstractControl {
        return this.form.get('total')
    }

    get totalAmount(): AbstractControl {
        return this.form.get('totalAmount')
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
