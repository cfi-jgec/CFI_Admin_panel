import { Button, Label, Modal } from "flowbite-react";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import InputField from "../common/InputField";
import ImageCropUpload from "../common/CroppedImage";
import { EventsItemsType } from "@/type";
import { validateEvents } from "@/utils/ValidateSchema";
import Image from "next/image";
import { deleteStorage } from "@/utils/data";
import ReactQuill from "react-quill";
import axios from "axios";
import { useAsyncHandler } from "@/utils/asyncHandler";

type props = {
    openModal: boolean;
    closedModal: () => void;
    isUpdate: boolean;
    fields: EventsItemsType;
    photo: string;
    updatePhoto: (e: string) => void;
};

const EventModal: FC<props> = ({
    openModal,
    closedModal,
    isUpdate,
    fields,
    photo,
    updatePhoto,
}) => {

    const submitDetails =useAsyncHandler(async (values: EventsItemsType) => {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event/${isUpdate ? "update" : "add"}`, values); 
        closedModal();
    });

    return (
        <>
            <Modal show={openModal} size={"2xl"} popup onClose={closedModal}>
                <Modal.Header className="ps-6">Add New Event</Modal.Header>
                <Modal.Body>
                    <Formik
                        enableReinitialize={true}
                        initialValues={fields}
                        validationSchema={validateEvents}
                        onSubmit={submitDetails}
                    >
                        {({ handleChange, values }) => (
                            <Form className="gap-y-3">
                                <InputField
                                    name="shortName"
                                    placeholder="Event short name"
                                    label={"Event short name*"}
                                />
                                <InputField
                                    name="fullName"
                                    placeholder="Event Full name"
                                    label={"Event Full name*"}
                                />
                                <div>
                                    <Label className="text-[14px] mt-3">Event Description*</Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={values.description}
                                        placeholder="Event description"
                                        className="h-40 mb-14 mt-1.5"
                                        onChange={e => handleChange({ target: { name: "description", value: e } })}
                                    />
                                </div>
                                <div className="mb-2">
                                    {photo ? (
                                        <div className="flex items-center gap-x-8">
                                            <Image
                                                src={photo}
                                                alt="event photo"
                                                width={100}
                                                height={100}
                                                className="w-3/4 h-auto object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                            <Button
                                                type="button"
                                                color={"failure"}
                                                onClick={() => (deleteStorage(photo), updatePhoto(""))}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <ImageCropUpload
                                            onUploadComplete={(e) => (values.photo = e, updatePhoto(e))}
                                            aspect={16 / 9}
                                            fileType="Event/"
                                        />
                                    )}
                                </div>
                                <div>
                                    <Label className="text-[14px] mt-3">Event Rules*</Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={values.rules}
                                        className="h-40 mb-14 mt-1.5"
                                        onChange={e => handleChange({ target: { name: "rules", value: e } })}
                                    />
                                </div>
                                <div>
                                    <Label className="text-[14px] mt-3">Prizes*</Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={values.prizes}
                                        className="h-40 mb-14 mt-1.5"
                                        onChange={e => handleChange({ target: { name: "prizes", value: e } })}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <InputField
                                        name="venue"
                                        placeholder="Event venue"
                                        label={"Venue*"}
                                    />
                                    <InputField
                                        type="time"
                                        name="event_start_time"
                                        label="Event start time*"
                                    />
                                    <InputField
                                        type="time"
                                        name="event_end_time"
                                        label="Event end time*"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-x-3">
                                    <InputField
                                        type="date"
                                        name="date"
                                        label="Event date*"
                                    />
                                    <InputField
                                        type="date"
                                        name="reg_date_start"
                                        label="Registration date start*"
                                    />
                                    <InputField
                                        type="date"
                                        name="reg_date_end"
                                        label="Registration date end*"
                                    />
                                </div>
                                <InputField
                                    name="organizer"
                                    placeholder="Event organizer"
                                    label={"Event organizer"}
                                />
                                <div className="flex gap-4 my-3">
                                    {isUpdate ? (
                                        <Button
                                            // disabled={photo === ""}
                                            color={"info"}
                                            type="submit"
                                        >
                                            Update Event
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                // disabled={photo === ""}
                                                color={"success"}
                                                type="submit"
                                            >
                                                Add Event
                                            </Button>
                                            <Button color={"failure"} type="reset">
                                                Reset
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EventModal;
