import { BoardingPassPassengerVM } from './boarding-pass-passenger-vm'

export interface BoardingPassVM {

    date: string
    refNo: string
    ticketNo: string
    destinationDescription: string
    customerDescription: string
    pickupPointDescription: string
    pickupPointExactPoint: string
    pickupPointTime: string
    remarks: string
    qr: string
    passengers: BoardingPassPassengerVM[]
    adults: string
    kids: string
    free: string
    totalPax: string

}