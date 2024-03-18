import { Injectable } from '@angular/core'
// Custom
import { InvoicePdfVM } from '../view-models/pdf/invoice-pdf-vm'
import { LogoService } from 'src/app/features/reservations/reservations/classes/services/logo.service'
// Fonts
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import { strAkaAcidCanterBold } from '../../../../../../assets/fonts/Aka-Acid-CanterBold.Base64.encoded'
import { strPFHandbookPro } from '../../../../../../assets/fonts/PF-Handbook-Pro.Base64.encoded'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({ providedIn: 'root' })

export class InvoicePdfService {

    constructor(private logoService: LogoService) { }

    //#region public methods

    public async createReport(invoice: InvoicePdfVM): Promise<void> {
        this.setFonts()
        const dd = {
            background: this.setBackgroundImage(),
            pageOrientation: 'portrait',
            pageSize: 'A4',
            content:
                [
                    {
                        table: {
                            body: [[
                                {
                                    type: 'none',
                                    ul: [
                                        { text: 'Ημερομηνία: ' + invoice.header.date },
                                        { text: 'Παραστατικό: ' + invoice.header.documentTypeDescription },
                                        { text: 'Σειρά: ' + invoice.header.batch },
                                        { text: 'Νο: ' + invoice.header.invoiceNo }
                                    ]
                                }
                            ]]
                        },
                        layout: 'noBorders'
                    },
                    {
                        table: {
                            widths: ['50%', '50%'],
                            body: [[
                                {
                                    type: 'none',
                                    ul: [
                                        { text: 'Τα στοιχεία μας' },
                                        invoice.issuer.fullDescription,
                                        invoice.issuer.profession,
                                        invoice.issuer.phones,
                                        invoice.issuer.email,
                                        invoice.issuer.vatNumber,
                                        invoice.issuer.country,
                                        invoice.issuer.street,
                                        invoice.issuer.number,
                                        invoice.issuer.city,
                                        invoice.issuer.postalCode
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        { text: 'Τα στοιχεία σας' },
                                        invoice.counterPart.fullDescription,
                                        invoice.counterPart.profession,
                                        invoice.counterPart.phones,
                                        invoice.counterPart.email,
                                        invoice.counterPart.vatNumber,
                                        invoice.counterPart.country,
                                        invoice.counterPart.street,
                                        invoice.counterPart.number,
                                        invoice.counterPart.city,
                                        invoice.counterPart.postalCode
                                    ]
                                }
                            ]]
                        },
                        layout: 'noBorders'
                    },
                    {
                        table: {
                            widths: ['50%', '50%'],
                            body: [[
                                {
                                    type: 'none',
                                    ul: [
                                        { text: 'Αναχωρήσεις από CORFU PORT' },
                                        { text: 'Ενήλικες' },
                                        { text: 'Με transfer: ' + invoice.ports[0].adultsWithTransfer + ' x ' + invoice.ports[0].adultsPriceWithTransfer + ' = ' + invoice.ports[0].adultsAmountWithTransfer },
                                        { text: 'Χωρίς transfer: ' + invoice.ports[0].adultsWithoutTransfer + ' x ' + invoice.ports[0].adultsPriceWithoutTransfer + ' = ' + invoice.ports[0].adultsAmountWithoutTransfer },
                                        { text: 'Παιδιά' },
                                        { text: 'Με transfer: ' + invoice.ports[0].kidsWithTransfer + ' x ' + invoice.ports[0].kidsPriceWithTransfer + ' = ' + invoice.ports[0].kidsAmountWithTransfer },
                                        { text: 'Χωρίς transfer: ' + invoice.ports[0].kidsWithoutTransfer + ' x ' + invoice.ports[0].kidsPriceWithoutTransfer + ' = ' + invoice.ports[0].kidsAmountWithoutTransfer },
                                        { text: 'Δωρεάν' },
                                        { text: 'Με transfer: ' + invoice.ports[0].freeWithTransfer },
                                        { text: 'Χωρίς transfer: ' + invoice.ports[0].freeWithoutTransfer }
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        { text: 'Αναχωρήσεις από LEFKIMMI PORT' },
                                        { text: 'Ενήλικες' },
                                        { text: 'Με transfer: ' + invoice.ports[1].adultsWithTransfer + ' x ' + invoice.ports[1].adultsPriceWithTransfer + ' = ' + invoice.ports[1].adultsAmountWithTransfer },
                                        { text: 'Χωρίς transfer: ' + invoice.ports[1].adultsWithoutTransfer + ' x ' + invoice.ports[1].adultsPriceWithoutTransfer + ' = ' + invoice.ports[1].adultsAmountWithoutTransfer },
                                        { text: 'Παιδιά' },
                                        { text: 'Με transfer: ' + invoice.ports[1].kidsWithTransfer + ' x ' + invoice.ports[1].kidsPriceWithTransfer + ' = ' + invoice.ports[1].kidsAmountWithTransfer },
                                        { text: 'Χωρίς transfer: ' + invoice.ports[1].kidsWithoutTransfer + ' x ' + invoice.ports[1].kidsPriceWithoutTransfer + ' = ' + invoice.ports[1].kidsAmountWithoutTransfer },
                                        { text: 'Δωρεάν' },
                                        { text: 'Με transfer: ' + invoice.ports[1].freeWithTransfer },
                                        { text: 'Χωρίς transfer: ' + invoice.ports[1].freeWithoutTransfer }

                                    ]
                                }
                            ]]
                        },
                        layout: 'noBorders'
                    },
                    {
                        table: {
                            body: [[
                                {
                                    type: 'none',
                                    ul: [
                                        { text: 'Καθαρή αξία ' + invoice.summary.netValue },
                                        { text: 'ΦΠΑ 24% ' + invoice.summary.vatAmount },
                                        { text: 'Συνολική αξία ' + invoice.summary.grossValue }
                                    ]
                                },
                            ]]
                        },
                        layout: 'noBorders'
                    },
                ],
            footer: {
                type: 'none',
                ul: [
                    {
                        qr: invoice.aade.qrUrl,
                        fit: '50'
                    },
                ],
                margin: [40, -50, 0, -40],
                layout: 'noBorders'
            },
            styles: {
                AkaAcidCanterBold: {
                    font: 'AkaAcidCanterBold',
                },
                PFHandbookPro: {
                    font: 'PFHandbookPro',
                },
                paddingLeft: {
                    margin: [40, 0, 0, 0]
                },
                paddingTop: {
                    margin: [0, 15, 0, 0]
                }
            },
            defaultStyle: {
                font: 'PFHandbookPro',
                fontSize: 7
            }
        }
        this.createPdf(dd)
    }

    //#endregion

    //#region private methods

    private createPdf(document: any): void {
        pdfMake.createPdf(document).open({}, window)
    }

    private setBackgroundImage(): any[] {
        return [
            {
                image: this.logoService.getLogo('light'),
                width: '1000',
                opacity: 0.03
            }
        ]
    }

    private setFonts(): void {
        pdfFonts.pdfMake.vfs['AkaAcidCanterBold'] = strAkaAcidCanterBold
        pdfFonts.pdfMake.vfs['PFHandbookPro'] = strPFHandbookPro
        pdfMake.fonts = {
            AkaAcidCanterBold: { normal: 'AkaAcidCanterBold' },
            PFHandbookPro: { normal: 'PFHandbookPro' }
        }
    }

    //#endregion

}
