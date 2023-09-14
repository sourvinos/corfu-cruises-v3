import { PortAutoCompleteVM } from 'src/app/features/ports/classes/view-models/port-autocomplete-vm'
import { Metadata } from 'src/app/shared/classes/metadata'

export interface CoachRouteReadDto extends Metadata {

    // PK
    id: number
    // Fields
    abbreviation: string
    description: string
    hasTransfer: boolean
    isActive: boolean
    // Object fields
    port: PortAutoCompleteVM

}
