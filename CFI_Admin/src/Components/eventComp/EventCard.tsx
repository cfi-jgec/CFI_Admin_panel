import { EventsItemsType } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface PropsType {
    props: EventsItemsType;
    deleteEvent: CallableFunction;
    updateEvent: CallableFunction;
}

const EventCard: React.FC<PropsType> = ({
    props,
    deleteEvent,
    updateEvent,
}) => {
    const { _id, photo, shortName } = props;
    return (
        <div
            key={_id}
            className="w-full max-h-72 bg-white shadow-md shadow-indigo-200 rounded-lg overflow-hidden border"
        >
            <Link href={`/events/${_id}`}>
                <Image
                    src={photo as string}
                    alt="card img"
                    width={200}
                    height={400}
                    unoptimized
                    loading="lazy"
                    className="w-full h-auto object-cover "
                />
            </Link>
            <div className="py-3 px-4">
                <Link href={`/events/${_id}`}>
                    <h1 className="font-medium text-base mb-1 text-center uppercase ">
                        {shortName}
                    </h1>
                </Link>
                <div className="flex items-center justify-between"> 
                    {/* <div
                        className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                        onClick={() => updateEvent(props)}
                    >
                        <FaEdit size={18} />
                    </div> */}
                    <div
                        className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                        onClick={() => deleteEvent(props)}
                    >
                        <MdDelete size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
