import { Metadata } from '../../../../../shared/classes/metadata'
import { NationalityDropdownVM } from '../../../nationalities/classes/view-models/nationality-autocomplete-vm'
import { TaxOfficeAutoCompleteVM } from 'src/app/features/billing/taxOffices/classes/view-models/taxOffice-autocomplete-vm'
import { VatRegimeAutoCompleteVM } from 'src/app/features/billing/vatRegimes/classes/view-models/vatRegime-autocomplete-vm'

export interface CustomerReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    nationality: NationalityDropdownVM
    taxOffice: TaxOfficeAutoCompleteVM
    vatRegime: VatRegimeAutoCompleteVM
    // Fields
    abbreviation: string
    description: string
    vatNumber: string
    branch: number
    profession: string
    address: string
    city: string
    postalCode: string
    phones: string
    personInCharge: string
    email: string
    balanceLimit: number
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
