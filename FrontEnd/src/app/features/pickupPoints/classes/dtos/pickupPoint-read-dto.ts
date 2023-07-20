import { CoachRouteAutoCompleteVM } from 'src/app/features/coachRoutes/classes/view-models/coachRoute-autocomplete-vm'

export interface PickupPointReadDto {

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
