export interface DestinationWriteDto {

    // PK
    id: number
    abbreviation: string
    description: string
    isActive: boolean
    // Rowversion
    rowVersion: string

}
