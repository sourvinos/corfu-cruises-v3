import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DocumentTypeReadDto } from '../../../documentTypes/classes/dtos/documentType-read-dto'
import { ReceiptWriteDto } from '../dtos/form/receipt-write-dto'

@Injectable({ providedIn: 'root' })

export class ReceiptHelperService {

    constructor(private dexieService: DexieService, private dateHelperService: DateHelperService) { }

    public flattenForm(formValue: any): ReceiptWriteDto {
        const x: ReceiptWriteDto = {
            invoiceId: formValue.receiptId != '' ? formValue.invoiceId : null,
            customerId: formValue.customer.id,
            documentTypeId: formValue.documentType.id,
            paymentMethodId: formValue.paymentMethod.id,
            date: this.dateHelperService.formatDateToIso(new Date(formValue.date)),
            invoiceNo: formValue.invoiceNo,
            grossAmount: formValue.grossAmount,
            remarks: formValue.remarks,
            putAt: formValue.putAt
        }
        return x
    }

    public updateBrowserStorageAfterApiUpdate(record: DocumentTypeReadDto): void {
        this.dexieService.update('documentTypes', record)
    }

}
