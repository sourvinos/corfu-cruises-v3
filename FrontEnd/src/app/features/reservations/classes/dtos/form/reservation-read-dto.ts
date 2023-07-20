import { Guid } from 'guid-typescript'
// Custom
import { PassengerReadDto } from './passenger-read-dto'
import { PickupPointAutoCompleteVM } from '../../../../pickupPoints/classes/view-models/pickupPoint-autocomplete-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface ReservationReadDto {

    reservationId: Guid
    customer: SimpleEntity
    destination: SimpleEntity
    driver: SimpleEntity
    pickupPoint: PickupPointAutoCompleteVM
    port: SimpleEntity
    ship: SimpleEntity
    date: string
    refNo: string
    email: string
    phones: string
    remarks: string
    adults: number
    kids: number
    free: number
    totalPax: number
    ticketNo: string
    passengers: PassengerReadDto
    user: string
    lastUpdate: string

}

