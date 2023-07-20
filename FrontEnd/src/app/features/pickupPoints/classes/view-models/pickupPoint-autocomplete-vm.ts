import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface PickupPointAutoCompleteVM extends SimpleEntity {

    exactPoint: string
    time: string
    port: SimpleEntity
    isActive: boolean

}
