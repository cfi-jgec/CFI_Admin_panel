"use client"

import { Modal, Select, Spinner } from "flowbite-react"
import { ErrorMessage, Form, Formik } from "formik";
import Image from "next/image";
import { FC, useState } from "react";
import InputField from "../common/InputField";
import { MdCurrencyRupee } from "react-icons/md";
import * as Yup from 'yup';
import axios from "axios";
import toast from "react-hot-toast";

interface props {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    teams: registerTeamsType[]
}

interface IFormData {
    _id: string
    rank: number
    prize: string
    message: string
    teamName: string
    teamLogo: string
}

const UpdateResult: FC<props> = ({ openModal, setOpenModal, teams }) => {
    const [loading, setLoading] = useState(false);
    // Prepare initial values
    const initialValues = {
        teamsData: teams.map(team => ({
            _id: team._id,
            rank: Number(team?.rank) || 0,
            prize: team?.prize || '',
            message: team?.message || '',
            teamName: team.teamName,
            teamLogo: team.teamLogo
        }))
    };

    // Validation schema
    const validateState = Yup.object().shape({
        teamsData: Yup.array().of(
            Yup.object().shape({
                rank: Yup.number().required('Rank is required').min(0, 'Invalid rank'),
                prize: Yup.number().required('Prize is required')
            })
        )
    });

    const handelSubmit = async (values: { teamsData: IFormData[] }) => {
        // Updated values with all details 
        try {
            setLoading(true);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event/update-result`, values.teamsData);
            toast.success(data.message);
            setOpenModal(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to update results');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={openModal} size="3xl" popup onClose={() => setOpenModal(false)}>
            <Modal.Header className="ps-4 py-3">Update Event Results</Modal.Header>
            <Modal.Body>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handelSubmit}
                // validationSchema={validateState}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            {values.teamsData.map((team, index) => (
                                <div
                                    key={team._id}
                                    className="flex items-center justify-between border-b border-gray-200 py-2"
                                >
                                    <div className="flex items-center">
                                        <Image
                                            src={team.teamLogo}
                                            alt={team.teamName}
                                            width={80}
                                            height={80}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <p className="ms-4">{team.teamName}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <Select
                                                name={`teamsData.${index}.rank`}
                                                className="cursor-pointer"
                                                value={team.rank}
                                                onChange={(e) =>
                                                    setFieldValue(`teamsData.${index}.rank`, Number(e.target.value))
                                                }
                                            >
                                                {Array.from({ length: teams.length }, (_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </Select>
                                            <ErrorMessage
                                                component="div"
                                                name={`teamsData.${index}.rank`}
                                                className="text-red-600 text-xs"
                                            />
                                        </div>
                                        <InputField
                                            name={`teamsData.${index}.prize`}
                                            placeholder="Prize"
                                            containerClass="!my-0"
                                            icon={MdCurrencyRupee}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md disabled:opacity-50"
                                disabled={loading}
                            >
                                Update
                                {loading && <Spinner className="ms-2" size={'sm'} />}
                            </button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateResult;
