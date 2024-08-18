"use client";

import { FaCircleUser } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import Profile from "./Profile";
import Link from "next/link";

function TopBar() {
    const [openProfile, setOpenProfile] = useState(false);
    return (
        <div className="sticky top-0 right-0  z-[9] w-full h-20 bg-topBg px-10 flex justify-end items-center shadow-xl">
            {
                <div className="flex text-2xl text-gray-600">
                    <Link href={"/alert"}>
                        <IoNotifications className="cursor-pointer mx-2" />
                    </Link>
                    <Link href={"https://mail.google.com"}>
                        {" "}
                        <MdEmail className="cursor-pointer mx-2" />
                    </Link>
                    <FaCircleUser
                        className="cursor-pointer mx-2"
                        onClick={() => setOpenProfile(!openProfile)}
                    />
                </div>
            }
            <Profile
                closeModal={(value: boolean) => setOpenProfile(value)}
                openModal={openProfile}
            />
        </div>
    );
}

export default TopBar;
