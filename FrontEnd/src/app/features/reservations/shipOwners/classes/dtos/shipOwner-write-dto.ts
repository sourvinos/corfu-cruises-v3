export interface ShipOwnerWriteDto {

    // PK
    id: number
    // FKs
    nationalityId: number
    taxOfficeId: number
    vatRegimeId: number
    // Fields
    description: string
    vatNumber: string
    branch: number
    profession: string
    street: string
    number: string
    postalCode: string
    city: string
    personInCharge: string
    phones: string
    email: string
    demoUrl: string
    demoUsername: string
    demoSubscriptionKey: string
    liveUrl: string
    liveUsername: string
    liveSubscriptionKey: string
    isDemoMyData: boolean
    isActive: boolean
    // Rowversion
    putAt: string

}
