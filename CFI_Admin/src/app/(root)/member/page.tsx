"use client";

import { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import axios from "axios"; 
import {useAsyncHandler } from "@/utils/asyncHandler";
import MembersCard from "@/Components/members/MembersCard";
import dynamic from "next/dynamic"; 
const MembersModal = dynamic(() => import('@/Components/modals/MembersModal'), { ssr: false })

const Alumni = () => {
    const [openModal, setOpenModal] = useState(false);
    const [yearList, setYearList] = useState<string[]>([]);
    const [selectPositions, setSelectPositions] = useState<string[]>([]);
    const [photo, setPhoto] = useState<string>("");
    const [memberDetails, setMemberDetails] = useState<membersType>({
        name: "",
        position: [],
        year: "",
        dept: "",
        photo: "",
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
            photo: "",
            position: [],
            year: "",
            dept: "",
            email: "",
            phone: "",
            facebook: "",
            instagram: "",
            linkedin: "",
        });
        setOpenModal(false);
    };

    // get all alumni details
    const getAllMembers =useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members`);
        const list = data.members;
        if (list) {
            const yearList = list.map((ele: any) => ele.year);
            const years: Set<string> = new Set(yearList);
            const newArr: string[] = Array.from(years);
            setYearList(newArr);
        }
    });

    useEffect(() => {
        getAllMembers();
    }, [openModal]);

    return (
        <Layout header="Members">
            <div className="w-full h-auto pb-20 overflow-auto">
                <div className="button mb-4 ms-auto" onClick={() => setOpenModal(true)}>
                    Add Member
                </div>
                <MembersModal
                    openModal={openModal}
                    closedModal={resetAllData}
                    fields={memberDetails}
                    isUpdate={false}
                    selectPositions={selectPositions}
                    setSelectPositions={setSelectPositions}
                    photo={photo}
                    setPhoto={setPhoto}
                />
                <div>
                    {yearList.length > 0 ? (
                        <div className="grid grid-cols-4 gap-8">
                            {yearList
                                .sort()
                                .reverse()
                                .map((ele) => (
                                    <MembersCard key={ele} year={ele} />
                                ))}
                        </div>
                    ) : (
                        <h1 className="text-center text-4xl font-semibold text-gray-600 my-20">
                            Sorry no data found
                        </h1>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Alumni;

