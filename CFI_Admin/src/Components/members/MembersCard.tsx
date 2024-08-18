import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

const MembersCard: FC<{ year: string }> = ({ year }) => {
    return (
        <div>
            <div className="w-full h-56 p-4 border shadow-lg rounded-lg bg-white flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                    <Image
                        src={'/images/members.png'}
                        className="w-20 h-auto object-contain"
                        alt="icon"
                        width={80}
                        height={80}
                    />
                </div>
                <div className="w-full mt-4 space-y-1 flex flex-col items-center justify-center">
                    <h1 className="text-lg font-semibold text-title text-center">
                        {year} Batch
                    </h1>
                    <Link href={`/member/${year}`}>
                        <button className="button w-44 mx-auto text-gray-700 bg-white hover:bg-gray-200">
                            View Members
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MembersCard
