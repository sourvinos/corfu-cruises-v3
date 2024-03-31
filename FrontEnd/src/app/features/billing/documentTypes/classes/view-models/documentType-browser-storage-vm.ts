export interface DocumentTypeBrowserStorageVM {

    // PK
    id: number
    // FKs
    shipOwnerId: number
    // Fields
    abbreviation: string
    description: string
    batch: string
    lastNo: number
    isActive: boolean

}
