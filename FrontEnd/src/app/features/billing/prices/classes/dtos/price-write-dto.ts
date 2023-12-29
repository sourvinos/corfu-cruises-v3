export interface PriceWriteDto {

    // PK
    id: number
    // FKs
    customerId: number
    destinationId: number
    portId: number
    // Fields
    from: string
    to: string
    adultsWithTransfer: number
    adultsWithoutTransfer: number
    kidsWithTransfer: number
    kidsWithoutTransfer: number
    // Rowversion
    putAt: string

}
