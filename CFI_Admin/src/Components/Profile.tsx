
import { props } from '@/type'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdEmail, MdLogout } from 'react-icons/md'
import { IoPersonSharp } from "react-icons/io5";

const Profile: React.FC<props> = ({ openModal, closeModal }) => {
    const router = useRouter()
    const LogOut = async () => {
        await axios.post('/api/auth/logout');
        closeModal(false);
        toast.success(`User logged out successfully`)
        router.push('/login');
    }

    return (
        <>
            <div className={`absolute top-20 right-4 bg-white text-gray-600 w-60 shadow-lg rounded-b-md  p-5 ${openModal? "h-auto":"h-0 hidden"} transition-all ease-in-out duration-500`}>
                {
                    openModal && (
                        <>
                            <div className='flex items-center space-x-3 mb-2'>
                                <IoPersonSharp size={18} />
                                <span className='text-base font-medium text-title'>CFI_Admin</span>
                            </div>
                            <div className='flex items-center space-x-3 mb-3'>
                                <MdEmail size={18} />
                                <span className='text-base font-medium text-title'>cfiadmin@jgec.ac.in</span>
                            </div>
                            <div className='border-t pt-3'>
                                <button className='flex items-center space-x-2 text-red-500 ' onClick={() => LogOut()}>
                                    <MdLogout />
                                    <span className='' >Logout</span>
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Profile
