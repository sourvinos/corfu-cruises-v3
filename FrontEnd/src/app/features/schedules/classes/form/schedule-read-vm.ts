import { DestinationActiveVM } from '../../../destinations/classes/view-models/destination-active-vm'
import { PortActiveVM } from 'src/app/features/ports/classes/view-models/port-active-vm'

export interface ScheduleReadDto {

    id: number,
    destination: DestinationActiveVM,
    port: PortActiveVM,
    date: string,
    maxPax: number,
    time: string,
    isActive: boolean
    user: string
    lastUpdate: string

}