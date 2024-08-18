import React from 'react'
import { GiNotebook } from "react-icons/gi";
import Link from "next/link"

const DashboardBox:React.FC<any> = ({ item }) => {
    console.log(item)
    const { name, path, color, icon } = item;
    return (
        <>
            <Link href={path}>
                <div className={`w-full h-28 rounded-xl ${color} p-4 text-black`}>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-lg font-semibold capitalize'>{name}</h1>
                        {icon}
                    </div>
                    <p className='text-2xl font-semibold mx-4'>10</p>
                </div>
            </Link>
        </>
    )
}

export default DashboardBox
