export interface UserNewDto {

    username: string
    displayname: string
    customerId?: number
    email: string
    password: string
    confirmPassword: string
    isFirstFieldFocused: boolean
    isAdmin: boolean
    isActive: boolean

}
