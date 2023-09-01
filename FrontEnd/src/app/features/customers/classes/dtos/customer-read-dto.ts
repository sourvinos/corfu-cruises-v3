import { Metadata } from 'src/app/shared/classes/metadata'

export interface CustomerReadDto extends Metadata {

    id: number
    description: string
    profession: string
    address: string
    phones: string
    personInCharge: string
    email: string
    isActive: boolean

}
