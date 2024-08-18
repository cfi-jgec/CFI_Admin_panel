"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { Badge, Table, TextInput } from "flowbite-react";
import axios from "axios";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdCheck, MdDelete, MdPending } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useAsyncHandler } from "@/utils/asyncHandler";
import dynamic from "next/dynamic";
const ReviewModal = dynamic(() => import("@/Components/modals/ReviewModal"), {
    ssr: false,
});

const Project = () => {
    const [openModal, setOpenModal] = useState(false);
    const [allReviews, setAllReviews] = useState<reviewsType[]>([]);
    const [updateValues, setUpdateValues] = useState<reviewsType | null>(null);
    const [searchVal, setSearchVal] = useState("");

    const closedModel = () => {
        setOpenModal(false);
        resetValues();
    };
    const openUpdate = async (values: reviewsType) => {
        setUpdateValues(values);
        setOpenModal(true);
    };
    const resetValues = () => {
        setUpdateValues(null);
        setOpenModal(false);
    };

    const allProjects = useAsyncHandler(async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/review`
        );
        setAllReviews(data.reviews);
    });

    const acceptReview = useAsyncHandler(
        async (id: string, isAccepted: boolean) => {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/review/accept/${id}`,
                { isAccepted: !isAccepted }
            );
            allProjects();
        }
    );
    const deleteReview = useAsyncHandler(async (id: string) => {
        const { data } = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/review/remove/${id}`
        );
        toast.success(data.message);
        allProjects();
    });

    const updateReview = useAsyncHandler(async (values: reviewsType) => {
        const { data } = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/review/update/${values._id}`,
            values
        );
        toast.success(data.message);
        allProjects();
        closedModel();
    });

    useEffect(() => {
        allProjects();
    }, []);

    return (
        <Layout header={"Reviews"}>
            <div className="mb-4 mt-2 flex justify-between items-center">
                <div className="w-[20rem]">
                    <TextInput
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search by reviewer name"
                        icon={FaMagnifyingGlass}
                        className=" outline-none"
                    />
                </div>
            </div>
            {updateValues && (
                <ReviewModal
                    openModal={openModal}
                    closedModel={closedModel}
                    reviewFields={updateValues}
                    updateReview={updateReview}
                />
            )}
            {allReviews.length > 0 ? (
                <div className="overflow-x-auto my-2 shadow-md rounded-lg border">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="p-2">Name</Table.HeadCell>
                            <Table.HeadCell className="p-2">
                                Email & profession
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2">message</Table.HeadCell>
                            <Table.HeadCell className="p-2">Approval</Table.HeadCell>
                            <Table.HeadCell className="p-2">Acceptance</Table.HeadCell>
                            <Table.HeadCell className="p-2">Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divnamee-y">
                            {allReviews
                                .filter((ele) =>
                                    ele.name
                                        .toLocaleLowerCase()
                                        .includes(searchVal.toLocaleLowerCase())
                                )
                                .map((review, i) => {
                                    const { _id, name, email, profession, message, isAccepted } =
                                        review;
                                    return (
                                        <Table.Row
                                            key={_id}
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Table.Cell className="text-xs p-2 text-nowrap text-gray-800 font-semibold">
                                                {i + 1}. {name}
                                            </Table.Cell>
                                            <Table.Cell className="text-xs p-2">
                                                <p>{email}</p>
                                                <p>{profession}</p>
                                            </Table.Cell>
                                            <Table.Cell className="text-xs p-2">{message}</Table.Cell>
                                            <Table.Cell className="text-xs p-2">
                                                {!isAccepted ? (
                                                    <Badge
                                                        color={"indigo"}
                                                        className=" rounded-full w-20"
                                                        icon={MdPending}
                                                    >
                                                        pending
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        color={"success"}
                                                        className=" rounded-full w-24"
                                                        icon={MdCheck}
                                                    >
                                                        accepted
                                                    </Badge>
                                                )}
                                            </Table.Cell>
                                            <Table.Cell className="text-xs p-2">
                                                <button
                                                    onClick={() => acceptReview(_id, isAccepted)}
                                                    className={`px-4 py-2 rounded-full ${isAccepted ? "bg-red-500" : "bg-green-500"
                                                        } text-xs font-medium text-white`}
                                                >
                                                    {isAccepted ? "Decline" : "Approve"}
                                                </button>
                                            </Table.Cell>
                                            <Table.Cell className="text-xs p-2">
                                                <div className="flex text-xl items-center">
                                                    <div
                                                        className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                                                        onClick={() => openUpdate(review)}
                                                    >
                                                        <FaRegEdit />
                                                    </div>
                                                    <div
                                                        className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                        onClick={() => deleteReview(_id)}
                                                    >
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                        </Table.Body>
                    </Table>
                </div>
            ) : (
                <h1 className="not_found">Sorry no data found</h1>
            )}
        </Layout>
    );
};

export default Project;
