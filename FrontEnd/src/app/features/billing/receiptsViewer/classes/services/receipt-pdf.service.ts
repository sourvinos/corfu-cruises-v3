import { Injectable } from '@angular/core'
// Custom
import { ReceiptPdfVM } from '../view-models/receipt-pdf-vm'
// Fonts
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import { strAkaAcidCanterBold } from '../../../../../../assets/fonts/Aka-Acid-CanterBold.Base64.encoded'
import { strPFHandbookPro } from '../../../../../../assets/fonts/PF-Handbook-Pro.Base64.encoded'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({ providedIn: 'root' })

export class ReceiptPdfService {

    constructor() { }

    //#region public methods

    public async createReport(invoice: ReceiptPdfVM): Promise<void> {
        this.setFonts()
        const dd = {
            pageOrientation: 'portrait',
            pageSize: 'A4',
            content:
                [
                    {
                        stack: [
                            {
                                table: {
                                    widths: ['*', 150],
                                    body: [
                                        [{ text: 'ΗΜΕΡΟΜΗΝΙΑ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.header.date, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΠΑΡΑΣΤΑΤΙΚΟ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.header.documentType.description, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΣΕΙΡΑ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.header.documentType.batch, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΝΟ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.header.invoiceNo, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΤΡΟΠΟΣ ΠΛΗΡΩΜΗΣ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.paymentMethod, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }]
                                    ]
                                }
                            }
                        ],
                        margin: [0, 0, 0, 15]
                    },
                    {
                        stack: [
                            {
                                table: {
                                    widths: ['50%', '50%'],
                                    body: [[
                                        {
                                            table: {
                                                widths: [50, '*'],
                                                body: [
                                                    [{ text: 'ΤΑ ΣΤΟΙΧΕΙΑ ΜΑΣ', alignment: 'center', colSpan: 2, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, ''],
                                                    [{ text: 'ΕΠΩΝΥΜΙΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.fullDescription, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΔΡΑΣΤΗΡΙΟΤΗΤΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.profession, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΑΦΜ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.vatNumber, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΔΟΥ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.taxOffice, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΟΔΟΣ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.street, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΑΡΙΘΜΟΣ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.number, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΠΟΛΗ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.city, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΤΚ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.postalCode, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΧΩΡΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.country, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΤΗΛΕΦΩΝΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.phones, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'EMAIL', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.issuer.email, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                ]
                                            },
                                        },
                                        {
                                            table: {
                                                widths: [50, '*'],
                                                body: [
                                                    [{ text: 'ΣΤΟΙΧΕΙΑ ΠΕΛΑΤΗ', alignment: 'center', colSpan: 2, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, ''],
                                                    [{ text: 'ΕΠΩΝΥΜΙΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.fullDescription, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΔΡΑΣΤΗΡΙΟΤΗΤΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.profession, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΑΦΜ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.vatNumber, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΔΟΥ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.taxOffice, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΟΔΟΣ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.street, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΑΡΙΘΜΟΣ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.number, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΠΟΛΗ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.city, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΤΚ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.postalCode, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΧΩΡΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.country, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΤΗΛΕΦΩΝΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.phones, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'EMAIL', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.customer.email, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                ]
                                            },
                                        },
                                    ]]
                                },
                                layout: 'noBorders'
                            }],
                        margin: [0, 0, 0, 15]
                    },
                    {
                    },
                    {
                        stack: [
                            {
                                table: {
                                    widths: ['*', 150],
                                    body: [
                                        [{ text: 'ΣΥΝΟΛΙΚΗ ΑΞΙΑ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.amount, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                    ]
                                }
                            }
                        ],
                        margin: [0, 25, 0, 0],
                    },
                    {
                        stack: [
                            {
                                table: {
                                    widths: ['*', 150],
                                    body: [
                                        [{ text: 'ΠΡΟΗΓΟΥΜΕΝΟ ΥΠΟΛΟΙΠΟ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.previousBalance.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΝΕΟ ΥΠΟΛΟΙΠΟ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.newBalance.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }]
                                    ]
                                }
                            }
                        ],
                        margin: [0, 15, 0, 0],
                    },
                    {
                        stack: [
                            {
                                table: {
                                    widths: ['50%', '50%'],
                                    body: [[
                                        {
                                            table: {
                                                body: [
                                                    [{ text: 'ΤΡΑΠΕΖΙΚΟΙ ΛΟΓΑΡΙΑΣΜΟΙ', alignment: 'center', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'], margin: [0, 1, 0, 0] }],
                                                    [{ text: invoice.bankAccounts[0], alignment: 'left', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'], margin: [0, 1, 0, 0] }],
                                                    [{ text: invoice.bankAccounts[1], alignment: 'left', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'], margin: [0, 1, 0, 0] }],
                                                    [{ text: invoice.bankAccounts[2], alignment: 'left', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'], margin: [0, 1, 0, 0] }],
                                                    [{ text: invoice.bankAccounts[3], alignment: 'left', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'], margin: [0, 1, 0, 0] }],
                                                    [{ text: invoice.bankAccounts[4], alignment: 'left', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'], margin: [0, 1, 0, 0] }]
                                                ]
                                            },
                                        },
                                    ]]
                                }, layout: 'noBorders'
                            }
                        ],
                        margin: [0, 360, 0, 0]
                    },
                ], styles: {
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
