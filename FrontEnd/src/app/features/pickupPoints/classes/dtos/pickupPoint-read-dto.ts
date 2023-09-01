import { CoachRouteAutoCompleteVM } from 'src/app/features/coachRoutes/classes/view-models/coachRoute-autocomplete-vm'
import { Metadata } from 'src/app/shared/classes/metadata'

export interface PickupPointReadDto extends Metadata {

    id: number
    description: string
    coachRoute: CoachRouteAutoCompleteVM
    exactPoint: string
    time: string
    remarks: string
    isActive: boolean
    user: string
    lastUpdate: string

}
