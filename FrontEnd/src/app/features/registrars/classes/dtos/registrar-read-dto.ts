import { Metadata } from 'src/app/shared/classes/metadata'
import { ShipAutoCompleteVM } from '../../../ships/classes/view-models/ship-autocomplete-vm'

export interface RegistrarReadDto extends Metadata {

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
