import { PortAutoCompleteVM } from 'src/app/features/ports/classes/view-models/port-autocomplete-vm'
import { Metadata } from 'src/app/shared/classes/metadata'

export interface CoachRouteReadDto extends Metadata {

    id: number
    port: PortAutoCompleteVM
    abbreviation: string
    description: string
    hasTransfer: boolean
    isActive: boolean
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
