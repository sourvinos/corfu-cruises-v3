import { GenderAutoCompleteVM } from 'src/app/features/genders/classes/view-models/gender-autocomplete-vm'
import { NationalityDropdownVM } from 'src/app/features/nationalities/classes/view-models/nationality-autocomplete-vm'
import { ShipAutoCompleteVM } from 'src/app/features/ships/classes/view-models/ship-autocomplete-vm'

export interface ShipCrewReadDto {

    id: number
    gender: GenderAutoCompleteVM
    nationality: NationalityDropdownVM
    ship: ShipAutoCompleteVM
    lastname: string
    firstname: string
    birthdate: string
    isActive: boolean
    user: string
    lastUpdate: string

}
