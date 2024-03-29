export interface DocumentTypeBrowserStorageVM {

    // PK
    id: number
    // FKs
    companyId: number
    // Fields
    abbreviation: string
    description: string
    batch: string
    lastNo: number
    isActive: boolean

}
