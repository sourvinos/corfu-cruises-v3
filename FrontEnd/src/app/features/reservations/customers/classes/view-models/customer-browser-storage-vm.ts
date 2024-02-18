import { NationalityBrowserStorageVM } from './nationality-browser-storage-vm'

export interface CustomerBrowserStorageVM {

    // PK
    id: number
    // Fields
    abbreviation: string
    description: string
    vatNumber: string
    branch: number
    street: string
    number: string
    postalCode: string
    city: string
    isActive: boolean
    // Navigation
    nationality: NationalityBrowserStorageVM

}
