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
                                        invoice.issuer.description,
                                        invoice.issuer.profession,
                                        invoice.issuer.phones,
                                        invoice.issuer.email,
                                        invoice.issuer.vatNumber,
                                        invoice.issuer.country,
                                        invoice.issuer.address.street,
                                        invoice.issuer.address.number,
                                        invoice.issuer.address.city,
                                        invoice.issuer.address.postalCode
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        { text: 'Τα στοιχεία σας' },
                                        invoice.counterPart.description,
                                        invoice.counterPart.profession,
                                        invoice.counterPart.phones,
                                        invoice.counterPart.email,
                                        invoice.counterPart.vatNumber,
                                        invoice.counterPart.country,
                                        invoice.counterPart.address.street,
                                        invoice.counterPart.address.number,
                                        invoice.counterPart.address.city,
                                        invoice.counterPart.address.postalCode
                                    ]
                                }
                            ]]
                        },
                        layout: 'noBorders'
                    },
                    {
                        table: {
                            widths: ['35%', '35%', '30%'],
                            body: [[
                                {
                                    table: {
                                        body: [
                                            ['ΑΝΑΧΩΡΗΣΕΙΣ ΑΠΟ CORFU PORT', '', '', ''],
                                            ['ΕΝΗΛΙΚΕΣ', '', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[0].adultsWithTransfer, invoice.ports[0].adultsPriceWithTransfer, invoice.ports[0].adultsAmountWithTransfer],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].adultsWithoutTransfer, invoice.ports[0].adultsPriceWithoutTransfer, invoice.ports[0].adultsAmountWithoutTransfer],
                                            ['ΠΑΙΔΙΑ', '', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[0].kidsWithTransfer, invoice.ports[0].kidsPriceWithTransfer, invoice.ports[0].kidsAmountWithTransfer],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].kidsWithoutTransfer, invoice.ports[0].kidsPriceWithoutTransfer, invoice.ports[0].kidsAmountWithoutTransfer],
                                            ['ΔΩΡΕΑΝ', '', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[0].freeWithTransfer, '', ''],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].freeWithoutTransfer, '', ''],
                                        ]
                                    },
                                    layout: 'noBorders'
                                },
                                {
                                    table: {
                                        body: [
                                            ['ΑΝΑΧΩΡΗΣΕΙΣ ΑΠΟ LEFKIMMI PORT', '', '', ''],
                                            ['ΕΝΗΛΙΚΕΣ', '', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[1].adultsWithTransfer, invoice.ports[1].adultsPriceWithTransfer, invoice.ports[1].adultsAmountWithTransfer],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[1].adultsWithoutTransfer, invoice.ports[1].adultsPriceWithoutTransfer, invoice.ports[1].adultsAmountWithoutTransfer],
                                            ['ΠΑΙΔΙΑ', '', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[1].kidsWithTransfer, invoice.ports[1].kidsPriceWithTransfer, invoice.ports[1].kidsAmountWithTransfer],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[1].kidsWithoutTransfer, invoice.ports[1].kidsPriceWithoutTransfer, invoice.ports[1].kidsAmountWithoutTransfer],
                                            ['ΔΩΡΕΑΝ', '', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[1].freeWithTransfer, '', ''],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[1].freeWithoutTransfer, '', ''],
                                        ]
                                    },
                                    layout: 'noBorders'
                                },
                                {
                                    table: {
                                        body: [
                                            ['ΣΥΝΟΛΟ', '', ''],
                                            ['ΕΝΗΛΙΚΕΣ', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[0].adultsWithTransfer + invoice.ports[1].adultsWithTransfer, invoice.ports[0].adultsAmountWithTransfer + invoice.ports[1].adultsAmountWithTransfer],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].adultsWithoutTransfer + invoice.ports[1].adultsWithoutTransfer, invoice.ports[0].adultsAmountWithoutTransfer + invoice.ports[1].adultsAmountWithoutTransfer],
                                            ['ΠΑΙΔΙΑ', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[0].kidsWithTransfer + invoice.ports[1].kidsWithTransfer, invoice.ports[0].kidsAmountWithTransfer + invoice.ports[1].kidsAmountWithTransfer],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].kidsWithoutTransfer + invoice.ports[0].kidsWithoutTransfer, invoice.ports[0].kidsAmountWithoutTransfer + invoice.ports[1].kidsAmountWithoutTransfer],
                                            ['ΔΩΡΕΑΝ', '', ''],
                                            ['ΜΕ TRANSFER', invoice.ports[0].freeWithTransfer + invoice.ports[1].freeWithTransfer, ''],
                                            ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].freeWithoutTransfer + invoice.ports[1].freeWithoutTransfer, ''],
                                        ]
                                    },
                                    layout: 'noBorders'
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
                                        { text: 'ΦΠΑ 13% ' + invoice.summary.vatAmount },
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
        pdfMake.createPdf(document).open()
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
