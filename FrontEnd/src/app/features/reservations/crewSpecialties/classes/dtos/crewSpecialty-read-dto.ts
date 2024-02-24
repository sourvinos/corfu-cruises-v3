import { Metadata } from 'src/app/shared/classes/metadata'

export interface CrewSpecialtyReadDto extends Metadata {

    // PK
    id: number
    // Fields
    description: string
    isActive: boolean

}
