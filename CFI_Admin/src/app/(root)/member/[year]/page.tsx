"use client";

import { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { Table } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { deleteStorage } from "@/utils/data";
import axios from "axios";
import Link from "next/link";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaUserEdit,
} from "react-icons/fa";
import { MdEmail, MdCall, MdDelete } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useAsyncHandler } from "@/utils/asyncHandler"; 
const MembersModal = dynamic(() => import('@/Components/modals/MembersModal'), { ssr: false })


const Members = () => {
    const [openModal, setOpenModal] = useState(false);
    const { year } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [resAllMembers, setResAllMembers] = useState<resMembersType[]>();
    const [searchVal, setSearchVal] = useState("");
    const [selectPositions, setSelectPositions] = useState<string[]>([]);
    const [photo, setPhoto] = useState<string>("");
    const [memberDetails, setMemberDetails] = useState<membersType>({
        photo: "",
        name: "",
        position: [],
        year: year,
        dept: "",
        email: "",
        phone: "",
        facebook: "",
        instagram: "",
        linkedin: "",
    });

    // reset values
    const resetAllData = async () => {
        setMemberDetails({
            name: "",
            position: [],
            year: year,
            dept: "",
            email: "",
            phone: "",
            facebook: "",
            instagram: "",
            linkedin: "",
        });
        setIsUpdate(false);
        setOpenModal(false);
        setSelectPositions([]);
        setPhoto("");
    };

    // update values
    const openUpdate = async (value: resMembersType) => {
        setIsUpdate(true);
        const {
            name,
            photo,
            position,
            year,
            dept,
            email,
            phone,
            socialLinks: { facebook, instagram, linkedin },
        } = value;
        setMemberDetails({
            name,
            photo,
            position,
            year,
            dept,
            email,
            phone,
            facebook,
            instagram,
            linkedin,
        }); 
        setOpenModal(true);
        setPhoto(photo as string);
        setSelectPositions(position);
    };

    const getAllMembers = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/${year}`);
        setResAllMembers(data.members);
    });

    // delete alumni details
    const removeMembersDetails = useAsyncHandler(async (values: membersType) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/members/remove`, values);
        if (values.photo) deleteStorage(values.photo)
        getAllMembers();
    });

    useEffect(() => {
        getAllMembers();
    }, [year, openModal]);


    return (
        <Layout header="Members">
            <div className="mb-4 mt-2 flex justify-between items-center">
                <div className="w-[20rem]">
                    <TextInput
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search by name...."
                        icon={FaMagnifyingGlass}
                        className=" outline-none focus:ring-transparent focus:border-none"
                    />
                </div>
                <div className="button" onClick={() => setOpenModal(true)}>
                    Add Member
                </div>
            </div>
            <MembersModal
                openModal={openModal}
                closedModal={resetAllData}
                fields={memberDetails}
                isUpdate={isUpdate}
                selectPositions={selectPositions}
                setSelectPositions={setSelectPositions}
                photo={photo}
                setPhoto={setPhoto}
            />
            <div>
                {resAllMembers && resAllMembers.length > 0 ?
                    (
                        <div className="overflow-x-auto my-2 shadow-lg rounded-lg border">
                            <Table hoverable>
                                <Table.Head className="bg-red-500">
                                    <Table.HeadCell>Alumni Name</Table.HeadCell>
                                    <Table.HeadCell>Position</Table.HeadCell>
                                    <Table.HeadCell>Year & Dept</Table.HeadCell>
                                    <Table.HeadCell>contact info</Table.HeadCell>
                                    <Table.HeadCell>social links</Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divnamee-y">
                                    {resAllMembers
                                        .filter((ele) =>
                                            ele.name.toLowerCase().includes(searchVal.toLowerCase())
                                        )
                                        .filter((elem) => (elem.year = year))
                                        .map((item, i) => {
                                            const {
                                                name,
                                                photo,
                                                position,
                                                year,
                                                dept,
                                                email,
                                                phone,
                                                socialLinks: { facebook, instagram, linkedin },
                                            } = item;
                                            return (
                                                <Table.Row key={i} className="bg-white">
                                                    <Table.Cell className="whitespace-nowrap capitalize font-medium text-gray-900 flex items-center">
                                                        {photo && <Image
                                                            src={photo}
                                                            alt="photo"
                                                            className="min-w-12 w-12 h-12 rounded-full object-cover me-3"
                                                            width={50}
                                                            height={50}
                                                        />}
                                                        {name}
                                                    </Table.Cell>
                                                    <Table.Cell className="!p-1">
                                                        <div className="flex flex-wrap text-title font-medium">
                                                            {position.map(ele => (
                                                                <p className="text-xs" key={ele}>#{ele}</p>
                                                            ))}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell className="p-2 text-center">
                                                        {year}, {dept} dept. 
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-x-3 mb-1">
                                                            <MdEmail />
                                                            {email}
                                                        </div>
                                                        <div className="flex items-center gap-x-3">
                                                            <MdCall />
                                                            {phone}{" "}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-x-3 text-xl">
                                                            {facebook && (
                                                                <Link
                                                                    href={facebook}
                                                                    target="_blank"
                                                                    className="text-blue-700"
                                                                >
                                                                    <FaFacebook />
                                                                </Link>
                                                            )}
                                                            {instagram && (
                                                                <Link
                                                                    href={instagram}
                                                                    target="_blank"
                                                                    className="text-rose-500"
                                                                >
                                                                    <FaInstagram />
                                                                </Link>
                                                            )}
                                                            {linkedin && (
                                                                <Link
                                                                    href={linkedin}
                                                                    target="_blank"
                                                                    className="text-blue-500"
                                                                >
                                                                    <FaLinkedin />
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex text-xl items-center">
                                                            <div
                                                                className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                                                                onClick={() => openUpdate(item)}
                                                            >
                                                                <FaUserEdit />
                                                            </div>
                                                            <div
                                                                className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                                onClick={() => removeMembersDetails(item)}
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
                        <h1 className="text-center text-4xl font-semibold text-gray-600 my-20">
                            Sorry no data found
                        </h1>
                    )}
            </div>
        </Layout>
    );
};

export default Members;
