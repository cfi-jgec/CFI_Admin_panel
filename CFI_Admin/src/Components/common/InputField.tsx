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
    containerClass?: string
}


const InputField: React.FC<inputTypes> = ({ containerClass, isInput = true, label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className={`my-2 z-10 ${containerClass}`}>
                <div className="mb-1 block">
                    <Label htmlFor={field.name} value={label} />
                </div>
                {
                    isInput == true ?
                        <TextInput className="!z-10" type="text" {...field} {...props} color={`${meta.touched && meta.error && "failure"}`} /> :
                        <Textarea className="!z-10" rows={4} {...field} {...props} color={`${meta.touched && meta.error && "failure"}`} />
                }
                <ErrorMessage component={'div'} name={field.name} className="text-red-600 text-xs" />
            </div>
        </>
    )
}
export default InputField
