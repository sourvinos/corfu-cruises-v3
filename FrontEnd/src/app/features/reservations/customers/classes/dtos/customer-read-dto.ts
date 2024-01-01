import { Metadata } from '../../../../../shared/classes/metadata'
import { TaxOfficeAutoCompleteVM } from 'src/app/features/billing/taxOffices/classes/view-models/taxOffice-autocomplete-vm'

export interface CustomerReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    taxOffice: TaxOfficeAutoCompleteVM
    // Fields
    taxNo: string
    description: string
    profession: string
    address: string
    phones: string
    personInCharge: string
    email: string
    isActive: boolean

}
