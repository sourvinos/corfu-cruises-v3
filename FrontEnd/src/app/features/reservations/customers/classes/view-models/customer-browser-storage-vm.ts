import { NationalityBrowserStorageVM } from './nationality-browser-storage-vm'

export interface CustomerBrowserStorageVM {

    // PK
    id: number
    // Fields
    abbreviation: string
    description: string
    taxNo: string
    branch: number
    address: string
    city: string
    postalCode: string
    isActive: boolean
    // Navigation
    nationality: NationalityBrowserStorageVM

}
