"use client";

import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
    Badge,
    Button,
    Label,
    Modal,
    Table,
    Textarea,
    TextInput,
} from "flowbite-react";
import { MdCall, MdDelete, MdEmail } from "react-icons/md";
import { MdPending } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { HiCheck } from "react-icons/hi2";
import { useAsyncHandler } from "@/utils/asyncHandler";
import dynamic from "next/dynamic"; 

const Alert = () => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const [searchVal, setSearchVal] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [contactList, setContactList] = useState<contactResType[]>([]);
    const [answerQuery, setAnswerQuery] = useState({
        _id: "",
        email: "",
        query: "",
        solution: "",
    });

    const getContactRes = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contact/all-query`);
        setContactList(data.allRes);
    });

    const solvedQuery = (value: contactResType) => {
        setOpenModal(true);
        const { _id, email, message, solution } = value;
        setAnswerQuery({ _id, email, query: message, solution });
    };

    const handelSaveRes = useAsyncHandler(async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/resolve`, answerQuery);
        getContactRes();
        toast.success("Query solution saved successfully");
        setAnswerQuery({
            _id: "",
            email: "",
            query: "",
            solution: "",
        })
        setOpenModal(false)
    });

    const deleteQuery = useAsyncHandler(async (_id: string) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/delete`, { _id });
        toast.success("Query deleted successfully");
        getContactRes();
    });

    useEffect(() => {
        getContactRes();
    }, [openModal]);

    return (
        <Layout header={"Alerts"}>
            {contactList.length > 0 ? (
                <>
                    <div className="mb-4 mt-2 flex justify-between items-center">
                        <div className="w-[20rem]">
                            <TextInput
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                placeholder="Search...."
                                icon={FaMagnifyingGlass}
                                className=" outline-none"
                            />
                        </div>
                    </div>
                    <Modal show={openModal} size={"xl"} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Resolve Query</Modal.Header>
                        <Modal.Body>
                            <Label htmlFor="query" >Query</Label>
                            <Textarea defaultValue={answerQuery.query} disabled className="mt-1.5 mb-3 resize-none text-gray-800" />
                            <Label htmlFor="query">Resolve the query</Label>
                            <ReactQuill
                                theme="snow"
                                className="h-60 mb-12 mt-1.5"
                                value={answerQuery.solution}
                                onChange={(value) =>
                                    setAnswerQuery({ ...answerQuery, solution: value })
                                }
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type="submit"
                                className="button w-36 bg-green-500 "
                                onClick={handelSaveRes}
                                disabled={answerQuery.solution === ""}
                            >
                                Update Query
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <div className="overflow-x-auto my-2">
                        {
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell className="p-2">No.</Table.HeadCell>
                                    <Table.HeadCell className="p-2">Query</Table.HeadCell>
                                    <Table.HeadCell className="text-nowrap p-2">
                                        Person Name
                                    </Table.HeadCell>
                                    <Table.HeadCell className="p-2">Email & Mobile No.</Table.HeadCell>
                                    <Table.HeadCell className="p-2">date</Table.HeadCell>
                                    <Table.HeadCell className="p-2">Status</Table.HeadCell>
                                    <Table.HeadCell className="p-2">Solution</Table.HeadCell>
                                    <Table.HeadCell className="p-2">Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divnamee-y">
                                    {contactList.map((item, i) => {
                                        const { name, mobile, email, status, message, date } = item;
                                        return (
                                            <Table.Row className="bg-white" key={i}>
                                                <Table.Cell className="p-2">{i + 1}</Table.Cell>
                                                <Table.Cell className="text-xs p-2">{message}</Table.Cell>
                                                <Table.Cell className=" capitalize text-sm p-2 text-nowrap">
                                                    {name}
                                                </Table.Cell>
                                                <Table.Cell className="p-2 text-xs text-gray-600">
                                                    <div className="flex items-center gap-x-1 mb-1">
                                                        <MdEmail />
                                                        {email}
                                                    </div>
                                                    <div className="flex items-center gap-x-1">
                                                        <MdCall />
                                                        {mobile}
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="p-2 text-xs text-gray-600">
                                                    {new Date(date).toLocaleDateString()}
                                                </Table.Cell>
                                                <Table.Cell className="p-2">
                                                    {!status ? (
                                                        <Badge color="purple" icon={MdPending}>
                                                            Pending
                                                        </Badge>
                                                    ) : (
                                                        <Badge color="success" icon={HiCheck}>
                                                            Resolved
                                                        </Badge>
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell className="p-2">
                                                    <button
                                                        onClick={() => solvedQuery(item)}
                                                        className="px-2 py-1.5 rounded-full bg-green-200 text-green-600 text-xs text-nowrap font-semibold "
                                                    >
                                                        Solve Now
                                                    </button>
                                                </Table.Cell>
                                                <Table.Cell className="p-2">
                                                    <div className="flex text-xl items-center">
                                                        <div
                                                            onClick={() => deleteQuery(item._id)}
                                                            className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
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
                        }
                    </div>
                </>
            ) : (
                <h1 className="not_found">Sorry, No response Present!</h1>
            )}
        </Layout>
    );
};

export default Alert;
