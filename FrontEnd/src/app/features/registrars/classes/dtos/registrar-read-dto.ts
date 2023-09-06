import { Metadata } from 'src/app/shared/classes/metadata'
import { ShipAutoCompleteVM } from '../../../ships/classes/view-models/ship-autocomplete-vm'

export interface RegistrarReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    ship: ShipAutoCompleteVM
    // Fields
    fullname: string
    phones: string
    email: string
    fax: string
    address: string
    isPrimary: boolean
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string
    // Rowversion
    rowVersion: string

}
