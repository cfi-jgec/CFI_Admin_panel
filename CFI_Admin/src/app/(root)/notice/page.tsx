"use client";

import { Timeline } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCalendar } from "react-icons/hi";
import axios from "axios";
import { NoticeType } from "@/type";
import Layout from "@/Components/common/CommonLayout";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAsyncHandler } from "@/utils/asyncHandler";
import dynamic from "next/dynamic";
import { deleteStorage } from "@/utils/data";
const NoticeModal = dynamic(() => import("@/Components/modals/NoticeModal"), { ssr: false });

function Notice() {
    const [openModal, setOpenModal] = useState(false);
    const [allNotices, setAllNotices] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    const [noticeDetails, setNoticeDetails] = useState<NoticeType>({
        title: "",
        description: "",
        date: "",
        link: "",
    });
    const updateDetails = (value: NoticeType) => {
        setIsUpdate(true);
        setNoticeDetails(value);
        setOpenModal(true);
    };

    const resetAll = () => {
        setNoticeDetails({ title: "", description: "", date: "", link: "" });
        setOpenModal(false);
        setIsUpdate(false);
    };

    const getAllNotices = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notice`);
        setAllNotices(data.allNotices);
    });

    const deleteNotice = useAsyncHandler(async (value: NoticeType) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notice/remove`, value);
        if (value.link) await deleteStorage(value.link);
        getAllNotices();
    });

    useEffect(() => {
        getAllNotices();
    }, [openModal, noticeDetails]);

    return (
        <Layout header="Notice">
            <div className="button ms-auto" onClick={() => setOpenModal(true)}>
                Add Notice
            </div>
            <>
                <NoticeModal
                    openModal={openModal}
                    closedModal={() => resetAll()}
                    fields={noticeDetails}
                    isUpdate={isUpdate}
                />
                <div className="w-full px-6 py-8 z-10">
                    {allNotices && allNotices.length > 0 ? (
                        <Timeline>
                            {allNotices.map((item) => {
                                const { _id, title, description, link, date } = item;
                                return (
                                    <Timeline.Item key={_id}>
                                        <Timeline.Point icon={HiCalendar} className="bg-red-400" />
                                        <Timeline.Content
                                            className={
                                                "bg-white rounded-lg border shadow-lg p-4 ms-4 relative"
                                            }
                                        >
                                            <div className="absolute -left-0 -top-3 triangle"></div>
                                            <Timeline.Time className="text-paragraph font-medium">
                                                {date}
                                            </Timeline.Time>
                                            <Timeline.Title className="text-title capitalize">
                                                {title}
                                            </Timeline.Title>
                                            <Timeline.Body className="text-subtitle">
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: description }}
                                                />
                                            </Timeline.Body>
                                            <div className="flex items-center">
                                                {link && <a href={link} target="_blank">
                                                    <button className="button me-3">View file</button>
                                                </a>}
                                                <div
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => updateDetails(item)}
                                                >
                                                    <FaEdit size={20} className="text-green-400" />
                                                </div>
                                                <div
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => deleteNotice(item)}
                                                >
                                                    <MdDelete size={20} className="text-red-400" />
                                                </div>
                                            </div>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                );
                            })}
                        </Timeline>
                    ) : (
                        <h1 className="not_found">Sorry there is not notice present</h1>
                    )}
                </div>
            </>
        </Layout>
    );
}

export default Notice;
