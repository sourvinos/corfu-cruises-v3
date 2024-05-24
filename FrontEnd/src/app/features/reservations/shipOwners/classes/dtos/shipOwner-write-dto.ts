export interface ShipOwnerWriteDto {

    // PK
    id: number
    // FKs
    nationalityId: number
    taxOfficeId: number
    // Fields
    vatPercent: number
    vatPercentId: number
    vatExemptionId: number
    description: string
    descriptionEn: string
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
    isGroupJP: boolean
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
