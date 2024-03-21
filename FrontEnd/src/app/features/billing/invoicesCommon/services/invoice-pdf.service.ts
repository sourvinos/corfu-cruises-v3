import { Injectable } from '@angular/core'
// Custom
import { InvoicePdfVM } from '../view-models/pdf/invoice-pdf-vm'
import { LogoService } from 'src/app/features/reservations/reservations/classes/services/logo.service'
// Fonts
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import { strAkaAcidCanterBold } from '../../../../../assets/fonts/Aka-Acid-CanterBold.Base64.encoded'
import { strPFHandbookPro } from '../../../../../assets/fonts/PF-Handbook-Pro.Base64.encoded'
import { InvoicePdfPortVM } from '../view-models/pdf/invoice-pdf-port-vm'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({ providedIn: 'root' })

export class InvoicePdfService {

    constructor(private logoService: LogoService) { }

    //#region public methods

    public async createReport(invoice: InvoicePdfVM): Promise<void> {
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
                                        [{ text: 'ΠΑΡΑΣΤΑΤΙΚΟ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.header.documentTypeDescription, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΣΕΙΡΑ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.header.batch, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
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
                                    widths: ['*', 150],
                                    body: [
                                        [{ text: 'ΠΛΟΙΟ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.ship, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }]
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
                                                    [{ text: 'ΕΠΩΝΥΜΙΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.fullDescription, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΔΡΑΣΤΗΡΙΟΤΗΤΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.profession, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΑΦΜ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.vatNumber, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΔΟΥ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.taxOffice, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΟΔΟΣ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.street, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΑΡΙΘΜΟΣ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.number, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΠΟΛΗ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.city, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΤΚ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.postalCode, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΧΩΡΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.country, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'ΤΗΛΕΦΩΝΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.phones, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'EMAIL', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.counterPart.email, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
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
                        table: {
                            widths: ['*', '*', '*'],
                            body: [
                                [
                                    {
                                        table: {
                                            widths: [50, '*', '*', '*'],
                                            body: [
                                                [{ text: 'ΑΝΑΧΩΡΗΣΕΙΣ ΑΠΟ CORFU PORT', colSpan: 4, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', '', ''],
                                                [{ text: 'ΕΝΗΛΙΚΕΣ', colSpan: 4, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].adultsWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].adultsPriceWithTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].adultsAmountWithTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].adultsWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].adultsPriceWithoutTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].adultsAmountWithoutTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΠΑΙΔΙΑ', colSpan: 4, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].kidsWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].kidsPriceWithTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].kidsAmountWithTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].kidsWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].kidsPriceWithoutTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].kidsAmountWithoutTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΔΩΡΕΑΝ', colSpan: 4, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].freeWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].freeWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΣΥΝΟΛΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: this.calculateTotalPersonsPerPort(invoice.ports[0]), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: this.calculateTotalAmountsPerPort(invoice.ports[0]), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                            ],
                                        },
                                    },
                                    {
                                        table: {
                                            widths: [50, '*', '*', '*'],
                                            body: [
                                                [{ text: 'ΑΝΑΧΩΡΗΣΕΙΣ ΑΠΟ LEFKIMMI PORT', colSpan: 4, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', '', ''],
                                                [{ text: 'ΕΝΗΛΙΚΕΣ', colSpan: 4, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].adultsWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].adultsPriceWithTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].adultsAmountWithTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].adultsWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].adultsPriceWithoutTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].adultsAmountWithoutTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΠΑΙΔΙΑ', colSpan: 4, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].kidsWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].kidsPriceWithTransfer.toFixed(2), alignment: 'right' }, { text: invoice.ports[1].kidsAmountWithTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].kidsWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].kidsPriceWithoutTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].kidsAmountWithoutTransfer.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΔΩΡΕΑΝ', colSpan: 4, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].freeWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[1].freeWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΣΥΝΟΛΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: this.calculateTotalPersonsPerPort(invoice.ports[1]), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: this.calculateTotalAmountsPerPort(invoice.ports[1]), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                            ]
                                        },
                                    },
                                    {
                                        table: {
                                            widths: [50, '*', '*'],
                                            body: [
                                                [{ text: 'ΣΥΝΟΛΑ', colSpan: 3, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', ''],
                                                [{ text: 'ΕΝΗΛΙΚΕΣ', colSpan: 3, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].adultsWithTransfer + invoice.ports[1].adultsWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: (invoice.ports[0].adultsAmountWithTransfer + invoice.ports[1].adultsAmountWithTransfer).toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].adultsWithoutTransfer + invoice.ports[1].adultsWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: (invoice.ports[0].adultsAmountWithoutTransfer + invoice.ports[1].adultsAmountWithoutTransfer).toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΠΑΙΔΙΑ', colSpan: 3, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].kidsWithTransfer + invoice.ports[1].kidsWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: (invoice.ports[0].kidsAmountWithTransfer + invoice.ports[1].kidsAmountWithTransfer).toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].kidsWithoutTransfer + invoice.ports[0].kidsWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: (invoice.ports[0].kidsAmountWithoutTransfer + invoice.ports[1].kidsAmountWithoutTransfer).toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΔΩΡΕΑΝ', colSpan: 3, borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, '', ''],
                                                [{ text: 'w/ TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].freeWithTransfer + invoice.ports[1].freeWithTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'w/o TRANSFER', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: invoice.ports[0].freeWithoutTransfer + invoice.ports[1].freeWithoutTransfer, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: '', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                [{ text: 'ΣΥΝΟΛΑ', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: this.calculateTotalPersons(invoice.ports), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }, { text: this.calculateTotalAmounts(invoice.ports), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }]
                                            ]
                                        }
                                    }
                                ]]
                        },
                        layout: 'noBorders'
                    },
                    {
                        stack: [
                            {
                                table: {
                                    widths: ['*', 150],
                                    body: [
                                        [{ text: 'ΚΑΘΑΡΗ ΑΞΙΑ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.summary.netValue.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΦΠΑ 13%', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.summary.vatAmount.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΣΥΝΟΛΙΚΗ ΑΞΙΑ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.summary.grossValue.toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
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
                                        [{ text: 'ΠΡΟΗΓΟΥΜΕΝΟ ΥΠΟΛΟΙΠΟ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.balances[0].toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                        [{ text: 'ΝΕΟ ΥΠΟΛΟΙΠΟ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.balances[1].toFixed(2), alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }]
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
                                        {
                                            table: {
                                                widths: ['*', 150],
                                                body: [
                                                    [{ text: 'ΜΑΡΚ', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.aade.mark, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: '', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { qr: invoice.aade.qrUrl, fit: '50', alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }],
                                                    [{ text: 'UID', alignment: 'right', borderColor: ['#ffffff', '#ffffff', '#efefef', '#ffffff'] }, { text: invoice.aade.uId, alignment: 'right', borderColor: ['#efefef', '#efefef', '#efefef', '#efefef'] }]
                                                ]
                                            },
                                        }
                                    ]]
                                }, layout: 'noBorders'
                            }
                        ],
                        margin: [0, 171, 0, 0]
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

    // public async createReport(invoice: InvoicePdfVM): Promise<void> {
    //     this.setFonts()
    //     const dd = {
    //         background: this.setBackgroundImage(),
    //         pageOrientation: 'portrait',
    //         pageSize: 'A4',
    //         content:
    //             [
    //                 {
    //                     table: {
    //                         body: [[
    //                             {
    //                                 type: 'none',
    //                                 ul: [
    //                                     { text: 'Ημερομηνία: ' + invoice.header.date },
    //                                     { text: 'Παραστατικό: ' + invoice.header.documentTypeDescription },
    //                                     { text: 'Σειρά: ' + invoice.header.batch },
    //                                     { text: 'Νο: ' + invoice.header.invoiceNo }
    //                                 ]
    //                             }
    //                         ]]
    //                     },
    //                     layout: 'noBorders'
    //                 },
    //                 {
    //                     table: {
    //                         widths: ['50%', '50%'],
    //                         body: [[
    //                             {
    //                                 type: 'none',
    //                                 ul: [
    //                                     { text: 'Τα στοιχεία μας' },
    //                                     invoice.issuer.fullDescription,
    //                                     invoice.issuer.profession,
    //                                     invoice.issuer.phones,
    //                                     invoice.issuer.email,
    //                                     invoice.issuer.vatNumber,
    //                                     invoice.issuer.country,
    //                                     invoice.issuer.street,
    //                                     invoice.issuer.number,
    //                                     invoice.issuer.city,
    //                                     invoice.issuer.postalCode
    //                                 ]
    //                             },
    //                             {
    //                                 type: 'none',
    //                                 ul: [
    //                                     { text: 'Τα στοιχεία σας' },
    //                                     invoice.counterPart.fullDescription,
    //                                     invoice.counterPart.profession,
    //                                     invoice.counterPart.phones,
    //                                     invoice.counterPart.email,
    //                                     invoice.counterPart.vatNumber,
    //                                     invoice.counterPart.country,
    //                                     invoice.counterPart.street,
    //                                     invoice.counterPart.number,
    //                                     invoice.counterPart.city,
    //                                     invoice.counterPart.postalCode
    //                                 ]
    //                             }
    //                         ]]
    //                     },
    //                     layout: 'noBorders'
    //                 },
    //                 {
    //                     table: {
    //                         widths: ['35%', '35%', '30%'],
    //                         body: [[
    //                             {
    //                                 table: {
    //                                     body: [
    //                                         ['ΑΝΑΧΩΡΗΣΕΙΣ ΑΠΟ CORFU PORT', '', '', ''],
    //                                         ['ΕΝΗΛΙΚΕΣ', '', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[0].adultsWithTransfer, invoice.ports[0].adultsPriceWithTransfer, invoice.ports[0].adultsAmountWithTransfer],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].adultsWithoutTransfer, invoice.ports[0].adultsPriceWithoutTransfer, invoice.ports[0].adultsAmountWithoutTransfer],
    //                                         ['ΠΑΙΔΙΑ', '', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[0].kidsWithTransfer, invoice.ports[0].kidsPriceWithTransfer, invoice.ports[0].kidsAmountWithTransfer],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].kidsWithoutTransfer, invoice.ports[0].kidsPriceWithoutTransfer, invoice.ports[0].kidsAmountWithoutTransfer],
    //                                         ['ΔΩΡΕΑΝ', '', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[0].freeWithTransfer, '', ''],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].freeWithoutTransfer, '', ''],
    //                                     ]
    //                                 },
    //                                 layout: 'noBorders'
    //                             },
    //                             {
    //                                 table: {
    //                                     body: [
    //                                         ['ΑΝΑΧΩΡΗΣΕΙΣ ΑΠΟ LEFKIMMI PORT', '', '', ''],
    //                                         ['ΕΝΗΛΙΚΕΣ', '', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[1].adultsWithTransfer, invoice.ports[1].adultsPriceWithTransfer, invoice.ports[1].adultsAmountWithTransfer],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[1].adultsWithoutTransfer, invoice.ports[1].adultsPriceWithoutTransfer, invoice.ports[1].adultsAmountWithoutTransfer],
    //                                         ['ΠΑΙΔΙΑ', '', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[1].kidsWithTransfer, invoice.ports[1].kidsPriceWithTransfer, invoice.ports[1].kidsAmountWithTransfer],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[1].kidsWithoutTransfer, invoice.ports[1].kidsPriceWithoutTransfer, invoice.ports[1].kidsAmountWithoutTransfer],
    //                                         ['ΔΩΡΕΑΝ', '', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[1].freeWithTransfer, '', ''],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[1].freeWithoutTransfer, '', ''],
    //                                     ]
    //                                 },
    //                                 layout: 'noBorders'
    //                             },
    //                             {
    //                                 table: {
    //                                     body: [
    //                                         ['ΣΥΝΟΛΟ', '', ''],
    //                                         ['ΕΝΗΛΙΚΕΣ', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[0].adultsWithTransfer + invoice.ports[1].adultsWithTransfer, invoice.ports[0].adultsAmountWithTransfer + invoice.ports[1].adultsAmountWithTransfer],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].adultsWithoutTransfer + invoice.ports[1].adultsWithoutTransfer, invoice.ports[0].adultsAmountWithoutTransfer + invoice.ports[1].adultsAmountWithoutTransfer],
    //                                         ['ΠΑΙΔΙΑ', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[0].kidsWithTransfer + invoice.ports[1].kidsWithTransfer, invoice.ports[0].kidsAmountWithTransfer + invoice.ports[1].kidsAmountWithTransfer],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].kidsWithoutTransfer + invoice.ports[0].kidsWithoutTransfer, invoice.ports[0].kidsAmountWithoutTransfer + invoice.ports[1].kidsAmountWithoutTransfer],
    //                                         ['ΔΩΡΕΑΝ', '', ''],
    //                                         ['ΜΕ TRANSFER', invoice.ports[0].freeWithTransfer + invoice.ports[1].freeWithTransfer, ''],
    //                                         ['ΧΩΡΙΣ TRANSFER', invoice.ports[0].freeWithoutTransfer + invoice.ports[1].freeWithoutTransfer, ''],
    //                                     ]
    //                                 },
    //                                 layout: 'noBorders'
    //                             }
    //                         ]]
    //                     },
    //                     layout: 'noBorders'
    //                 },
    //                 {
    //                     table: {
    //                         body: [[
    //                             {
    //                                 type: 'none',
    //                                 ul: [
    //                                     { text: 'Καθαρή αξία ' + invoice.summary.netValue },
    //                                     { text: 'ΦΠΑ 13% ' + invoice.summary.vatAmount },
    //                                     { text: 'Συνολική αξία ' + invoice.summary.grossValue }
    //                                 ]
    //                             },
    //                         ]]
    //                     },
    //                     layout: 'noBorders'
    //                 },
    //             ],
    //         footer: {
    //             type: 'none',
    //             ul: [
    //                 {
    //                     qr: invoice.aade.qrUrl,
    //                     fit: '50'
    //                 },
    //             ],
    //             margin: [40, -50, 0, -40],
    //             layout: 'noBorders'
    //         },
    //         styles: {
    //             AkaAcidCanterBold: {
    //                 font: 'AkaAcidCanterBold',
    //             },
    //             PFHandbookPro: {
    //                 font: 'PFHandbookPro',
    //             },
    //             paddingLeft: {
    //                 margin: [40, 0, 0, 0]
    //             },
    //             paddingTop: {
    //                 margin: [0, 15, 0, 0]
    //             }
    //         },
    //         defaultStyle: {
    //             font: 'PFHandbookPro',
    //             fontSize: 7
    //         }
    //     }
    //     this.createPdf(dd)
    // }

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

    private calculateTotalPersonsPerPort(port: InvoicePdfPortVM): number {
        return port.adultsWithTransfer + port.adultsWithoutTransfer + port.kidsWithTransfer + port.kidsWithoutTransfer + port.freeWithTransfer + port.freeWithoutTransfer
    }

    private calculateTotalAmountsPerPort(port: InvoicePdfPortVM): string {
        return (port.adultsAmountWithTransfer + port.adultsAmountWithoutTransfer + port.kidsAmountWithTransfer + port.kidsAmountWithoutTransfer).toFixed(2)
    }

    private calculateTotalPersons(ports: InvoicePdfPortVM[]): number {
        let x = 0
        ports.forEach(port => {
            x += port.adultsWithTransfer + port.adultsWithoutTransfer + port.kidsWithTransfer + port.kidsWithoutTransfer + port.freeWithTransfer + port.freeWithoutTransfer
        })
        return x
    }

    private calculateTotalAmounts(ports: InvoicePdfPortVM[]): string {
        let x = 0
        ports.forEach(port => {
            x += port.adultsAmountWithTransfer + port.adultsAmountWithoutTransfer + port.kidsAmountWithTransfer + port.kidsAmountWithoutTransfer
        })
        return x.toFixed(2)
    }

    //#endregion

}
