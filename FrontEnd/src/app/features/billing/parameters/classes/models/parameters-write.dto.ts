import { Guid } from 'guid-typescript'

export interface ParametersWriteDto {

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
    putAt: string

}
