export interface DropDownData{
    value: string,
    text: string
} 

export interface UserDetailsFb {
    address1 : string,
    address2 : string,
    firstName : string
    geolocation : any
    lastName : string,
    loggedUserType : number,
    townId : string,
    userId : string,
    phoneNo : string,
    isDisabled : boolean
}

export const USER_TYPE ={
    Customer : 10,
    Hotel :20,
    DeliveryBoy :30,
    Admin : 100
}