import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface BankAccountListVM {

    id: number
    bank: SimpleEntity
    shipOwner: SimpleEntity
    iban: string
    isActive: boolean

}
