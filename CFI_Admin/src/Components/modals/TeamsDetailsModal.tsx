import { useAsyncHandler } from '@/utils/asyncHandler'
import axios from 'axios'
import { Badge, Button, Modal } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { MdPhone } from 'react-icons/md'


type props = {
    open: boolean,
    closed: () => void;
    data: registerTeamsType
}

function TeamsDetailsModal({ data, open, closed }: props) {

    const ApprovedTeam = useAsyncHandler(async (_id) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event/register/teams/approval`, { _id }); 
        toast.success("Team's registration is approved for the event")
        closed();
    })

    const { _id, teamLogo, teamName, isApproved, projectName, projectDescription, prize, leaderBranch, leaderName, leaderYear, email, phone, members } = data;
    return (
        <div>
            <Modal show={open} size={'xl'} onClose={closed}>
                <Modal.Header>
                    Team Details
                </Modal.Header>
                <Modal.Body>
                    <div className="flex items-center gap-4 mb-4">
                        <Image src={teamLogo} alt="team logo" width={80} height={80} className='w-24 h-24 rounded-full bg-gray-100 object-cover' />
                        <h1 className="text-xl font-semibold text-title capitalize">{teamName}</h1>
                        <div>
                            {!isApproved ? <Badge color={'purple'} className="rounded-full" >Pending</Badge> :
                                <Badge color={'success'} className="rounded-full" >Approved</Badge>}
                        </div>
                    </div>
                    <div className="mb-4 border-b pb-3">
                        <h1 className="text-xl border-b pb-2 font-medium mb-4 ">Project Details</h1>
                        <h3 className="text-lg font-medium capitalize text-subtitle">{projectName}</h3>
                        <p className="text-sm text-gray-700">{projectDescription}</p>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-x-2">
                            <h1 className="text-gray-600">Team Leader : </h1>
                            <span className="text-title font-medium capitalize">{leaderName}, {leaderYear} year, {leaderBranch} Dept.</span>
                        </li>
                        <li className="flex items-center gap-x-2">
                            <h1 className="text-gray-600">Email : </h1>
                            <span>{email}</span>
                        </li>
                        <li className="flex items-center gap-x-2">
                            <h1 className="text-gray-600">mobile no : </h1>
                            <span>{phone}</span>
                        </li>
                    </ul>
                    <h1 className="text-xl font-medium text-title border-b pb-1 my-3">Team members details</h1>
                    <ul>
                        {
                            members.map((mem, i) => (
                                <li className="flex items-center gap-x-2 capitalize" key={i}>
                                    {i + 1}.{" "}
                                    <p>{mem.name}, {mem.year} Year, {mem.branch} Dept.</p>{"  "}
                                    <MdPhone />
                                    {mem.phone}
                                </li>
                            ))
                        }
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button color={'success'} onClick={() => ApprovedTeam(_id)} >Approved Team</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TeamsDetailsModal
