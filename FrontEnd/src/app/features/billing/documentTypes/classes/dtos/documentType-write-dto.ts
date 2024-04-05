export interface DocumentTypeWriteDto {

    // PK
    id: number
    // FKs
    shipId: number
    // Fields
    abbreviation: string
    description: string
    batch: string
    lastDate: string
    lastNo: number
    customers: string
    suppliers: string
    discriminatorId: number
    isMyData: boolean
    table8_1: string
    table8_8: string
    table8_9: string
    isActive: boolean
    // Metadata
    putAt: string

}
