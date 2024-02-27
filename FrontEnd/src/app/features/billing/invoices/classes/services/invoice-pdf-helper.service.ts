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
                no: formValue.no
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
            formValue.invoicesPorts.forEach((port: InvoicePdfPortVM) => {
                const z: InvoicePdfPortVM = {
                    adultsWithTransfer: port.adultsWithTransfer,
                    adultsPriceWithTransfer: port.adultsPriceWithTransfer,
                    adultsAmountWithTransfer: port.adultsWithTransfer * port.adultsPriceWithTransfer,
                    adultsWithoutTransfer: port.adultsWithoutTransfer,
                    adultsPriceWithoutTransfer: port.adultsPriceWithoutTransfer,
                    adultsAmountWithoutTransfer: port.adultsWithoutTransfer * port.adultsPriceWithoutTransfer,
                    kidsWithTransfer: port.kidsWithTransfer,
                    kidsPriceWithTransfer: port.kidsPriceWithTransfer,
                    kidsAmountWithTransfer: port.kidsWithTransfer * port.kidsPriceWithTransfer,
                    kidsWithoutTransfer: port.kidsWithoutTransfer,
                    kidsPriceWithoutTransfer: port.kidsPriceWithoutTransfer,
                    kidsAmountWithoutTransfer: port.kidsWithoutTransfer * port.kidsPriceWithoutTransfer,
                    freeWithTransfer: port.freeWithTransfer,
                    freeWithoutTransfer: port.freeWithoutTransfer
                }
                x.push(z)
            })
            resolve(x)
        })
    }

}