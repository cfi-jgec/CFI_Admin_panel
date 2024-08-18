"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { TextInput } from "flowbite-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "axios";
import { deleteStorage } from "@/utils/data"; 
import { useAsyncHandler } from "@/utils/asyncHandler";
import dynamic from "next/dynamic";
const EventCard = dynamic(() => import("@/Components/eventComp/EventCard"), { ssr: false });
const EventModal = dynamic(() => import('@/Components/modals/EventModal'), { ssr: false })

const Events = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [photo, setPhotoUrl] = useState<string>("");
    const [eventDetails, setEventDetails] = useState<EventsItemsType>({
        eventId: `CFI_Event_${Date.now()}`,
        date: "",
        description: "",
        event_end_time: "",
        event_start_time: "",
        fullName: "",
        organizer: "",
        photo: "",
        prizes: "",
        reg_date_end: "",
        reg_date_start: "",
        rules: "",
        shortName: "",
        venue: "",
        isCompleted: false,
    });
    const [eventList, setEventList] = useState<EventsItemsType[]>([]);

    // reset values
    const resetData = () => {
        setEventDetails({
            eventId: `CFI_Event_${Date.now()}`,
            date: "",
            description: "",
            event_end_time: "",
            event_start_time: "",
            fullName: "",
            organizer: "",
            photo: "",
            prizes: "",
            reg_date_end: "",
            reg_date_start: "",
            rules: "",
            shortName: "",
            venue: "",
            isCompleted: false,
        });
        setOpenModal(false);
        setIsUpdate(false);
        setPhotoUrl("");
    };

    // update values
    const openUpdate = async (value: EventsItemsType) => {
        setIsUpdate(true);
        setEventDetails(value);
        if (photo) setPhotoUrl(String(photo));
        setOpenModal(true);
    };

    // get all alumni details
    const getAllEvents = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event`);
        setEventList(data.events);
    });

    // delete alumni details
    const deleteEvent = useAsyncHandler(async (item: EventsItemsType) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event/remove`, item);
        if (item.photo) await deleteStorage(item.photo);
        getAllEvents();
    });

    useEffect(() => {
        getAllEvents();
    }, [openModal, isUpdate]);

    return (
        <Layout header={"events"}>
            <div className="mb-4 mt-2 flex justify-between items-center">
                <div className="w-[20rem]">
                    <TextInput
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search by name"
                        icon={FaMagnifyingGlass}
                        className=" outline-none"
                    />
                </div>
                <div
                    className="button"
                    color="light"
                    onClick={() => setOpenModal(true)}
                >
                    Add New
                </div>
            </div>
            <EventModal
                openModal={openModal}
                closedModal={resetData}
                fields={eventDetails}
                isUpdate={isUpdate}
                updatePhoto={(val: string) => setPhotoUrl(val)}
                photo={photo}
            />

            {eventList && eventList.length > 0 ? (
                <div className="grid grid-cols-3 gap-8">
                    {eventList
                        .filter((ele) =>
                            ele.shortName.toLowerCase().includes(searchVal.toLowerCase())
                        )
                        .map((item, i) => {
                            return (
                                <EventCard
                                    key={i}
                                    props={item}
                                    updateEvent={(e: EventsItemsType) => openUpdate(e)}
                                    deleteEvent={(e: EventsItemsType) => deleteEvent(e)}
                                />
                            );
                        })}
                </div>
            ) : (
                <h1 className="not_found">Sorry no data found</h1>
            )}
        </Layout>
    );
};

export default Events;

