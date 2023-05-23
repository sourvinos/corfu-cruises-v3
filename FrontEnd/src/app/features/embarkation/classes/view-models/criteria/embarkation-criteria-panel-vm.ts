import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface EmbarkationCriteriaPanelVM {

    date: string
    selectedDestinations: SimpleEntity[]
    selectedPorts: SimpleEntity[]
    selectedShips: SimpleEntity[]

}