export interface UserNewDto {

    userName: string
    displayname: string
    customerId?: number
    email: string
    password: string
    confirmPassword: string
    isFirstFieldFocused: boolean
    isAdmin: boolean
    isActive: boolean

}
