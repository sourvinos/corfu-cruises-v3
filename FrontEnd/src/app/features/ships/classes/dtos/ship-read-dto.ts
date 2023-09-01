import { ShipOwnerAutoCompleteVM } from 'src/app/features/shipOwners/classes/view-models/shipOwner-autocomplete-vm'
import { Metadata } from 'src/app/shared/classes/metadata'

export interface ShipReadDto extends Metadata {
    id: number
    shipOwner: ShipOwnerAutoCompleteVM
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
