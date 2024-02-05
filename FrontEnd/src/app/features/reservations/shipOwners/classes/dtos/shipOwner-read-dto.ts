import { Metadata } from 'src/app/shared/classes/metadata'
import { NationalityDropdownVM } from '../../../nationalities/classes/view-models/nationality-autocomplete-vm'

export interface ShipOwnerReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    nationality: NationalityDropdownVM
    // Fields
    description: string
    profession: string
    address: string
    taxNo: string
    branch: number
    city: string
    phones: string
    email: string
    isActive: boolean

}
