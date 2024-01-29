import { Component, Input, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms'
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

    @Input() ports: PortReadDto[]
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
        this.doCalculations()
    }

    ngOnChanges(changes: SimpleChanges): void {
        let adultsWithTransfer = 0
        let adultsAmountWithTransfer = 0
        let adultsWithoutTransfer = 0
        let adultsAmountWithoutTransfer = 0
        let kidsWithTransfer = 0
        let kidsAmountWithTransfer = 0
        let kidsWithoutTransfer = 0
        let kidsAmountWithoutTransfer = 0
        let freeWithTransfer = 0
        let freeWithoutTransfer = 0
        let pax = 0
        let amount = 0
        for (const property in changes) {
            const x = changes[property]
            if (x.previousValue != undefined) {
                x.currentValue.forEach((port: PortReadDto) => {
                    adultsWithTransfer += port.adultsWithTransfer
                    adultsAmountWithTransfer += port.adultsWithTransfer * port.adultsPriceWithTransfer
                    adultsWithoutTransfer += port.adultsWithoutTransfer
                    adultsAmountWithoutTransfer += port.adultsWithoutTransfer * port.adultsPriceWithoutTransfer
                    kidsWithTransfer += port.kidsWithTransfer
                    kidsAmountWithTransfer += port.kidsWithTransfer * port.kidsPriceWithTransfer
                    kidsWithoutTransfer += port.kidsWithoutTransfer
                    kidsAmountWithoutTransfer += port.kidsWithoutTransfer * port.kidsPriceWithoutTransfer
                    freeWithTransfer += port.freeWithTransfer
                    freeWithoutTransfer += port.freeWithoutTransfer
                    pax += port.adultsWithTransfer + port.adultsWithoutTransfer + port.kidsWithTransfer + port.kidsWithoutTransfer + port.freeWithTransfer + port.freeWithoutTransfer
                    amount += (port.adultsWithTransfer * port.adultsPriceWithTransfer) + (port.adultsWithoutTransfer * port.adultsPriceWithoutTransfer) + (port.kidsWithTransfer * port.kidsPriceWithTransfer) + (port.kidsWithoutTransfer * port.kidsPriceWithoutTransfer)
                })
                this.form.patchValue({
                    adultsWithTransfer: adultsWithTransfer,
                    adultsAmountWithTransfer: adultsAmountWithTransfer,
                    adultsWithoutTransfer: adultsWithoutTransfer,
                    adultsAmountWithoutTransfer: adultsAmountWithoutTransfer,
                    kidsWithTransfer: kidsWithTransfer,
                    kidsAmountWithTransfer: kidsAmountWithTransfer,
                    kidsWithoutTransfer: kidsWithoutTransfer,
                    kidsAmountWithoutTransfer: kidsAmountWithoutTransfer,
                    freeWithTransfer: freeWithTransfer,
                    freeWithoutTransfer: freeWithoutTransfer,
                    pax: pax,
                    amount: amount
                })
            }
        }
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
        let adultsWithTransfer = 0
        let adultsAmountWithTransfer = 0
        let adultsWithoutTransfer = 0
        let adultsAmountWithoutTransfer = 0
        let kidsWithTransfer = 0
        let kidsAmountWithTransfer = 0
        let kidsWithoutTransfer = 0
        let kidsAmountWithoutTransfer = 0
        let freeWithTransfer = 0
        let freeWithoutTransfer = 0
        let pax = 0
        let amount = 0
        this.ports.forEach(port => {
            adultsWithTransfer += port.adultsWithTransfer
            adultsAmountWithTransfer += port.adultsWithTransfer * port.adultsPriceWithTransfer
            adultsWithoutTransfer += port.adultsWithoutTransfer
            adultsAmountWithoutTransfer += port.adultsWithoutTransfer * port.adultsPriceWithoutTransfer
            kidsWithTransfer += port.kidsWithTransfer
            kidsAmountWithTransfer += port.kidsWithTransfer * port.kidsPriceWithTransfer
            kidsWithoutTransfer += port.kidsWithoutTransfer
            kidsAmountWithoutTransfer += port.kidsWithoutTransfer * port.kidsPriceWithoutTransfer
            freeWithTransfer += port.freeWithTransfer
            freeWithoutTransfer += port.freeWithoutTransfer
            pax += port.adultsWithTransfer + port.adultsWithoutTransfer + port.kidsWithTransfer + port.kidsWithoutTransfer + port.freeWithTransfer + port.freeWithoutTransfer
            amount += (port.adultsWithTransfer * port.adultsPriceWithTransfer) + (port.adultsWithoutTransfer * port.adultsPriceWithoutTransfer) + (port.kidsWithTransfer * port.kidsPriceWithTransfer) + (port.kidsWithoutTransfer * port.kidsPriceWithoutTransfer)
        })
        this.form.patchValue({
            adultsWithTransfer: adultsWithTransfer,
            adultsAmountWithTransfer: adultsAmountWithTransfer,
            adultsWithoutTransfer: adultsWithoutTransfer,
            adultsAmountWithoutTransfer: adultsAmountWithoutTransfer,
            kidsWithTransfer: kidsWithTransfer,
            kidsAmountWithTransfer: kidsAmountWithTransfer,
            kidsWithoutTransfer: kidsWithoutTransfer,
            kidsAmountWithoutTransfer: kidsAmountWithoutTransfer,
            freeWithTransfer: freeWithTransfer,
            freeWithoutTransfer: freeWithoutTransfer,
            pax: pax,
            amount: amount
        })
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
