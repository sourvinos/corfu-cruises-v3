import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { InvoiceReadDto } from '../dtos/form/invoice-read-dto'
import { InvoiceWriteDto } from '../dtos/form/invoice-write-dto'
import { InvoiceXmlDto } from '../dtos/xml/invoice-xml-dto'
import { InvoiceXmlPartyTypeDto } from '../dtos/xml/invoice-xml-partyType-dto'
import { PortWriteDto } from '../dtos/form/port-write-dto'
import { InvoiceXmlHeaderDto } from '../dtos/xml/invoice-xml-header-dto'

@Injectable({ providedIn: 'root' })

export class InvoiceHelperService {

    constructor(private dateHelperService: DateHelperService) { }

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

    public buildXmlViewModel(formValue: any): Promise<InvoiceXmlDto> {
        return new Promise((resolve) => {
            const x: InvoiceXmlDto = {
                issuer: this.buildParty(formValue.ship),
                counterPart: this.buildParty(formValue.customer),
                invoiceHeader: this.buildHeader(formValue.invoice),
                paymentMethod: {
                    type: 0,
                    amount: 0,
                    paymentMethodInfo: ''
                },
                invoiceRow: {
                    lineNumber: 0,
                    netValue: 0,
                    vatCategory: 0,
                    vatAmount: 0
                },
                invoiceSummary: {
                    totalNetValue: 0,
                    totalVatAmount: 0,
                    totalWithheldAmount: 0,
                    totalFeesAmount: 0,
                    totalStampDutyAmount: 0,
                    totalOtherTaxesAmount: 0,
                    totalDeductionsAmount: 0,
                    totalGrossValue: 0,
                    incomeClassification: {
                        classificationType: '',
                        classificationCategory: '',
                        amount: 0
                    }

                }

            }
            resolve(x)
        })
    }

    //#endregion

    //#region private methods

    private mapPorts(form: any): PortWriteDto[] {
        const ports = []
        form.invoicesPorts.forEach((port: any) => {
            const x: PortWriteDto = {
                invoiceId: port.invoiceId,
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

    private buildParty(party: InvoiceXmlPartyTypeDto): InvoiceXmlPartyTypeDto {
        return {
            vatNumber: party.vatNumber,
            country: party.country,
            branch: party.branch,
            address: {
                street: party.address.street,
                number: party.address.number,
                postalCode: party.address.postalCode,
                city: party.address.city
            }
        }
    }

    private buildHeader(invoice: InvoiceReadDto): InvoiceXmlHeaderDto {
        return {
            series: '',
            aa: invoice.no,
            issueDate: invoice.date,
            invoiceType: '',
            currency: ''
        }
    }

    //#endregion

}
