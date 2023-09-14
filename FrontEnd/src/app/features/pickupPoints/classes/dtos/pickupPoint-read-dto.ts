import { CoachRouteAutoCompleteVM } from 'src/app/features/coachRoutes/classes/view-models/coachRoute-autocomplete-vm'
import { Metadata } from 'src/app/shared/classes/metadata'

export interface PickupPointReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    coachRoute: CoachRouteAutoCompleteVM
    // Fields
    description: string
    exactPoint: string
    time: string
    remarks: string
    isActive: boolean

}
