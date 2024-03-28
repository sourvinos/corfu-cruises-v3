import { Guid } from 'guid-typescript'
// Custom
import { Metadata } from 'src/app/shared/classes/metadata'
import { PassengerReadDto } from './passenger-read-dto'
import { PickupPointAutoCompleteVM } from '../../../../pickupPoints/classes/view-models/pickupPoint-autocomplete-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { CustomerAutoCompleteVM } from 'src/app/features/reservations/customers/classes/view-models/customer-autocomplete-vm'

export interface ReservationReadDto extends Metadata {

    // PK
    reservationId: Guid
    // Object fields
    customer: CustomerAutoCompleteVM
    destination: SimpleEntity
    driver: SimpleEntity
    pickupPoint: PickupPointAutoCompleteVM
    port: SimpleEntity
    portAlternate: SimpleEntity
    ship: SimpleEntity
    // Fields
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

}

