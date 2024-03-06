import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DocumentTypeReadDto } from '../../../documentTypes/classes/dtos/documentType-read-dto'
import { TransactionWriteDto } from '../dtos/form/transaction-write-dto'

@Injectable({ providedIn: 'root' })

export class TransactionHelperService {

    constructor(private dexieService: DexieService, private dateHelperService: DateHelperService) { }

    public flattenForm(formValue: any): TransactionWriteDto {
        const x: TransactionWriteDto = {
            transactionId: formValue.transactionId != '' ? formValue.transactionId : null,
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
