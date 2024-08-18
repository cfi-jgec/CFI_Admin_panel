import { ErrorMessage, useField } from "formik";
import { Label, TextInput, Textarea } from "flowbite-react"
import { IconType } from "react-icons";

interface inputTypes {
    isInput?: boolean,
    label?: string,
    name: string,
    icon?: IconType,
    placeholder?: string,
    type?: string,
    disabled?: boolean
}


const InputField: React.FC<inputTypes> = ({ isInput = true, label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className='my-2 z-10'>
                <div className="mb-1 block">
                    <Label htmlFor={field.name} value={label} />
                </div>
                {
                    isInput == true ?
                        <TextInput className="!z-10" type="text" {...field} {...props} color={`${meta.touched && meta.error && "failure"}`} /> :
                        <Textarea className="!z-10" rows={4} {...field} {...props} color={`${meta.touched && meta.error && "failure"}`} />
                }
                <ErrorMessage component={'div'} name={field.name} className="text-red-600" />
            </div>
        </>
    )
}
export default InputField
