import FileSaver from 'file-saver'
import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { ReceiptListExportVM } from '../view-models/export/receipt-list-export-vm'
import { ReceiptListVM } from '../view-models/list/receipt-list-vm'

@Injectable({ providedIn: 'root' })

export class ReceiptListExportService {

    private exportRecords: ReceiptListExportVM[]

    constructor(private dateHelperService: DateHelperService) { }

    public buildList(records: ReceiptListVM[]): ReceiptListExportVM[] {
        this.exportRecords = []
        records.forEach(record => {
            this.exportRecords.push({
                date: this.dateHelperService.formatISODateToLocale(record.date.description),
                shipOwner: record.shipOwner.description,
                customer: record.customer.description,
                documentType: record.documentType.description,
                invoiceNo: record.invoiceNo,
                paymentMethod: record.paymentMethod.description,
                grossAmount: record.grossAmount,
                remarks: record.remarks,
            })
        })
        return this.exportRecords
    }

    public exportToExcel(exportRecords: ReceiptListExportVM[]): void {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(exportRecords)
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })
            this.saveAsExcelFile(excelBuffer, 'Ημερολόγιο εισπράξεων')
        })
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const EXCEL_EXTENSION = '.xlsx'
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        })
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION)
    }

}
