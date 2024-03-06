import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { InvoicePdfHeaderVM } from '../view-models/pdf/invoice-pdf-header-vm'
import { InvoicePdfPartyTypeVM } from '../view-models/pdf/invoice-pdf-partyType-vm'
import { InvoicePdfSummaryVM } from '../view-models/pdf/invoice-pdf-summary-vm'
import { InvoicePdfAadeVM } from '../view-models/pdf/invoice-pdf-aade-vm'
import { InvoicePdfPortVM } from '../view-models/pdf/invoice-pdf-port-vm'

@Injectable({ providedIn: 'root' })

export class InvoicePdfHelperService {

    constructor(private dateHelperService: DateHelperService, private dexieService: DexieService) { }

    public async createPdfInvoiceParts(formValue: any): Promise<any> {
        const header = await this.buildHeader(formValue)
        const issuer = await this.buildIssuer('ships', formValue.ship.id)
        const counterPart = await this.buildCounterPart('customers', formValue.customer.id)
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

    private buildHeader(formValue: any): Promise<any> {
        return new Promise((resolve) => {
            const x: InvoicePdfHeaderVM = {
                date: this.dateHelperService.formatISODateToLocale(formValue.date),
                documentTypeDescription: formValue.documentTypeDescription,
                batch: formValue.batch,
                invoiceNo: formValue.invoiceNo
            }
            resolve(x)
        })
    }

    private buildIssuer(table: string, id: number): Promise<any> {
        return new Promise((resolve) => {
            this.dexieService.getById(table, id).then(response => {
                const x: InvoicePdfPartyTypeVM = {
                    description: response.shipOwner.description,
                    profession: response.shipOwner.profession,
                    phones: response.shipOwner.phones,
                    email: response.shipOwner.email,
                    vatNumber: response.shipOwner.vatNumber,
                    country: response.shipOwner.nationality.code,
                    branch: response.shipOwner.branch,
                    address: {
                        street: response.shipOwner.address,
                        number: response.shipOwner.number,
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
                const x: InvoicePdfPartyTypeVM = {
                    description: response.description,
                    profession: response.profession,
                    phones: response.phones,
                    email: response.email,
                    vatNumber: response.vatNumber,
                    country: response.nationality.code,
                    branch: response.branch,
                    address: {
                        street: response.address,
                        number: response.number,
                        postalCode: response.postalCode,
                        city: response.city,
                    }
                }
                resolve(x)
            })
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
                adultsWithTransfer: formValue.portA.adults_A_WithTransfer,
                adultsPriceWithTransfer: formValue.portA.adults_A_PriceWithTransfer,
                adultsAmountWithTransfer: formValue.portA.adults_A_WithTransfer * formValue.portA.adults_A_PriceWithTransfer,
                adultsWithoutTransfer: formValue.portA.adults_A_WithoutTransfer,
                adultsPriceWithoutTransfer: formValue.portA.adults_A_PriceWithoutTransfer,
                adultsAmountWithoutTransfer: formValue.portA.adults_A_WithoutTransfer * formValue.portA.adults_A_PriceWithoutTransfer,
                kidsWithTransfer: formValue.portA.kids_A_WithTransfer,
                kidsPriceWithTransfer: formValue.portA.kids_A_PriceWithTransfer,
                kidsAmountWithTransfer: formValue.portA.kids_A_WithTransfer * formValue.portA.kids_A_PriceWithTransfer,
                kidsWithoutTransfer: formValue.portA.kids_A_WithoutTransfer,
                kidsPriceWithoutTransfer: formValue.portA.kids_A_PriceWithoutTransfer,
                kidsAmountWithoutTransfer: formValue.portA.kids_A_WithoutTransfer * formValue.portA.kids_A_PriceWithoutTransfer,
                freeWithTransfer: formValue.portA.free_A_WithTransfer,
                freeWithoutTransfer: formValue.portA.free_A_WithoutTransfer
            }
            x.push(z)
            const i: InvoicePdfPortVM = {
                adultsWithTransfer: formValue.portB.adults_B_WithTransfer,
                adultsPriceWithTransfer: formValue.portB.adults_B_PriceWithTransfer,
                adultsAmountWithTransfer: formValue.portB.adults_B_WithTransfer * formValue.portB.adults_B_PriceWithTransfer,
                adultsWithoutTransfer: formValue.portB.adults_B_WithoutTransfer,
                adultsPriceWithoutTransfer: formValue.portB.adults_B_PriceWithoutTransfer,
                adultsAmountWithoutTransfer: formValue.portB.adults_B_WithoutTransfer * formValue.portB.adults_B_PriceWithoutTransfer,
                kidsWithTransfer: formValue.portB.kids_B_WithTransfer,
                kidsPriceWithTransfer: formValue.portB.kids_B_PriceWithTransfer,
                kidsAmountWithTransfer: formValue.portB.kids_B_WithTransfer * formValue.portB.kids_B_PriceWithTransfer,
                kidsWithoutTransfer: formValue.portB.kids_B_WithoutTransfer,
                kidsPriceWithoutTransfer: formValue.portB.kids_B_PriceWithoutTransfer,
                kidsAmountWithoutTransfer: formValue.portB.kids_B_WithoutTransfer * formValue.portB.kids_B_PriceWithoutTransfer,
                freeWithTransfer: formValue.portB.free_B_WithTransfer,
                freeWithoutTransfer: formValue.portB.free_B_WithoutTransfer
            }
            x.push(i)
            resolve(x)
        })
    }

}
