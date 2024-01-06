import { Guid } from 'guid-typescript'
import { Metadata } from 'src/app/shared/classes/metadata'

export interface ParametersReadDto extends Metadata {

    // PK
    id: Guid
    // Fields
    isAadeLive: boolean
    aadeDemoUrl: string
    aadeDemoUsername: string
    aadeDemoApiKey: string
    aadeLiveUrl: string
    aadeLiveUsername: string
    aadeLiveApiKey: string
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
