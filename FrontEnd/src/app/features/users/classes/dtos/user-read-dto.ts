import { Guid } from 'guid-typescript'
// Custom
import { CustomerAutoCompleteVM } from '../../../customers/classes/view-models/customer-autocomplete-vm'

export class UserReadDto {

    id: Guid
    username: string
    displayname: string
    customer: CustomerAutoCompleteVM
    email: string
    isFirstFieldFocused: boolean
    isAdmin: boolean
    isActive: boolean

}
