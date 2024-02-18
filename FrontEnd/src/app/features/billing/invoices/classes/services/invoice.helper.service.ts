import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { InvoiceWriteDto } from '../dtos/form/invoice-write-dto'
import { PortWriteDto } from '../dtos/form/port-write-dto'

@Injectable({ providedIn: 'root' })

export class InvoiceHelperService {

    constructor(private dateHelperService: DateHelperService, private dexieService: DexieService) { }

    //#region public methods

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
