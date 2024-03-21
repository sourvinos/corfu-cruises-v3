import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { InvoicePdfAadeVM } from '../view-models/pdf/invoice-pdf-aade-vm'
import { InvoicePdfHeaderVM } from '../view-models/pdf/invoice-pdf-header-vm'
import { InvoicePdfPartyTypeVM } from '../view-models/pdf/invoice-pdf-partyType-vm'
import { InvoicePdfPortVM } from '../view-models/pdf/invoice-pdf-port-vm'
import { InvoicePdfSummaryVM } from '../view-models/pdf/invoice-pdf-summary-vm'
import { InvoicePdfVM } from '../view-models/pdf/invoice-pdf-vm'

@Injectable({ providedIn: 'root' })

export class InvoicePdfHelperService {

    constructor(private dateHelperService: DateHelperService, private dexieService: DexieService) { }

    //#region public methods

    public async createPdfInvoiceParts(invoice: InvoicePdfVM): Promise<any> {
        const header = await this.buildHeader(invoice)
        const issuer = await this.buildIssuer(invoice)
        const counterPart = await this.buildCounterPart(invoice)
        const summary = await this.buildSummary(invoice)
        const aade = await this.buildAade(invoice)
        const ports = await this.buildPorts(invoice)
        const ship = await this.buildShip(invoice)
        const paymentMethod = await this.buildPaymentMethod(invoice)
        const bankAccounts = await this.buildBankAccounts()
        const balances = await this.buildBalances()
        return {
            header,
            issuer,
            counterPart,
            summary,
            aade,
            ports,
            ship,
            paymentMethod,
            bankAccounts,
            balances
        }
    }

    //#endregion

    //#region private methods

    private buildHeader(formValue: any): Promise<any> {
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

    private buildIssuer(formValue: any): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfPartyTypeVM = {
                branch: formValue.issuer.branch,
                city: formValue.issuer.city,
                country: formValue.issuer.nationality.description,
                email: formValue.issuer.email,
                fullDescription: formValue.issuer.fullDescription,
                number: formValue.issuer.number,
                phones: formValue.issuer.phones,
                postalCode: formValue.issuer.postalCode,
                profession: formValue.issuer.profession,
                street: formValue.issuer.street,
                taxOffice: formValue.issuer.taxOffice.description,
                vatNumber: formValue.issuer.vatNumber,
            }
            resolve(x)
        })
    }

    private buildCounterPart(formValue: any): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfPartyTypeVM = {
                branch: formValue.customer.branch,
                city: formValue.customer.city,
                country: formValue.customer.nationality.description,
                email: formValue.customer.email,
                fullDescription: formValue.customer.fullDescription,
                number: formValue.customer.number,
                phones: formValue.customer.phones,
                postalCode: formValue.customer.postalCode,
                profession: formValue.customer.profession,
                street: formValue.customer.street,
                taxOffice: formValue.customer.taxOffice.description,
                vatNumber: formValue.customer.vatNumber,
            }
            resolve(x)
        })
    }

    private buildSummary(formValue: any): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfSummaryVM = {
                netValue: formValue.netAmount,
                vatAmount: formValue.vatAmount,
                grossValue: formValue.grossAmount,
            }
            resolve(x)
        })

    }

    private buildAade(formValue: any): Promise<any> {
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

    private buildPorts(formValue: any): Promise<any> {
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

    private buildShip(formValue: any): Promise<any> {
        return new Promise((resolve) => {
            const x: string = formValue.ship
            resolve(x)
        })
    }

    private buildPaymentMethod(formValue: any): Promise<any> {
        return new Promise((resolve) => {
            const x: string = formValue.paymentMethod
            resolve(x)
        })
    }

    private buildBalances(): Promise<any> {
        return new Promise((resolve) => {
            const x: number[] = [
                1234.56,
                7890.56
            ]
            resolve(x)
        })
    }

    private buildBankAccounts(): Promise<any> {
        return new Promise((resolve) => {
            const x: string[] = [
                'ΠΕΙΡΑΙΩΣ GR17 0171 1740 0061 7413 5517 925',
                'ALPHA BANK GR41 0140 5950 5950 0233 0002 010',
                'EUROBANK GR53 0260 4450 0003 5020 0621 503',
                'ΕΘΝΙΚΗ GR22 0110 8670 0000 8670 0263 444',
                'ATTICA BANK GR43 0160 8730 0000 0008 5207 750',
                ' '
            ]
            resolve(x)
        })

    }

    //#endregion

}
