import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core'
// Custom
import { InvoicePdfHelperService } from '../../invoicesCommon/services/invoice-pdf-helper.service'
import { InvoicePdfService } from '../../invoicesCommon/services/invoice-pdf.service'
import { InvoiceViewerHttpService } from '../classes/services/invoiceViewer-http.service'

@Component({
    selector: 'invoiceViewer-form',
    templateUrl: './invoiceViewer-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './invoiceViewer-form.component.css']
})

export class InvoiceViewerFormComponent {

    //#region common variables

    private recordId: string

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private invoicePdfHelperService: InvoicePdfHelperService, private invoicePdfService: InvoicePdfService, private invoiceViewerHttpService: InvoiceViewerHttpService,) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.createPdf()
    }

    //#endregion

    //#region public methods

    public createPdf(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
        this.invoiceViewerHttpService.getInvoice(this.recordId).subscribe(response => {
            this.invoicePdfHelperService.createPdfInvoiceParts(response.body).then((response) => {
                this.invoicePdfService.createPdf(response)
            })
        })
    }

    //#endregion

}
