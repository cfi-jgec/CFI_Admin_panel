import { MdReviews, MdSpaceDashboard } from "react-icons/md";
import { GrAnnounce, GrGallery } from "react-icons/gr";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";
import { HiOutlineTrophy } from "react-icons/hi2";
import { GrCertificate } from "react-icons/gr";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { FaTools } from "react-icons/fa";

interface ListItemsType {
    name: string,
    link: string,
    icon: React.ReactNode,
}

export const ListItems: ListItemsType[] = [
    {
        name: "dashboard",
        link: "/",
        icon: <MdSpaceDashboard size={20} />,
    },
    {
        name: "Notice",
        link: "/notice",
        icon: <GrAnnounce size={20} />,
    },
    {
        name: "events",
        link: "/events",
        icon: <HiOutlineTrophy size={20} />,
    },
    {
        name: "members",
        link: "/member",
        icon: <PiUsersThreeFill size={20} />,
    },
    {
        name: "gallery",
        link: "/gallery",
        icon: <GrGallery size={20} />,
    },
    {
        name: "stock",
        link: "/stock",
        icon: <FaTools size={20} />,
    },
    {
        name: "projects",
        link: "/projects",
        icon: <FaGear size={20} />,
    },
    {
        name: "certificates",
        link: "/certificate",
        icon: <GrCertificate size={20} />,
    },
    {
        name: "Alerts",
        link: "/alert",
        icon: <IoNotificationsCircleOutline size={20} />,
    },
    {
        name: "Reviews",
        link: "/reviews",
        icon: <MdReviews size={20} />,
    },
]; 