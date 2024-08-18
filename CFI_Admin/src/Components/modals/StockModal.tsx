import { ComponentsType } from "@/type";
import {useAsyncHandler } from "@/utils/asyncHandler";
import { stockValidate } from "@/utils/ValidateSchema";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import InputField from "../common/InputField";
import ImageCropUpload from "../common/CroppedImage";
import Image from "next/image";
import { deleteStorage } from "@/utils/data";

type props = {
    openModal: boolean;
    closedModal: () => void;
    isUpdate: boolean;
    fields: ComponentsType;
    photo: string;
    updatePhoto: (e: string) => void;
};

const StockModal: FC<props> = ({
    openModal,
    closedModal,
    fields,
    isUpdate = false,
    photo,
    updatePhoto,
}) => {
    const submitDetails =useAsyncHandler(async (values) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stock/${isUpdate ? "update" : "add"}`, values);
        closedModal();
    });

    return (
        <>
            <Modal show={openModal} size={"xl"} onClose={closedModal}>
                <Modal.Header>
                    {isUpdate ? "Update Component details" : "Add new Component details"}
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={fields}
                        validationSchema={stockValidate}
                        onSubmit={submitDetails}
                    >
                        {({ values }) => (
                            <Form>
                                <div className="flex items-center gap-x-4">
                                    {photo ? (
                                        <div className="flex items-center gap-x-4">
                                            <div className="w-40 h-40 bg-gray-200 min-w-16 rounded-md">
                                                <Image
                                                    src={photo}
                                                    alt="component"
                                                    width={300}
                                                    height={200}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <Button
                                                color={"failure"}
                                                size={"sm"}
                                                onClick={() => (deleteStorage(photo), updatePhoto(""))}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="w-full">
                                            <ImageCropUpload
                                                aspect={4/3}
                                                onUploadComplete={(e) => (
                                                    updatePhoto(e), (values.photo = e)
                                                )}
                                                fileType="Components"
                                            />
                                        </div>
                                    )}
                                </div>
                                <InputField
                                    name="name"
                                    label="Component name"
                                    placeholder="Enter component name"
                                    disabled={isUpdate}
                                />
                                <InputField
                                    name="modelNo"
                                    label="Model No"
                                    placeholder="Enter Model No"
                                />
                                <InputField
                                    type="number"
                                    name="qty"
                                    label="Quantity"
                                    placeholder="Enter quantity"
                                />
                                <div className="flex items-center gap-x-4 mt-4">
                                    <Button type="submit" color={'success'} disabled={photo === ""}>
                                        {isUpdate ? "Update" : "Add Component"}
                                    </Button>
                                    <Button type="reset" className="button bg-red-500">
                                        Reset
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default StockModal;
