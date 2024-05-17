import { NationalityBrowserStorageVM } from './nationality-browser-storage-vm'

export interface ShipOwnerBrowserStorageVM {

    // PK
    id: number
    // Fields
    abbreviation: string
    description: string
    descriptionInEnglish: string
    vatNumber: string
    branch: number
    address: string
    city: string
    postalCode: string
    isActive: boolean
    // Navigation
    nationality: NationalityBrowserStorageVM

}
