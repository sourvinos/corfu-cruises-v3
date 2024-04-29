export interface BankAccountWriteDto {

    // PK
    id: number
    // FKs
    bankId: number
    shipOwnerId: number
    // Fields
    iban: string
    isActive: boolean
    // Rowversion
    putAt: string

}
