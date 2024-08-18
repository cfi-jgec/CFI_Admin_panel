"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import {
    Badge,
    Table,
    TextInput,
    Tooltip,
} from "flowbite-react";
import axios from "axios";
import { FaEye, FaMagnifyingGlass } from "react-icons/fa6";
import { MdCheck, MdDelete, MdPending } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useAsyncHandler } from "@/utils/asyncHandler";
import dynamic from "next/dynamic";
import { deleteStorage } from "@/utils/data";
const ProjectsDetailsModal = dynamic(() => import("@/Components/modals/ProjectsDetailsModal"));

const Project = () => {
    const [projectList, setProjectList] = useState<projectType[]>([]);
    const [projectDetails, setProjectDetails] = useState<projectDetailsType | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [searchVal, setSearchVal] = useState("");

    const allProjects = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
        setProjectList(data);
    });

    const approvedProject = useAsyncHandler(async (id: string, data: { isApproved: boolean }) => {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/projects/approve/${id}`, data);
        allProjects();
    });

    const deleteProject = useAsyncHandler(async (id: string, files: string[]) => {
        const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/projects/remove/${id}`);
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                await deleteStorage(files[i]);
            }
        }
        toast.success(data.message);
        allProjects();
    });

    const viewProject = useAsyncHandler(async (id: string) => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/details/${id}`);
        setProjectDetails(data);
        setOpenModal(true);
    });

    useEffect(() => {
        allProjects();
    }, []);

    return (
        <Layout header={"projects"}>
            <div className="mb-4 mt-2 flex justify-between items-center">
                <div className="w-[20rem]">
                    <TextInput
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search  title, name"
                        icon={FaMagnifyingGlass}
                        className=" outline-none"
                    />
                </div>
            </div>
            {projectDetails &&
                <ProjectsDetailsModal
                    openModal={openModal}
                    setOpenModal={() => setOpenModal(false)}
                    projectDetails={projectDetails}
                />
            }
            {projectList && projectList.length > 0 ? (
                <div className="overflow-x-auto my-2 shadow-md rounded-lg border">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Project Name</Table.HeadCell>
                            <Table.HeadCell>Student Name</Table.HeadCell>
                            <Table.HeadCell>Year & Dept.</Table.HeadCell>
                            <Table.HeadCell>Approval</Table.HeadCell>
                            <Table.HeadCell>Acceptance</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divnamee-y">
                            {projectList
                                .filter(
                                    (ele) =>
                                        ele.projectName
                                            .toLowerCase()
                                            .includes(searchVal.toLowerCase()) ||
                                        ele.studentName
                                            .toLowerCase()
                                            .includes(searchVal.toLowerCase())
                                )
                                .map((project) => {
                                    const {
                                        _id,
                                        files,
                                        projectName,
                                        studentName,
                                        year,
                                        branch,
                                        isApproved,
                                    } = project;
                                    return (
                                        <Table.Row
                                            key={_id}
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Table.Cell className="capitalize">{projectName}</Table.Cell>
                                            <Table.Cell>{studentName}</Table.Cell>
                                            <Table.Cell>
                                                {year}, {branch}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {!isApproved ? (
                                                    <Badge
                                                        color={"indigo"}
                                                        className="w-20 rounded-full"
                                                        icon={MdPending}
                                                    >
                                                        Pending
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        color={"green"}
                                                        className="w-24 rounded-full"
                                                        icon={MdCheck}
                                                    >
                                                        accepted
                                                    </Badge>
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <button
                                                    onClick={() => approvedProject(_id, { isApproved: !isApproved })}
                                                    className={`px-4 py-2 rounded-full ${isApproved ? "bg-red-500" : "bg-green-500"
                                                        } text-xs font-medium text-white`}
                                                >
                                                    {isApproved ? "Decline" : "Approve"}
                                                </button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="flex text-xl items-center">
                                                    <Tooltip content="Update Project">
                                                        <div
                                                            className=" cursor-pointer text-blue-500 hover:bg-gray-200 p-2 rounded-full "
                                                            onClick={() => viewProject(_id)}
                                                        >
                                                            <FaEye />
                                                        </div>
                                                    </Tooltip>
                                                    <Tooltip content="Delete Project">
                                                        <div
                                                            className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                            onClick={() => deleteProject(_id, files)}
                                                        >
                                                            <MdDelete />
                                                        </div>
                                                    </Tooltip>
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
