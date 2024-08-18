import Image from 'next/image'
import React from 'react'
import Logo from "@/assets/logo_dark.png";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <section className="w-full max-w-screen-xl mx-auto px-8 py-20 flex items-center justify-around  h-screen">
                <div className="w-2/5 flex items-center justify-center flex-col ">
                    <Image
                        src={Logo}
                        alt="cfi"
                        className="w-24 h-24 object-contain mb-6"
                    />
                    <h1 className="font-semibold text-gray-700 text-4xl mb-3">
                        Welcome to
                    </h1>
                    <h1 className="font-semibold text-gray-700 text-5xl">
                        CFI Admin Portal
                    </h1>
                </div>
                {children}
            </section>
        </>
    )
}

export default CommonLayout
