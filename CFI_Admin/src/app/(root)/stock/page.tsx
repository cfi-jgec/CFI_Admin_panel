"use client";

import Layout from "@/Components/common/CommonLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Arduino from "@/assets/arduino.jpeg";
import { TextInput } from "flowbite-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteStorage } from "@/utils/data";
import { ComponentsType, resComponentsType } from "@/type";
import axios from "axios"; 
import {useAsyncHandler } from "@/utils/asyncHandler";
import dynamic from "next/dynamic";
const StockModal=dynamic(()=>import('@/Components/modals/StockModal'),{ssr:false});


const Stock = () => {
    const [searchVal, setSearchVal] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [photo, setPhoto] = useState<string>("");
    const [resCompList, setResCompList] = useState<resComponentsType[]>();
    const [compDetails, setCompDetails] = useState<ComponentsType>({
        photo: "",
        name: "",
        modelNo: "",
        qty: 1,
    });

    // update values
    const openUpdate = async (value: ComponentsType) => {
        setIsUpdate(true);
        setCompDetails(value);
        setPhoto(value.photo);
        setOpenModal(true);
    };


    const deleteComp =useAsyncHandler(async (values: ComponentsType) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stock/remove`, values);
        if (values.photo) await deleteStorage(String(values.photo))
        getAllComp();
    });

    const getAllComp =useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stock`);
        setResCompList(data.components);
    });

    const resetAllData = () => {
        setCompDetails({
            photo: "",
            name: "",
            modelNo: "",
            qty: 1,
        });
        setIsUpdate(false);
        setPhoto('');
        setOpenModal(false);
    };

    useEffect(() => {
        getAllComp();
    }, [openModal]);

    return (
        <>
            <StockModal
                openModal={openModal}
                closedModal={resetAllData}
                isUpdate={isUpdate}
                fields={compDetails}
                photo={photo}
                updatePhoto={(val) => setPhoto(val)}
            />
            <section className="mb-20">
                <Layout header="stock">
                    <div className="flex justify-between items-center mb-4">
                        <TextInput
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Search by component name..."
                            icon={FaMagnifyingGlass}
                            className=" w-2/5 outline-none focus:ring-transparent focus:border-none"
                        />
                        <button
                            className="button w-48 ms-auto"
                            onClick={() => setOpenModal(true)}
                        >
                            Add Components
                        </button>
                    </div>
                    {
                        resCompList ?
                            <>
                                <div className="w-full h-full grid grid-cols-4 gap-6">
                                    {resCompList
                                        ?.filter((ele) =>
                                            ele.name.toLowerCase().includes(searchVal.toLowerCase())
                                        )
                                        .map((item, i) => (
                                            <div
                                                className="w-full h-auto rounded-lg border shadow-lg bg-white overflow-hidden"
                                                key={i}
                                            >
                                                <Image
                                                    src={item.photo ? item.photo : Arduino}
                                                    className="w-full h-auto object-cover mix-blend-multiply p-3 bg-gray-50"
                                                    alt="stock"
                                                    width={100}
                                                    height={100}
                                                    loading="lazy"
                                                    unoptimized={true}
                                                />
                                                <div className="w-full pb-3 px-3 text-sm font-medium text-gray-800">
                                                    <h1 className="text-base font-semibold capitalize">
                                                        {item.name}
                                                    </h1>
                                                    <p>
                                                        Model No:
                                                        <span className="text-gray-600 text-xs ms-2 uppercase">
                                                            {item.modelNo}
                                                        </span>
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <p className=" text-sm">
                                                            Qty-
                                                            <span className="text-gray-600 ms-2">{item.qty}</span>
                                                        </p>
                                                        <div className="mt-auto flex items-center justify-center space-x-4">
                                                            <FaRegEdit
                                                                size={16}
                                                                className="text-green-500 cursor-pointer"
                                                                onClick={() => openUpdate(item)}
                                                            />
                                                            <MdDelete
                                                                size={16}
                                                                className="text-red-500 cursor-pointer"
                                                                onClick={() => deleteComp(item)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </> :
                            <h1 className="not_found">Sorry no data found</h1>
                    }
                </Layout>
            </section>
        </>
    );
};

export default Stock;