import { Metadata } from '../../../../../shared/classes/metadata'
import { NationalityDropdownVM } from '../../../nationalities/classes/view-models/nationality-autocomplete-vm'
import { TaxOfficeAutoCompleteVM } from 'src/app/features/billing/taxOffices/classes/view-models/taxOffice-autocomplete-vm'

export interface CustomerReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    nationality: NationalityDropdownVM
    taxOffice: TaxOfficeAutoCompleteVM
    // Fields
    vatPercent: number
    vatPercentId: number
    vatExemptionId: number
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
    remarks: string
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
