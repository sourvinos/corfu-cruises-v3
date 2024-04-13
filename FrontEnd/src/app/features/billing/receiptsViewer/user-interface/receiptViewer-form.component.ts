import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core'
// Custom
import { ReceiptViewerHttpService } from '../classes/services/receiptViewer-http.service'
import { ReceiptPdfHelperService } from '../classes/services/receipt-pdf-helper.service'
import { ReceiptPdfService } from '../classes/services/receipt-pdf.service'

@Component({
    selector: 'receiptViewer-form',
    templateUrl: './receiptViewer-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './receiptViewer-form.component.css']
})

export class ReceiptViewerFormComponent {

    //#region common variables

    private recordId: string

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private receiptPdfHelperService: ReceiptPdfHelperService, private receiptPdfService: ReceiptPdfService, private receiptViewerHttpService: ReceiptViewerHttpService,) { }

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
        this.receiptViewerHttpService.getReceipt(this.recordId).subscribe(response => {
            this.receiptPdfHelperService.createPdfReceiptParts(response.body).then((response) => {
                this.receiptPdfService.createPdf(response)
            })
        })
    }

    //#endregion

}
