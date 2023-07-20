import { ShipAutoCompleteVM } from '../../../ships/classes/view-models/ship-autocomplete-vm'

export interface RegistrarReadDto {

    id: number
    ship: ShipAutoCompleteVM
    fullname: string
    phones: string
    email: string
    fax: string
    address: string
    isPrimary: boolean
    isActive: boolean
    user: string
    lastUpdate: string

}
