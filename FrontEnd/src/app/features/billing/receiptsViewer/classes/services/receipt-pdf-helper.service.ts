import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { ReceiptPdfHeaderVM } from '../view-models/receipt-pdf-header-vm'
import { ReceiptPdfPartyTypeVM } from '../view-models/receipt-pdf-partyType-vm'
import { ReceiptPdfVM } from '../view-models/receipt-pdf-vm'

@Injectable({ providedIn: 'root' })

export class ReceiptPdfHelperService {

    constructor(private dateHelperService: DateHelperService) { }

    //#region public methods

    public async createPdfReceiptParts(receipt: ReceiptPdfVM): Promise<any> {
        const header = await this.buildHeader(receipt)
        const issuer = await this.buildIssuer(receipt.issuer)
        const customer = await this.buildCounterPart(receipt.customer)
        const paymentMethod = await this.buildPaymentMethod(receipt.paymentMethod)
        const amount = receipt.amount
        const bankAccounts = await this.buildBankAccounts()
        const previousBalance = receipt.previousBalance
        const newBalance = receipt.newBalance
        return {
            header,
            issuer,
            customer,
            paymentMethod,
            amount,
            bankAccounts,
            previousBalance,
            newBalance
        }
    }

    //#endregion

    //#region private methods

    private buildHeader(receipt: ReceiptPdfVM): Promise<any> {
        return new Promise((resolve) => {
            const x: ReceiptPdfHeaderVM = {
                date: this.dateHelperService.formatISODateToLocale(receipt.header.date),
                tripDate: this.dateHelperService.formatISODateToLocale(receipt.header.tripDate),
                documentType: {
                    description: receipt.header.documentType.description,
                    batch: receipt.header.documentType.batch,
                },
                invoiceNo: receipt.header.invoiceNo
            }
            resolve(x)
        })
    }

    private buildIssuer(issuer: ReceiptPdfPartyTypeVM): Promise<any> {
        return new Promise((resolve) => {
            const x: ReceiptPdfPartyTypeVM = {
                branch: issuer.branch,
                city: issuer.city,
                country: issuer.country,
                email: issuer.email,
                fullDescription: issuer.fullDescription,
                number: issuer.number,
                phones: issuer.phones,
                postalCode: issuer.postalCode,
                profession: issuer.profession,
                street: issuer.street,
                taxOffice: issuer.taxOffice,
                vatNumber: issuer.vatNumber
            }
            resolve(x)
        })
    }

    private buildCounterPart(counterPart: ReceiptPdfPartyTypeVM): Promise<any> {
        return new Promise((resolve) => {
            const x: ReceiptPdfPartyTypeVM = {
                branch: counterPart.branch,
                city: counterPart.city,
                country: counterPart.country,
                email: counterPart.email,
                fullDescription: counterPart.fullDescription,
                number: counterPart.number,
                phones: counterPart.phones,
                postalCode: counterPart.postalCode,
                profession: counterPart.profession,
                street: counterPart.street,
                taxOffice: counterPart.taxOffice,
                vatNumber: counterPart.vatNumber
            }
            resolve(x)
        })
    }

    private buildPaymentMethod(paymentMethod: string): Promise<any> {
        return new Promise((resolve) => {
            const x: string = paymentMethod
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
