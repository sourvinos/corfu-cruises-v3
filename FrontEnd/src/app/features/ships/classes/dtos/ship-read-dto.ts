import { ShipOwnerAutoCompleteVM } from 'src/app/features/shipOwners/classes/view-models/shipOwner-autocomplete-vm'
import { Metadata } from 'src/app/shared/classes/metadata'

export interface ShipReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    shipOwner: ShipOwnerAutoCompleteVM
    // Fields
    description: string
    abbreviation: string
    imo: string
    flag: string
    registryNo: string
    manager: string
    managerInGreece: string
    agent: string
    isActive: boolean

}
