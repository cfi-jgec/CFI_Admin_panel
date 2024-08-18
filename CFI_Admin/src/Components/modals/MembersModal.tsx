import { useAsyncHandler } from '@/utils/asyncHandler';
import { validateMembers } from '@/utils/ValidateSchema';
import axios from 'axios';
import { Button, Label, Modal, Select } from 'flowbite-react'
import { Form, Formik } from 'formik'
import React, { ChangeEvent, FC, useState } from 'react'
import InputField from '../common/InputField';
import SelectionField from '../common/SelectionField';
import { deleteStorage, departments, positions, years } from '@/utils/data';
import ImageCropUpload from '../common/CroppedImage';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import toast from 'react-hot-toast'; 
import Image from 'next/image';

type pros = {
    openModal: boolean;
    closedModal: () => void;
    fields: membersType;
    isUpdate: boolean;
    selectPositions: string[];
    setSelectPositions: (value: string[]) => void;
    photo: string;
    setPhoto: (value: string) => void;
}

const MembersModal: FC<pros> = ({ openModal, closedModal, fields, isUpdate, selectPositions, setSelectPositions, photo, setPhoto }) => {
    const handelSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = e.target.value;
        if (selectPositions.length > 0) {
            const ind = selectPositions.findIndex(ele => ele === item);
            if (ind === -1) setSelectPositions([...selectPositions, e.target.value]);
            else toast.error("Position already selected")
        } else setSelectPositions([e.target.value]);
    }
    const removePosition = (value: string) => {
        setSelectPositions(selectPositions.filter(ele => ele !== value));
    }

    const submitDetails = useAsyncHandler(async (values) => {
        values.position = selectPositions;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/members/${isUpdate ? "update" : "add"}`, values);
        closedModal();
    });

    return (
        <div>
            <Modal
                show={openModal}
                size="xl"
                popup
                onClose={closedModal}
            >
                <Modal.Header className="ms-4 mt-2">
                    Add new Member&apos;s details
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={fields}
                        validationSchema={validateMembers}
                        onSubmit={submitDetails}
                    >
                        {({ values, handleReset }) => (
                            <Form>
                                <InputField
                                    name="name"
                                    label={"Name"}
                                    placeholder="Enter name"
                                />
                                <div className="my-2">
                                    <div className="mb-1 block">
                                        <Label htmlFor={"position"} value={"Select Position (you can select multiple positions)"} />
                                    </div>
                                    <Select onChange={handelSelect}>
                                        {positions.map((item: string) => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Select>
                                    <div className="flex items-center flex-wrap gap-2 mt-2">
                                        {
                                            selectPositions.length > 0 && selectPositions.map(item => (
                                                <div key={item} className="flex items-center gap-x-2 px-4 py-2 text-sm bg-violet-500 text-white  rounded-md">
                                                    <p>{item}</p>
                                                    <RxCross1
                                                        className="cursor-pointer"
                                                        onClick={() => removePosition(item)}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <InputField
                                        name="email"
                                        label="Email"
                                        placeholder="name@gamil.com"
                                    />
                                    <InputField
                                        name="phone"
                                        label={"Phone"}
                                        placeholder="0123456789"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <SelectionField
                                        name="year"
                                        label="Select pass-out year"
                                        data={years}
                                    />
                                    <SelectionField
                                        name="dept"
                                        label="Select department"
                                        data={departments}
                                    />
                                </div>
                                <div className="!w-full my-3 flex items-center gap-x-8">
                                    {photo ? (
                                        <div className="flex items-center gap-x-8">
                                            <Image
                                                src={photo}
                                                alt="member photo"
                                                width={100}
                                                height={100}
                                                className="w-20 h-auto object-cover rounded-full"
                                                loading="lazy"
                                            />
                                            <Button
                                                type="button"
                                                color={"failure"}
                                                onClick={() => (deleteStorage(photo), setPhoto(""))}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <ImageCropUpload
                                            onUploadComplete={(e) => (values.photo = e, setPhoto(e))}
                                            aspect={1 / 1}
                                            fileType="Members"
                                        />
                                    )}
                                </div>
                                <h1 className="text-lg font-semibold text-gray-800 my-2">
                                    Add Social Media links
                                </h1>
                                <InputField name="facebook" icon={FaFacebook} />
                                <InputField name="linkedin" icon={FaLinkedin} />
                                <InputField name="instagram" icon={FaInstagram} />
                                <div className="flex justify-start my-3 space-x-4">
                                    <Button
                                        // disabled={values.photo === ""}
                                        type="submit"
                                        className="button w-36 bg-green-500"
                                    >
                                        {isUpdate? "Update" : "Add Member"}
                                    </Button>
                                    <button
                                        onClick={handleReset}
                                        type="reset"
                                        className="button bg-red-500"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MembersModal
