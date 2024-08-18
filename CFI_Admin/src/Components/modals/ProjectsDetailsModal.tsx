import { Modal } from 'flowbite-react';
import Image from 'next/image';
import React from 'react'

type Props = {
    openModal: boolean;
    setOpenModal: () => void;
    projectDetails: projectDetailsType;
}

function ProjectsDetailsModal({ openModal, setOpenModal, projectDetails }: Props) {
    const { projectName, studentName, year, branch, files, projectDescription, liveLink } = projectDetails;
    return (
        <>
            <Modal show={openModal} onClose={setOpenModal} size={'6xl'}>
                <Modal.Header>
                    <h1 className="text-2xl font-semibold">Project Details</h1>
                </Modal.Header>
                <div className="layout max-xs:p-0 xs:my-4">
                    <div className="w-full bg-white xs:rounded-lg p-4 sm:p-6 lg:p-8">
                        <h1 className="text-2xl xxs:text-3xl sm:text-4xl font-bold text-center max-xxs:pt-4 mb-3 xs:mb-6 capitalize">
                            {projectName}
                        </h1>
                        <div className="text-center text-gray-800">
                            <p className="opacity-75 mb-1">Made by/Presented by</p>
                            <p className="font-semibold">
                                {studentName},{" "}
                                <span className=""> 
                                    {year} Year, {branch} Dept.
                                </span>
                            </p>
                        </div>
                        <h1 className="text-xl xs:text-2xl md:text-3xl font-semibold border-b pb-1.5 xs:pb-3 mb-4 mt-8">
                            Project Description
                        </h1>
                        <div
                            className="customeHtml max-xs:!text-sm"
                            dangerouslySetInnerHTML={{ __html: projectDescription }}
                        />

                        <h1 className="text-xl xs:text-2xl md:text-3xl font-semibold border-b pb-1.5 xs:pb-3 mb-4 mt-8">
                            Project Gallery
                        </h1>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                            {files.map((file: string) => (
                                <div key={file}>
                                    <Image
                                        src={file}
                                        alt="Project Image"
                                        width={800}
                                        height={600}
                                        className="rounded-lg object-cover"
                                        priority
                                        loading='eager'
                                    />
                                </div>
                            ))}
                        </div>
                        <h1 className="text-xl xs:text-2xl md:text-3xl font-semibold border-b pb-1.5 xs:pb-3 mb-4 mt-8">
                            Project Demo
                        </h1>
                        <a href={liveLink} target="_blank" rel="noreferrer" className="text-blue-500 underline">Click here to view demo</a>
                        {liveLink && <iframe
                            width="420"
                            src={liveLink}
                            className="w-full h-60 sm:h-[20rem] md:h-[25rem] lg:h-[30rem] object-cover rounded-lg mt-6"
                        ></iframe>}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProjectsDetailsModal
