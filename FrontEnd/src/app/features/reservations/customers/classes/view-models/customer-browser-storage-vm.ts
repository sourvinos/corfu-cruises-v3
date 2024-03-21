import { NationalityBrowserStorageVM } from './nationality-browser-storage-vm'

export interface CustomerBrowserStorageVM {

    // PK
    id: number
    // Navigation
    nationality: NationalityBrowserStorageVM
    // Fields
    description: string
    fullDescription: string
    vatNumber: string
    branch: number
    profession: string
    street: string
    number: string
    postalCode: string
    city: string
    phones: string
    email: string
    isActive: boolean

}
