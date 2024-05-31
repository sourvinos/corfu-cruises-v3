import { Injectable } from '@angular/core'
// Custom
import { AadeVM } from '../view-models/form/aade-vm'

@Injectable({ providedIn: 'root' })

export class RetailSaleXmlHelperService {

    public processRetailSaleSuccessResponse(response: any): AadeVM {
        const document = new DOMParser().parseFromString(response.body.response, 'text/xml')
        const uId = document.querySelector('invoiceUid').innerHTML
        const mark = document.querySelector('invoiceMark').innerHTML
        const qrUrl = document.querySelector('qrUrl').innerHTML
        const x: AadeVM = {
            reservationId: response.body.reservationId,
            uId: uId,
            mark: mark,
            markCancel: '',
            qrUrl: qrUrl
        }
        return x
    }

    public processInvoiceCancelSuccessResponse(invoice: any, response: any): AadeVM {
        const document = new DOMParser().parseFromString(response.body.response, 'text/xml')
        const cancellationMark = document.querySelector('cancellationMark').innerHTML
        const x: AadeVM = {
            reservationId: invoice.reservationId,
            uId: invoice.aade.uId,
            mark: invoice.aade.mark,
            markCancel: cancellationMark,
            qrUrl: invoice.aade.qrUrl
        }
        return x
    }

}
