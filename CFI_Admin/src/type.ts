import { StaticImageData } from "next/image"


export type props = {
    openModal: boolean,
    closeModal: CallableFunction
}
 
export interface NoticeType {
    title: string,
    description: string,
    date: any,
    link: string,
    _id?: string,
}
export interface photoUrlType {
    photo?: string | StaticImageData
}

export interface EventsItemsType {
    shortName: string,
    fullName: string,
    description: string,
    photo?: string,
    rules?: string,
    prizes?: string,
    venue?: string,
    time_line?: string,
    date: string, 
    organizer: string,
    _id?: string,
    important_details?: string,
    reg_date_start?: string,
    reg_date_end?: string,
}



export interface ComponentsType {
    _id?: string,
    photo: string,
    name: string,
    modelNo: string,
    qty: number,
}
export interface resComponentsType extends ComponentsType {
    _id: string
}

export interface RegisterUserType {
    _id: string;
    name: string;
    email: string;
    password: string;
    photo: string;
    isVerify: boolean;
    isAdmin: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date,
    verifyToken: string;
    verifyTokenExpiry: Date,
    isOnline: boolean,
}