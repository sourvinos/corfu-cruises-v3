import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { InvoiceWriteDto } from '../dtos/form/invoice-write-dto'
import { PortWriteDto } from '../dtos/form/port-write-dto'

@Injectable({ providedIn: 'root' })

export class InvoiceHelperService {

    constructor(private dateHelperService: DateHelperService) { }

    //#region public methods

    public calculatePortA(formValue: any): any {
        const adults_A_AmountWithTransfer = formValue.portA.adults_A_WithTransfer * formValue.portA.adults_A_PriceWithTransfer
        const adults_A_AmountWithoutTransfer = formValue.portA.adults_A_WithoutTransfer * formValue.portA.adults_A_PriceWithoutTransfer
        const kids_A_AmountWithTransfer = formValue.portA.kids_A_WithTransfer * formValue.portA.kids_A_PriceWithTransfer
        const kids_A_AmountWithoutTransfer = formValue.portA.kids_A_WithoutTransfer * formValue.portA.kids_A_PriceWithoutTransfer
        const total_A_Persons = formValue.portA.adults_A_WithTransfer + formValue.portA.adults_A_WithoutTransfer + formValue.portA.kids_A_WithTransfer + formValue.portA.kids_A_WithoutTransfer + formValue.portA.free_A_WithTransfer + formValue.portA.free_A_WithoutTransfer
        const total_A_Amount = adults_A_AmountWithTransfer + adults_A_AmountWithoutTransfer + kids_A_AmountWithTransfer + kids_A_AmountWithoutTransfer
        return {
            adults_A_AmountWithTransfer,
            adults_A_AmountWithoutTransfer,
            kids_A_AmountWithTransfer,
            kids_A_AmountWithoutTransfer,
            total_A_Persons,
            total_A_Amount
        }
    }

    public calculatePortB(formValue: any): any {
        const adults_B_AmountWithTransfer = formValue.portB.adults_B_WithTransfer * formValue.portB.adults_B_PriceWithTransfer
        const adults_B_AmountWithoutTransfer = formValue.portB.adults_B_WithoutTransfer * formValue.portB.adults_B_PriceWithoutTransfer
        const kids_B_AmountWithTransfer = formValue.portB.kids_B_WithTransfer * formValue.portB.kids_B_PriceWithTransfer
        const kids_B_AmountWithoutTransfer = formValue.portB.kids_B_WithoutTransfer * formValue.portB.kids_B_PriceWithoutTransfer
        const total_B_Persons = formValue.portB.adults_B_WithTransfer + formValue.portB.adults_B_WithoutTransfer + formValue.portB.kids_B_WithTransfer + formValue.portB.kids_B_WithoutTransfer + formValue.portB.free_B_WithTransfer + formValue.portB.free_B_WithoutTransfer
        const total_B_Amount = adults_B_AmountWithTransfer + adults_B_AmountWithoutTransfer + kids_B_AmountWithTransfer + kids_B_AmountWithoutTransfer
        return {
            adults_B_AmountWithTransfer,
            adults_B_AmountWithoutTransfer,
            kids_B_AmountWithTransfer,
            kids_B_AmountWithoutTransfer,
            total_B_Persons,
            total_B_Amount
        }
    }

    public calculatePortTotals(formValue: any): any {
        const adultsWithTransfer = formValue.portA.adults_A_WithTransfer + formValue.portB.adults_B_WithTransfer
        const adultsAmountWithTransfer = formValue.portA.adults_A_AmountWithTransfer + formValue.portB.adults_B_AmountWithTransfer
        const adultsWithoutTransfer = formValue.portA.adults_A_WithoutTransfer + formValue.portB.adults_B_WithoutTransfer
        const adultsAmountWithoutTransfer = formValue.portA.adults_A_AmountWithoutTransfer + formValue.portB.adults_B_AmountWithoutTransfer
        const kidsWithTransfer = formValue.portA.kids_A_WithTransfer + formValue.portB.kids_B_WithTransfer
        const kidsAmountWithTransfer = formValue.portA.kids_A_AmountWithTransfer + formValue.portB.kids_B_AmountWithTransfer
        const kidsWithoutTransfer = formValue.portA.kids_A_WithoutTransfer + formValue.portB.kids_B_WithoutTransfer
        const kidsAmountWithoutTransfer = formValue.portA.kids_A_AmountWithoutTransfer + formValue.portB.kids_B_AmountWithoutTransfer
        const freeWithTransfer = formValue.portA.free_A_WithTransfer + formValue.portB.free_B_WithTransfer
        const freeWithoutTransfer = formValue.portA.free_A_WithoutTransfer + formValue.portB.free_B_WithoutTransfer
        const totalPersons = adultsWithTransfer + adultsWithoutTransfer + kidsWithTransfer + kidsWithoutTransfer + freeWithTransfer + freeWithoutTransfer
        const totalAmount =
            (formValue.portA.adults_A_WithTransfer * formValue.portA.adults_A_PriceWithTransfer) + (formValue.portB.adults_B_WithTransfer * formValue.portB.adults_B_PriceWithTransfer) +
            (formValue.portA.adults_A_WithoutTransfer * formValue.portA.adults_A_PriceWithoutTransfer) + (formValue.portB.adults_B_WithoutTransfer * formValue.portB.adults_B_PriceWithoutTransfer) +
            (formValue.portA.kids_A_WithTransfer * formValue.portA.kids_A_PriceWithTransfer) + (formValue.portB.kids_B_WithTransfer * formValue.portB.kids_B_PriceWithTransfer) +
            (formValue.portA.kids_A_WithoutTransfer * formValue.portA.kids_A_PriceWithoutTransfer) + (formValue.portB.kids_B_WithoutTransfer * formValue.portB.kids_B_PriceWithoutTransfer)
        return {
            adultsWithTransfer,
            adultsAmountWithTransfer,
            adultsWithoutTransfer,
            adultsAmountWithoutTransfer,
            kidsWithTransfer,
            kidsAmountWithTransfer,
            kidsWithoutTransfer,
            kidsAmountWithoutTransfer,
            freeWithTransfer,
            freeWithoutTransfer,
            totalPersons,
            totalAmount
        }
    }


    public flattenForm(form: any): InvoiceWriteDto {
        return {
            invoiceId: form.invoiceId != '' ? form.invoiceId : null,
            date: this.dateHelperService.formatDateToIso(new Date(form.date)),
            no: form.no,
            customerId: form.customer.id,
            destinationId: form.destination.id,
            documentTypeId: form.documentType.id,
            paymentMethodId: form.paymentMethod.id,
            shipId: form.ship.id,
            netAmount: form.netAmount,
            vatPercent: form.vatPercent,
            vatAmount: form.vatAmount,
            grossAmount: form.grossAmount,
            remarks: form.remarks,
            putAt: form.putAt,
            invoicesPorts: this.mapPorts(form)
        }
    }

    //#endregion

    //#region private methods

    private mapPorts(form: any): PortWriteDto[] {
        const ports = []
        form.invoicesPorts.forEach((port: any) => {
            const x: PortWriteDto = {
                invoiceId: port.invoiceId != '' ? port.invoiceId : null,
                portId: port.port.id,
                adultsWithTransfer: port.adultsWithTransfer,
                adultsPriceWithTransfer: port.adultsPriceWithTransfer,
                adultsWithoutTransfer: port.adultsWithoutTransfer,
                adultsPriceWithoutTransfer: port.adultsPriceWithoutTransfer,
                kidsWithTransfer: port.kidsWithTransfer,
                kidsPriceWithTransfer: port.kidsPriceWithTransfer,
                kidsWithoutTransfer: port.kidsWithoutTransfer,
                kidsPriceWithoutTransfer: port.kidsPriceWithoutTransfer,
                freeWithTransfer: port.freeWithTransfer,
                freeWithoutTransfer: port.freeWithoutTransfer
            }
            ports.push(x)
        })
        return ports
    }

    //#endregion

}
