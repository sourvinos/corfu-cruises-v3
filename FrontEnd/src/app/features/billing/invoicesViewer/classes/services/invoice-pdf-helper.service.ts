import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { InvoicePdfAadeVM } from '../view-models/pdf/invoice-pdf-aade-vm'
import { InvoicePdfHeaderVM } from '../view-models/pdf/invoice-pdf-header-vm'
import { InvoicePdfPartyTypeVM } from '../view-models/pdf/invoice-pdf-partyType-vm'
import { InvoicePdfPortVM } from '../view-models/pdf/invoice-pdf-port-vm'
import { InvoicePdfSummaryVM } from '../view-models/pdf/invoice-pdf-summary-vm'
import { InvoiceViewerVM } from '../view-models/viewer/invoiceViewer-vm'

@Injectable({ providedIn: 'root' })

export class InvoicePdfHelperService {

    constructor(private dateHelperService: DateHelperService, private dexieService: DexieService) { }

    public async createPdfInvoiceParts(formValue: InvoiceViewerVM): Promise<any> {
        const header = await this.buildHeader(formValue)
        const issuer = await this.buildIssuer(formValue)
        const counterPart = await this.buildCounterPart(formValue)
        const summary = await this.buildSummary(formValue)
        const aade = await this.buildAade(formValue)
        const ports = await this.buildPorts(formValue)
        return {
            header,
            issuer,
            counterPart,
            summary,
            aade,
            ports
        }
    }

    private buildHeader(formValue: InvoiceViewerVM): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfHeaderVM = {
                date: this.dateHelperService.formatISODateToLocale(formValue.date),
                documentTypeDescription: formValue.documentType.description,
                batch: formValue.documentType.batch,
                invoiceNo: formValue.invoiceNo
            }
            resolve(x)
        })
    }

    private buildIssuer(formValue: InvoiceViewerVM): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfPartyTypeVM = {
                fullDescription: formValue.issuer.fullDescription,
                profession: formValue.issuer.profession,
                phones: formValue.issuer.phones,
                email: formValue.issuer.email,
                vatNumber: formValue.issuer.vatNumber,
                country: formValue.issuer.nationality.description,
                branch: formValue.issuer.branch,
                street: formValue.issuer.street,
                number: formValue.issuer.number,
                postalCode: formValue.issuer.postalCode,
                city: formValue.issuer.city,
                taxOffice: formValue.issuer.taxOffice.description
            }
            resolve(x)
        })
    }

    private buildCounterPart(formValue: InvoiceViewerVM): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfPartyTypeVM = {
                fullDescription: formValue.customer.fullDescription,
                profession: formValue.customer.profession,
                phones: formValue.customer.phones,
                email: formValue.customer.email,
                vatNumber: formValue.customer.vatNumber,
                country: formValue.issuer.nationality.description,
                branch: formValue.customer.branch,
                street: formValue.customer.street,
                number: formValue.customer.number,
                postalCode: formValue.customer.postalCode,
                city: formValue.customer.city,
                taxOffice: formValue.issuer.taxOffice.description
            }
            resolve(x)
        })
    }

    private buildSummary(formValue: InvoiceViewerVM): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfSummaryVM = {
                netValue: formValue.netAmount,
                vatAmount: formValue.vatAmount,
                grossValue: formValue.grossAmount,
            }
            resolve(x)
        })

    }

    private buildAade(formValue: InvoiceViewerVM): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfAadeVM = {
                uId: formValue.aade.uId,
                mark: formValue.aade.mark,
                markCancel: formValue.aade.markCancel,
                qrUrl: formValue.aade.qrUrl,
            }
            resolve(x)
        })
    }

    private buildPorts(formValue: InvoiceViewerVM): Promise<any> {
        const x = []
        return new Promise((resolve) => {
            const z: InvoicePdfPortVM = {
                adultsWithTransfer: formValue.invoicesPorts[0].adultsWithTransfer,
                adultsPriceWithTransfer: formValue.invoicesPorts[0].adultsPriceWithTransfer,
                adultsAmountWithTransfer: formValue.invoicesPorts[0].adultsWithTransfer * formValue.invoicesPorts[0].adultsPriceWithTransfer,
                adultsWithoutTransfer: formValue.invoicesPorts[0].adultsWithoutTransfer,
                adultsPriceWithoutTransfer: formValue.invoicesPorts[0].adultsPriceWithoutTransfer,
                adultsAmountWithoutTransfer: formValue.invoicesPorts[0].adultsWithoutTransfer * formValue.invoicesPorts[0].adultsPriceWithoutTransfer,
                kidsWithTransfer: formValue.invoicesPorts[0].kidsWithTransfer,
                kidsPriceWithTransfer: formValue.invoicesPorts[0].kidsPriceWithTransfer,
                kidsAmountWithTransfer: formValue.invoicesPorts[0].kidsWithTransfer * formValue.invoicesPorts[0].kidsPriceWithTransfer,
                kidsWithoutTransfer: formValue.invoicesPorts[0].kidsWithoutTransfer,
                kidsPriceWithoutTransfer: formValue.invoicesPorts[0].kidsPriceWithoutTransfer,
                kidsAmountWithoutTransfer: formValue.invoicesPorts[0].kidsWithoutTransfer * formValue.invoicesPorts[0].kidsPriceWithoutTransfer,
                freeWithTransfer: formValue.invoicesPorts[0].freeWithTransfer,
                freeWithoutTransfer: formValue.invoicesPorts[0].freeWithoutTransfer
            }
            x.push(z)
            const i: InvoicePdfPortVM = {
                adultsWithTransfer: formValue.invoicesPorts[1].adultsWithTransfer,
                adultsPriceWithTransfer: formValue.invoicesPorts[1].adultsPriceWithTransfer,
                adultsAmountWithTransfer: formValue.invoicesPorts[1].adultsWithTransfer * formValue.invoicesPorts[1].adultsPriceWithTransfer,
                adultsWithoutTransfer: formValue.invoicesPorts[1].adultsWithoutTransfer,
                adultsPriceWithoutTransfer: formValue.invoicesPorts[1].adultsPriceWithoutTransfer,
                adultsAmountWithoutTransfer: formValue.invoicesPorts[1].adultsWithoutTransfer * formValue.invoicesPorts[1].adultsPriceWithoutTransfer,
                kidsWithTransfer: formValue.invoicesPorts[1].kidsWithTransfer,
                kidsPriceWithTransfer: formValue.invoicesPorts[1].kidsPriceWithTransfer,
                kidsAmountWithTransfer: formValue.invoicesPorts[1].kidsWithTransfer * formValue.invoicesPorts[1].kidsPriceWithTransfer,
                kidsWithoutTransfer: formValue.invoicesPorts[1].kidsWithoutTransfer,
                kidsPriceWithoutTransfer: formValue.invoicesPorts[1].kidsPriceWithoutTransfer,
                kidsAmountWithoutTransfer: formValue.invoicesPorts[1].kidsWithoutTransfer * formValue.invoicesPorts[1].kidsPriceWithoutTransfer,
                freeWithTransfer: formValue.invoicesPorts[1].freeWithTransfer,
                freeWithoutTransfer: formValue.invoicesPorts[1].freeWithoutTransfer
            }
            x.push(i)
            resolve(x)
        })
    }

}
