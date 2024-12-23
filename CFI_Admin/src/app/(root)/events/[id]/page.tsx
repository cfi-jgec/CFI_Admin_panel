"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { Badge, Button, Label, Select, Table } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAsyncHandler } from "@/utils/asyncHandler";
import axios from "axios";
import { MdCall, MdDelete, MdEmail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { deleteStorage } from "@/utils/data";
const EventModal = dynamic(() => import('@/Components/modals/EventModal'), { ssr: false });
const TeamsDetailsModal = dynamic(() => import('@/Components/modals/TeamsDetailsModal'), { ssr: false })
const UpdateResult = dynamic(() => import('@/Components/modals/update-result'), { ssr: false })

const ParticularEvent = () => {
    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [photo, setPhoto] = useState<string>("");
    const [eventDetails, setEventDetails] = useState<EventsItemsType>();
    const [teams, setTeams] = useState<registerTeamsType[]>([])
    const [openTeamModal, setOpenTeamModal] = useState(false);
    const [teamData, setTeamData] = useState<registerTeamsType>();
    const [status, setStatus] = useState<string>('');
    const [openResultModal, setOpenResultModal] = useState(false);
    const router = useRouter();

    const resetData = () => {
        setIsUpdate(false);
        setOpenModal(false);
        setEventDetails(undefined);
    };

    const getEventDetails = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`);
        setEventDetails(data.event);
    });

    const CompletedEvent = useAsyncHandler(async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event/mark-completed`, { id, isCompleted: status === 'closed' });
        toast.success("Event is marked as completed");
        getEventDetails();
    });

    const getRegisterTeams = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event/register/teams`);
        setTeams(data);
    })

    const deleteEvent = useAsyncHandler(async (item: EventsItemsType) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event/remove`, item);
        if (item.photo) await deleteStorage(item.photo);
        toast.success("Event is deleted successfully");
        router.replace('/events')
    });

    useEffect(() => {
        getEventDetails();
        getRegisterTeams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal, openTeamModal]);

    const handelTeamDetails = (id: string) => {
        const teamsDetail = teams.find(ele => ele._id == id);
        if (teamsDetail) {
            setTeamData(teamsDetail);
            setOpenTeamModal(true);
        }
    }
    const removeTeamFromEvent = useAsyncHandler(async (id: string) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event/register/teams/remove/${id}`);
        toast.success("Team is removed from the event");
        getRegisterTeams();
    })

    useEffect(() => {
        if (eventDetails) {
            const res = teams.filter((item) => item.eventId === eventDetails._id);
            setTeams(res);
        }
    }, [eventDetails, teams]);

    return (
        <Layout header="Event Details">
            <EventModal
                openModal={openModal}
                closedModal={resetData}
                fields={eventDetails!}
                isUpdate={isUpdate}
                updatePhoto={(val: string) => setPhoto(val)}
                photo={photo}
            />
            {teamData && <TeamsDetailsModal
                open={openTeamModal}
                closed={() => setOpenTeamModal(false)}
                data={teamData}
            />}
            {eventDetails ? (
                <div className="pb-12 react-quill">
                    <div className="w-full bg-white rounded-lg p-8 mt-4 border shadow-lg">
                        <Image
                            src={eventDetails.photo as string}
                            alt="event img"
                            width={1000}
                            height={500}
                            className="mx-auto rounded-md"
                        />
                        <h1 className="text-center mt-4 mb-8 font-semibold text-gray-800 text-3xl capitalize">
                            {eventDetails.fullName}
                        </h1>
                        <h3 className="text-xl font-semibold text-title mb-2">Event Description</h3>
                        <div dangerouslySetInnerHTML={{ __html: eventDetails.description }} />
                        <h3 className="text-xl font-semibold text-title mb-2 mt-8">Event Rules</h3>
                        {eventDetails.rules &&
                            <div dangerouslySetInnerHTML={{ __html: eventDetails.rules }} />
                        }

                        <h1 className="text-2xl font-medium my-3">Important Details :</h1>
                        <div className="grid grid-cols-3 gap-6 text-gray-700 mb-8">
                            <div>
                                <div className="mb-2.5">
                                    <h3 className="font-medium text-title mb-1">Registration starting Date:-</h3>
                                    <p>{eventDetails.reg_date_start}</p>
                                </div>
                                <div className="mb-2.5">
                                    <h3 className="font-medium text-title mb-1">Registration closing Date:-</h3>
                                    <p>{eventDetails.reg_date_end}</p>
                                </div>
                                {
                                    !eventDetails.isCompleted ?
                                        <Badge color={'success'} className="inline-block text-sm rounded-full"> Open</Badge> :
                                        <Badge color={'failure'} className="inline-block text-sm rounded-full"> Closed</Badge>
                                }
                            </div>
                            <div className="space-y-2">
                                <div className="flex   gap-x-2 capitalize">
                                    <h3 className="font-medium text-title mb-1">Venue:-</h3>
                                    <p>{eventDetails.venue}</p>
                                </div>
                                <div className="flex items-center gap-x-2 capitalize">
                                    <h3 className="font-medium text-title mb-1">Event Date:-</h3>
                                    <p>{eventDetails.date}</p>
                                </div>
                                <div className="flex items-center gap-x-2 capitalize" >
                                    <h3 className="font-medium text-title mb-1">Time Duration:-</h3>
                                    <p>{eventDetails.event_start_time}-{eventDetails.event_end_time}</p>
                                </div>
                            </div>
                            <div>
                                {eventDetails.prizes &&
                                    <div dangerouslySetInnerHTML={{ __html: eventDetails.prizes }} />
                                }
                            </div>
                        </div>
                        <div className="flex items-end gap-6 mb-4">
                            <div>
                                <Label>Event Status: </Label>
                                <Select
                                    className="w-48"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value={"closed"}>Mark as Completed</option>
                                    <option value={'open'}>Mark as Incomplete</option>
                                </Select>
                            </div>
                            <Button color={'info'} disabled={status === ''} onClick={CompletedEvent}>Save</Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <Button color={'success'} onClick={() => setOpenResultModal(true)} >Declare Result</Button>
                            <Button
                                color={'failure'}
                                onClick={() => deleteEvent(eventDetails)}
                            >
                                <MdDelete className="me-2 text-lg" />
                                Delete Event
                            </Button>
                        </div>
                    </div>
                    {teams.length > 0 && <div className="w-full bg-white rounded-lg py-8 mt-4 border shadow-lg">
                        <h1 className="text-center mb-8 font-semibold text-gray-700 text-3xl capitalize">
                            Registered Teams
                        </h1>
                        <div className="overflow-x-auto my-2  border">
                            <Table hoverable className="rounded-none">
                                <Table.Head className="bg-red-500">
                                    <Table.HeadCell className="text-sm p-2 ps-3">SL.</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Team Name</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Team Leader</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Contact Info</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2"> Members</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Approval</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divnamee-y">
                                    {teams.map((item, i) => {
                                        const {
                                            isApproved,
                                            teamName,
                                            teamLogo,
                                            leaderName,
                                            email,
                                            phone,
                                            members
                                        } = item;
                                        return (
                                            <Table.Row key={i} className="bg-white">
                                                <Table.Cell className="text-sm py-3 ps-3 pe-2">{i + 1}</Table.Cell>
                                                <Table.Cell className=" flex items-center gap-3 capitalize text-gray-800 text-xs  px-2 whitespace-nowrap font-medium">
                                                    <Image
                                                        src={teamLogo}
                                                        width={20}
                                                        height={20}
                                                        alt="teamlogo"
                                                    />
                                                    <span>{teamName}</span>
                                                </Table.Cell>
                                                <Table.Cell className="capitalize text-xs whitespace-nowrap font-medium text-title py-3 px-2">
                                                    {leaderName}
                                                </Table.Cell>
                                                <Table.Cell className="text-xs py-3 px-2">
                                                    <div className="flex items-center gap-x-3 mb-1">
                                                        <MdEmail />
                                                        {email}
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <MdCall />
                                                        {phone}
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="text-sm py-3 px-2">
                                                    {members.length + 1}
                                                </Table.Cell>
                                                <Table.Cell className="text-sm py-3 px-2">
                                                    {isApproved ? <Badge className="rounded-full text-xs inline-block" color={"success"}>Approved</Badge> :
                                                        <Badge className="rounded-full text-xs inline-block" color={"purple"}>pending</Badge>}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex text-xl items-center">
                                                        <div
                                                            className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                                                            onClick={() => handelTeamDetails(item._id)}
                                                        >
                                                            <FaUserEdit />
                                                        </div>
                                                        <div
                                                            className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                            onClick={() => removeTeamFromEvent(item._id)}
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
                    </div>}
                </div>
            ) : (
                <h1 className="text-2xl font-semibold text-center text-gray-600 py-20">
                    Sorry no data found
                </h1>
            )}
            <UpdateResult
                openModal={openResultModal}
                setOpenModal={(value: boolean) => setOpenResultModal(value)}
                teams={teams}
            />
        </Layout>
    );
};

export default ParticularEvent;
