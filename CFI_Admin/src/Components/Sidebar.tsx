"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";
import { ListItems } from "@/utils/NavItems";
import Logo from "@/assets/logo_light.png"

const Sidebar = () => {
  const pathname = usePathname();
  let path = '/' + pathname.split('/')[1];
  return (
    <div className="w-full h-full bg-[rgb(28,36,52)] text-white">
      <div className="flex items-center justify-center pt-6">
        <Image src={Logo} alt="cfi logo" width={48} height={48} className="w-12 h-12 object-contain" />
        <h1 className="text-2xl font-semibold ms-3">CFI Admin Panel</h1>
      </div>
      <ul className="my-12 px-4">
        {ListItems.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className={`flex items-center  font-medium  text-gray-300 ${item.link == path && "bg-slate-400/40 text-white"
              } py-2 ps-6 my-2 cursor-pointer rounded-md`}
          >
            {item.icon}
            <li className="ms-3 capitalize">{item.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
