import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
// Custom
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InvoicePdfHelperService } from '../../invoicesCommon/services/invoice-pdf-helper.service'
import { InvoicePdfService } from '../../invoicesCommon/services/invoice-pdf.service'
import { InvoicePdfVM } from '../../invoicesCommon/view-models/pdf/invoice-pdf-vm'
import { InvoiceViewerHttpService } from '../classes/services/invoiceViewer-http.service'

@Component({
    selector: 'invoiceViewer-form',
    templateUrl: './invoiceViewer-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './invoiceViewer-form.component.css']
})

export class InvoiceViewerFormComponent {

    //#region common variables

    public record: InvoicePdfVM
    private recordId: string
    public feature = 'invoiceForm'
    public featureIcon = 'invoices'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/invoices'

    //#endregion

    constructor(private invoiceViewerHttpService: InvoiceViewerHttpService, private invoicePdfService: InvoicePdfService, private invoicePdfHelperService: InvoicePdfHelperService, private activatedRoute: ActivatedRoute) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setRecordId()
        this.getRecord()
    }

    //#endregion

    //#region public methods

    public createPdf(): void {
        this.invoicePdfHelperService.createPdfInvoiceParts(this.record).then((response) => {
            this.invoicePdfService.createReport(response)
        })
    }

    //#endregion

    //#region private methods

    private getRecord(): Promise<any> {
        return new Promise((resolve) => {
            this.invoiceViewerHttpService.getSingle(this.recordId).subscribe(response => {
                this.record = response.body
                resolve(this.record)
                console.log(this.record)
                this.createPdf()
            })
        })
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    //#endregion

}
