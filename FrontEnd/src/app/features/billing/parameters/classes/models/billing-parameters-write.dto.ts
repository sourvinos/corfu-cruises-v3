import { Guid } from 'guid-typescript'

export interface BillingParametersWriteDto {

    // PK
    id: Guid
    // Fields
    vatPercent: number
    vatCategoryId: number
    // Metadata
    putAt: string

}
