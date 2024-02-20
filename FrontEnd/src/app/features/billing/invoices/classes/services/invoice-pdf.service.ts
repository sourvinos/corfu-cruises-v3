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

    //#region variables

    private invoice: InvoicePdfVM
    private issuer: any

    //#endregion

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
                                    ul: [
                                        invoice.header.date,
                                        invoice.header.documentTypeDescription,
                                        invoice.header.batch,
                                        invoice.header.no
                                    ]
                                },

                            ]]
                        }
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
                        }
                    },
                    {
                        table: {
                            body: [[
                                {
                                    ul: [
                                        invoice.summary.netValue,
                                        invoice.summary.vatAmount,
                                        invoice.summary.grossValue
                                    ]
                                },
                            ]]
                        }
                    },
                    {
                        table: {
                            body: [[
                                {
                                    ul: [
                                        invoice.aade.uId,
                                        invoice.aade.mark,
                                        invoice.aade.markCancel,
                                        {
                                            qr: invoice.aade.qrUrl,
                                            fit: '50'
                                        }
                                    ]
                                }
                            ]]
                        }
                    },
                    {
                        table: {
                            widths: ['33%', '33%'],
                            body: [[
                                {
                                    ul: [
                                        invoice.ports[0].adultsWithTransfer,
                                        invoice.ports[0].adultsPriceWithTransfer,
                                        invoice.ports[0].adultsAmountWithTransfer,
                                        invoice.ports[0].adultsWithoutTransfer,
                                        invoice.ports[0].adultsPriceWithoutTransfer,
                                        invoice.ports[0].adultsAmountWithoutTransfer,
                                        invoice.ports[0].kidsWithTransfer,
                                        invoice.ports[0].kidsPriceWithTransfer,
                                        invoice.ports[0].kidsAmountWithTransfer,
                                        invoice.ports[0].kidsWithoutTransfer,
                                        invoice.ports[0].kidsPriceWithoutTransfer,
                                        invoice.ports[0].kidsAmountWithoutTransfer,
                                        invoice.ports[0].freeWithTransfer,
                                        invoice.ports[0].freeWithoutTransfer
                                    ]
                                }, {
                                    ul: [
                                        invoice.ports[1].adultsWithTransfer,
                                        invoice.ports[1].adultsPriceWithTransfer,
                                        invoice.ports[1].adultsAmountWithTransfer,
                                        invoice.ports[1].adultsWithoutTransfer,
                                        invoice.ports[1].adultsPriceWithoutTransfer,
                                        invoice.ports[1].adultsAmountWithoutTransfer,
                                        invoice.ports[1].kidsWithTransfer,
                                        invoice.ports[1].kidsPriceWithTransfer,
                                        invoice.ports[1].kidsAmountWithTransfer,
                                        invoice.ports[1].kidsWithoutTransfer,
                                        invoice.ports[1].kidsPriceWithoutTransfer,
                                        invoice.ports[1].kidsAmountWithoutTransfer,
                                        invoice.ports[1].freeWithTransfer,
                                        invoice.ports[1].freeWithoutTransfer
                                    ]
                                }
                            ]]
                        }
                    }

                ],
            // { qr: invoice.aade.qrUrl, fit: '50' },
            // ],
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
