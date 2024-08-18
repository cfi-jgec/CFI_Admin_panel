import { Button, Label, Modal } from 'flowbite-react'
import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react'
import InputField from '../common/InputField';
import ReactQuill from 'react-quill';
import FileUpload from '../forms/FileUpload';
import { NoticeType } from '@/type';
import { useAsyncHandler } from '@/utils/asyncHandler';
import axios from 'axios';

type pros = {
    openModal: boolean;
    closedModal: () => void;
    fields: NoticeType;
    isUpdate: boolean;
}

const NoticeModal: FC<pros> = ({ openModal, closedModal, fields, isUpdate = false }) => {
    // save response to db
    const submitDetails = useAsyncHandler(async (values) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notice/${isUpdate ? "update" : "add"}`, values);
        closedModal();
    });

    return (
        <>
            <Modal
                show={openModal}
                size="2xl"
                popup
                onClose={closedModal}
            >
                <Modal.Header className="border-b">
                    <p className="ms-4 pt-2 ">{isUpdate ? "Update the notice" : "Add new notice"}</p>
                </Modal.Header>
                <Modal.Body className="py-3 pb-6">
                    <Formik
                        enableReinitialize={true}
                        initialValues={fields}
                        onSubmit={submitDetails}
                    >
                        {({ values }) => (
                            <Form>
                                <InputField name="title" placeholder="Notice title" label="Notice Title" />
                                <div>
                                    <Label className="mb-2">Notice Details</Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={values.description}
                                        onChange={(e: any) => values.description = e}
                                        className="h-40 mb-14"
                                    />
                                </div>
                                <FileUpload name='link' onUploadComplete={(url) => values.link = url} fileType='Notice' />
                                <div className="text-center text-sm font-semibold text-gray-600 mt-3">
                                    OR
                                </div>
                                <InputField name="link" placeholder="Enter link" label="Provide link" />
                                <div className="mb-2">
                                    <div className="mb-1 block">
                                        <Label htmlFor="date" value="Choose the date" />
                                    </div>
                                    <Field type={'date'} name="date" className="w-full rounded-md bg-gray-50 border-gray-300" />
                                </div>
                                <div className="mt-4 flex items-center">
                                    <Button className="button !w-36 bg-green-500 me-6" type="submit">
                                        {isUpdate ? "Update Notice" : "Add Notice"}
                                    </Button>
                                    <Button className="button bg-red-500" type="reset">
                                        Remove
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NoticeModal
