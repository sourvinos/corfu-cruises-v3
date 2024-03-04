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
    description: string
    fullDescription: string
    vatNumber: string
    branch: number
    profession: string
    street: string
    number: string
    postalCode: string
    city: string
    personInCharge: string
    phones: string
    email: string
    balanceLimit: number
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
