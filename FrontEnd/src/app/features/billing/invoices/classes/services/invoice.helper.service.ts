import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { InvoiceWriteDto } from '../dtos/form/invoice-write-dto'
import { InvoiceXmlHeaderDto } from '../dtos/xml/invoice-xml-header-dto'
import { InvoiceXmlPartyTypeDto } from '../dtos/xml/invoice-xml-partyType-dto'
import { PortWriteDto } from '../dtos/form/port-write-dto'
import { InvoiceXmlPaymentMethodDto } from '../dtos/xml/invoice-xml-paymentMethod-dto'
import { InvoiceXmlRowDto } from '../dtos/xml/invoice-xml-row-dto'
import { InvoiceXmlSummaryDto } from '../dtos/xml/invoice-xml-summary-dto'
import { InvoiceXmlDto } from '../dtos/xml/invoice-xml-dto'

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

    public async createXmlInvoiceParts(formValue: any): Promise<any> {
        const invoiceId = formValue.invoiceId
        const issuer = await this.buildIssuer('ships', formValue.ship.id)
        const counterPart = await this.buildCounterPart('customers', formValue.customer.id)
        const invoiceHeader = await this.buildHeader('documentTypes', formValue.documentType.id, formValue.date)
        const paymentMethods = await this.buildPaymentMethods('paymentMethods', formValue.paymentMethod.id, formValue.grossAmount)
        const invoiceDetails = await this.buildInvoiceDetails('documentTypes', formValue.documentType.id, formValue.netAmount, formValue.vatAmount)
        const invoiceSummary = await this.buildInvoiceSummary('documentTypes', formValue.documentType.id, formValue.netAmount, formValue.vatAmount, formValue.grossAmount)
        return {
            invoiceId,
            issuer,
            counterPart,
            invoiceHeader,
            paymentMethods,
            invoiceDetails,
            invoiceSummary
        }
    }

    public createXmlInvoiceFromParts(response: any): InvoiceXmlDto {
        const x: InvoiceXmlDto = {
            invoiceId: response.invoiceId,
            issuer: response.issuer,
            counterPart: response.counterPart,
            invoiceHeader: response.invoiceHeader,
            paymentMethods: response.paymentMethods,
            invoiceDetails: response.invoiceDetails,
            invoiceSummary: response.invoiceSummary
        }
        return x
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

    private buildIssuer(table: string, id: number): Promise<any> {
        return new Promise((resolve) => {
            this.dexieService.getById(table, id).then(response => {
                const x: InvoiceXmlPartyTypeDto = {
                    vatNumber: response.shipOwner.taxNo,
                    country: response.shipOwner.nationality.code,
                    branch: response.shipOwner.branch,
                    address: {
                        street: response.shipOwner.address,
                        number: 'party.address.number',
                        postalCode: response.shipOwner.postalCode,
                        city: response.shipOwner.city
                    }
                }
                resolve(x)
            })
        })
    }

    private buildCounterPart(table: string, id: number): Promise<any> {
        return new Promise((resolve) => {
            this.dexieService.getById(table, id).then(response => {
                const x: InvoiceXmlPartyTypeDto = {
                    vatNumber: response.taxNo,
                    country: response.nationality.code,
                    branch: response.branch,
                    address: {
                        street: response.address,
                        number: 'party.address.number',
                        postalCode: response.postalCode,
                        city: response.city
                    }
                }
                resolve(x)
            })
        })
    }

    private buildHeader(table: string, id: number, date: string): Promise<any> {
        return new Promise((resolve) => {
            this.dexieService.getById(table, id).then(response => {
                const x: InvoiceXmlHeaderDto = {
                    series: response.batch,
                    aa: ++response.lastNo,
                    issueDate: this.dateHelperService.formatDateToIso(new Date(date)),
                    invoiceType: response.table8_1,
                    currency: 'EUR'
                }
                resolve(x)
            })
        })
    }

    private buildPaymentMethods(table: string, id: number, amount: number): Promise<any> {
        return new Promise((resolve) => {
            this.dexieService.getById(table, id).then(response => {
                const x: InvoiceXmlPaymentMethodDto[] = [{
                    paymentMethodDetails: {
                        type: response.myDataId,
                        amount: amount
                    }
                }]
                resolve(x)
            })
        })
    }

    private buildInvoiceDetails(table: string, id: number, netValue: number, vatAmount: number): Promise<any> {
        return new Promise((resolve) => {
            this.dexieService.getById(table, id).then(response => {
                const x: InvoiceXmlRowDto[] = [{
                    lineNumber: 1,
                    netValue: netValue,
                    vatCategory: 1,
                    vatAmount: vatAmount,
                    incomeClassification: {
                        classificationType: response.table8_9,
                        classificationCategory: response.table8_8,
                        amount: netValue
                    }
                }]
                resolve(x)
            })
        })
    }

    private buildInvoiceSummary(table: string, id: number, netValue: number, vatAmount: number, totalGrossValue: number): Promise<any> {
        return new Promise((resolve) => {
            this.dexieService.getById(table, id).then(response => {
                const x: InvoiceXmlSummaryDto = {
                    totalNetValue: netValue,
                    totalVatAmount: vatAmount,
                    totalWithheldAmount: 0,
                    totalFeesAmount: 0,
                    totalStampDutyAmount: 0,
                    totalOtherTaxesAmount: 0,
                    totalDeductionsAmount: 0,
                    totalGrossValue: totalGrossValue,
                    incomeClassification: {
                        classificationType: response.table8_9,
                        classificationCategory: response.table8_8,
                        amount: netValue
                    }
                }
                resolve(x)
            })
        })
    }

    //#endregion

}
