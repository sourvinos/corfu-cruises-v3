import { Metadata } from 'src/app/shared/classes/metadata'
import { DestinationAutoCompleteVM } from '../../../destinations/classes/view-models/destination-autocomplete-vm'
import { PortAutoCompleteVM } from 'src/app/features/ports/classes/view-models/port-autocomplete-vm'

export interface ScheduleReadDto extends Metadata {

    id: number
    destination: DestinationAutoCompleteVM
    port: PortAutoCompleteVM
    date: string
    maxPax: number
    time: string
    isActive: boolean
    user: string
    lastUpdate: string

}