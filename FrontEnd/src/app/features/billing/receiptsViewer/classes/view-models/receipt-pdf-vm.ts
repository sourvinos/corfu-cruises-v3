import { ReceiptPdfBankAccountVM } from './receipt-pdf-bankAccount-vm'
import { ReceiptPdfHeaderVM } from './receipt-pdf-header-vm'
import { ReceiptPdfPartyTypeVM } from './receipt-pdf-partyType-vm'

export interface ReceiptPdfVM {

    header: ReceiptPdfHeaderVM
    issuer: ReceiptPdfPartyTypeVM
    customer: ReceiptPdfPartyTypeVM
    paymentMethod: string
    bankAccounts: ReceiptPdfBankAccountVM[]
    amount: number
    previousBalance: number
    newBalance: number

}
