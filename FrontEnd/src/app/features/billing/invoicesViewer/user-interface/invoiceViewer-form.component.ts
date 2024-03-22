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

    // public record: InvoicePdfVM
    private recordId: string

    //#endregion

    constructor(private invoiceViewerHttpService: InvoiceViewerHttpService, private invoicePdfService: InvoicePdfService, private invoicePdfHelperService: InvoicePdfHelperService, private activatedRoute: ActivatedRoute) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        // this.setRecordId()
        this.createPdf()
    }

    //#endregion

    //#region public methods

    public createPdf(): void {

        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })

        this.invoiceViewerHttpService.getMe(this.recordId).subscribe(response => {
                this.invoicePdfHelperService.createPdfInvoiceParts(response.body).then((response) => {
                this.invoicePdfService.createReport(response)
            })
        })

        // this.invoicePdfHelperService.createPdfInvoiceParts(this.record).then((response) => {
        //     this.invoicePdfService.createReport(response)
        // })
    }

    //#endregion

    //#region private methods

    // private getRecord(): Promise<any> {
    //     return new Promise((resolve) => {
    //         this.invoiceViewerHttpService.getSingle(this.recordId).subscribe(response => {
    //             this.record = response.body
    //             resolve(this.record)
    //             console.log(this.record)
    //             this.createPdf()
    //         })
    //     })
    // }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    //#endregion

}
