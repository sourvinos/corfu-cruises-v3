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
    taxNo: string
    description: string
    profession: string
    address: string
    phones: string
    personInCharge: string
    email: string
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
