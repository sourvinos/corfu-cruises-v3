export interface DocumentTypeBrowserStorageVM {

    // PK
    id: number
    // FKs
    companyId: number
    // Fields
    abbreviation: string
    description: string
    batch: string
    lastDate: string
    lastNo: number
    isActive: boolean
    customers: string
    suppliers: string
    // myData
    isMyData: boolean
    table8_1: string
    table8_8: string
    table8_9: string
}
