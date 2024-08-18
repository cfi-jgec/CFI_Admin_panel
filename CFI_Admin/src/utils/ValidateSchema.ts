import * as Yup from "yup";


export const validate = Yup.object({
    email: Yup.string()
        .email("please enter a valid email")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const validateMembers = Yup.object({
    name: Yup.string().required("name is required"),
    year: Yup.number().required("select the year"),
    email: Yup.string()
        .email("enter a valid email")
        .required("email is required"),
    phone: Yup.string()
        .min(10, "mobile number must be 10 digits")
        .max(10, "mobile number must be 10 digits")
        .required("mobile no is required"),
});

export const stockValidate = Yup.object({
    name: Yup.string()
        .required("model name is required")
        .max(20, "model name at most 20 characters"),
    modelNo: Yup.string().max(30, "model no at most 20 characters"),
    qty: Yup.number().required("qty is required"),
});

export const validateEvents = Yup.object({
    shortName: Yup.string()
        .max(100, "Short name must contain at max 20 characters")
        .required("short name is required"),
    fullName: Yup.string().required("full name is required"),
    date: Yup.string().required("date is required"),
    organizer: Yup.string().required("organizer is required"),
    event_end_time: Yup.string().required("event end time is required"),
    event_start_time: Yup.string().required("event start time is required"),
    // prizes: Yup.string().required("prizes is required"),
    reg_date_end: Yup.string().required("registration date end is required"),
    reg_date_start: Yup.string().required("registration date start is required"),
    // rules: Yup.string().required("rules is required"), 
    venue: Yup.string().required("venue is required"),
});