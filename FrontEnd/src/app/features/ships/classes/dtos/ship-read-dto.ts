import { ShipOwnerAutoCompleteVM } from 'src/app/features/shipOwners/classes/view-models/shipOwner-autocomplete-vm'

export interface ShipReadDto {

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
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
