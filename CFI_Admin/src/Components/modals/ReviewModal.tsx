import { Button, Modal } from "flowbite-react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../common/InputField";

type ReviewModalProps = {
    openModal: boolean;
    closedModel: () => void;
    reviewFields: reviewsType;
    updateReview: (values: reviewsType) => void;
};

function ReviewModal({
    openModal,
    closedModel,
    reviewFields,
    updateReview,
}: ReviewModalProps) {
    return (
        <>
            <Modal show={openModal} size={"xl"} popup onClose={closedModel}>
                <Modal.Header className="ps-6 pt-4 border-b">Update Review</Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={reviewFields}
                        onSubmit={updateReview}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <InputField
                                    name="name"
                                    label={"Reviewer name"}
                                    placeholder="Enter name"
                                />
                                <InputField 
                                    name="email"
                                    label={"Reviewer email"}
                                    placeholder="Enter email"
                                />
                                <InputField
                                    name="profession"
                                    label={"Reviewer profession"}
                                    placeholder="Enter profession"
                                />
                                <InputField
                                    isInput={false}
                                    name="message"
                                    label={"Review message"}
                                    placeholder="Enter message"
                                />
                                <div className="flex gap-4 mt-4">
                                    <Button color={"success"} type="submit" disabled={isSubmitting} >
                                        Update
                                    </Button>
                                    <Button color={"failure"} type="reset">
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
}

export default ReviewModal;
