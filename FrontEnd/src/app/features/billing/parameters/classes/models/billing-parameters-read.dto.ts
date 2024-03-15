import { Guid } from 'guid-typescript'
// Custom
import { Metadata } from 'src/app/shared/classes/metadata'

export interface BillingParametersReadDto extends Metadata {

    // PK
    id: Guid
    // Fields
    vatPercent: number
    vatCategoryId: number
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
