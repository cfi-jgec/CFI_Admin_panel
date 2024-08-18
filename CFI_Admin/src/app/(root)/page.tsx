
import React from 'react'
import Layout from "@/Components/common/CommonLayout";
import { DashboardItems } from '@/utils/DashboardITems';
import Link from "next/link"
import axios from 'axios';

const Dashboard = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/allCount`);
    return (
        <Layout header="dashboard">
            <div>
                <div className='grid grid-cols-5 gap-x-6'>
                    {
                        Object.keys(data).map((item: string) => {
                            const count = data[item];
                            const dashboardItem = DashboardItems[item];
                            if (!dashboardItem) return null;
                            const { name, path, icon, color } = dashboardItem;
                            return (
                                <Link href={path} key={name}>
                                    <div className={`w-full h-28 rounded-xl  p-4 text-white`} style={{ backgroundColor: color }}>
                                        <div className='flex justify-between items-center mb-4'>
                                            <h1 className='text-lg font-semibold capitalize'>{name}</h1>
                                            {icon}
                                        </div>
                                        <p className='text-2xl font-semibold mx-4'>{count}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard