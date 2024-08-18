declare interface CroppedArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare interface loginUserType {
    email: string;
    password: string;
}


declare interface registerUserType extends LoginUserType {
    name: string;
    photo: string;
}

declare interface certificateType {
    url: string;
    refId: string;
}

declare interface contactResType {
    _id: string;
    name: string,
    email: string,
    mobile: string,
    message: string,
    status: boolean,
    solution: string,
    date: string | Date
}

declare interface solveResType {
    _id: string,
    question: string,
    solution: string,
}

declare interface membersType {
    name: string,
    photo?: string,
    position: string[],
    year: string | string[],
    dept: string,
    email: string,
    phone: string | number,
    facebook?: string | URL,
    instagram?: string | URL,
    linkedin?: string | URL,
}
declare interface resMembersType extends membersType {
    _id: string | ObjectId,
    socialLinks: {
        facebook?: string | URL,
        instagram?: string | URL,
        linkedin?: string | URL,
    }
}

declare interface galleryType {
    _id: string
    title: string,
    date: string,
    photo: string
}

declare interface EventsItemsType {
    _id?: string;
    eventId: string;
    date: string;
    description: string; 
    event_end_time: string;
    event_start_time: string;
    fullName: string;
    organizer: string;
    photo: string;
    prizes: string;
    reg_date_end: string;
    reg_date_start: string;
    rules: string;
    shortName: string; 
    venue: string;
    isCompleted: boolean;
}
declare interface teamMembersType {
    name: string
    phone: string
    branch: string
    year: string
}
declare interface eventRegistrationType {
    eventId: string,
    eventName: string,
    teamName: string
    teamLogo: string
    projectName: string
    projectDescription: string
    leaderName: string
    phone: string
    email: string
    leaderBranch: string,
    leaderYear: string,
    members: teamMembersType[]
}
declare interface registerTeamsType extends eventRegistrationType {
    _id: string
    isApproved: boolean
    positions: string
    prize: string
    message: string
}

declare interface reviewsType {
    _id: string
    name: string
    profession: string
    message: string
    email: string
    isAccepted: boolean
}

declare interface projectType {
    _id: string
    files: string[]
    projectName: string
    studentName: string
    year: string
    branch: string
    isApproved: boolean
}

declare interface projectDetailsType extends projectType {
    projectDescription: string
    liveLink: string
    mobile: string
    college: string
}