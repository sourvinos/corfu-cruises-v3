import { PortAutoCompleteVM } from 'src/app/features/ports/classes/view-models/port-autocomplete-vm'

export interface CoachRouteReadDto {

    id: number
    port: PortAutoCompleteVM
    abbreviation: string
    description: string
    hasTransfer: boolean
    isActive: boolean
    user: string
    lastUpdate: string

}
