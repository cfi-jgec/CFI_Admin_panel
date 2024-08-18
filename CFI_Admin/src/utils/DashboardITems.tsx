import { FaGear } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { MdReviews } from "react-icons/md";

interface DashboardItem {
    [key: string]: {
        name: string;
        path: string;
        icon: JSX.Element;
        color: string;
    }
}


export const DashboardItems: DashboardItem = {
    notices: {
        name: "notices",
        path: "/notice",
        icon: <GrAnnounce size={20} />,
        color: "#B01CE3"
    },
    events: {
        name: "events",
        path: "/events",
        icon: <HiOutlineTrophy size={20} />,
        color: "#EE11BF",
    },
    projects: {
        name: "projects",
        path: "/projects",
        icon: <FaGear size={20} />,
        color: "#2FB0D0"
    },
    reviews: {
        name: "reviews",
        path: "/reviews",
        icon: <MdReviews size={20} />,
        color: "#2CD34C"
    },
    alerts: {
        name: "alerts",
        path: "/alert",
        icon: <IoNotificationsCircleOutline size={20} />,
        color: "#F1220E"
    },
}