import { ErrorMessage, useField } from "formik";
import { Label, Select } from "flowbite-react"

interface inputTypes {
    data: (string | number | Object)[],
    isInput?: boolean,
    label?: string,
    name: string,
    type?: string,
    disabled?: boolean
}

const SelectionField: React.FC<inputTypes> = ({ data, label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className='my-2'>
                <div className="mb-1 block">
                    <Label htmlFor={field.name} value={label} />
                </div>
                {
                    <Select type="text" {...field} {...props} color={`${meta.touched && meta.error && "failure"}`} >
                        {data.map((item: any) => <option value={item} key={item}>{item}</option>)}
                    </Select>
                }
                <ErrorMessage component={'div'} name={field.name} className="text-red-600" />
            </div>
        </>
    )
}
export default SelectionField
