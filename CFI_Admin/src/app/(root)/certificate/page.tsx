"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Folder from "@/assets/folder.png";
import { MdDelete } from "react-icons/md";
import { useAsyncHandler } from "@/utils/asyncHandler";
import { useRouter } from "next/navigation";
import { deleteStorage } from "@/utils/data";

type props = {
    _id: string;
    category: String;
    categoryList: {
        url: string;
        refId: string;
    }[];
};

type eventNames = {
    shortName: string;
    _id: string;
};

const Category = () => {
    const router = useRouter();
    const [category, setCategory] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [categoryList, setCategoryList] = useState<props[]>([]);
    const [eventNames, setEventNames] = useState<eventNames[]>([]);

    const resetAll = () => {
        setCategory("");
        setOpenModal(false);
    };

    const CreateCategory = useAsyncHandler(async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/folder/create`, {
            category
        });
        resetAll();
    });

    const deleteFolder = useAsyncHandler(async (item: props) => {
        const { _id, categoryList } = item;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/folder/delete`, {
            id: _id
        });
        if (categoryList.length) {
            for (let i = 0; i < categoryList.length; i++) {
                await deleteStorage(categoryList[i].url);
            }
        }
        allCategory();
        resetAll();
    })

    const allCategory = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/folders`);
        setCategoryList(data.list);
    });

    const getEventNames = useAsyncHandler(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event/event/names`);
        setEventNames(data);
    });

    useEffect(() => {
        allCategory();
        getEventNames();
    }, [openModal]);


    return (
        <Layout header={"certificate"}>
            <div
                className="button w-40 ms-auto mb-4"
                onClick={() => setOpenModal(true)}
            >
                Create Folder
            </div>
            <section>
                <Modal show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Create Folder</Modal.Header>
                    <Modal.Body>
                        <label htmlFor="folder">
                            Select certificate category
                        </label>
                        <select
                            onChange={(e: any) => setCategory(e.target.value)}
                            className="w-full block my-3 rounded-md   border-gray-400 mb-4"
                        >
                            <option value={''} >Select category</option>
                            {eventNames.map((item, i) => (
                                <option key={i} value={item.shortName}>
                                    {item.shortName}
                                </option>
                            ))}
                        </select>
                        <h1 className="text-center text-gray-400 mb-2">OR</h1>
                        <label htmlFor="folder">
                            Write folder name
                        </label>
                        <input
                            type="text"
                            placeholder="Folder name"
                            className="w-full block mt-2 rounded-md uppercase outline-none border-gray-400"
                            value={category}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setCategory(e.target.value)
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="button ms-0 w-40 bg-green-500"
                            onClick={CreateCategory}
                            disabled={category === ""}
                        >
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
                {
                    categoryList.length > 0 ?
                        <div className="w-full grid grid-cols-6 gap-6">
                            {categoryList.map((item, i) => (
                                <div
                                    key={i}
                                    className="relative "
                                >
                                    <Image
                                        src={Folder}
                                        alt="folder"
                                        className="w-full object-contain cursor-pointer"
                                        onClick={() => router.push(`/certificate/${item.category}`)}
                                    />
                                    <div className=" my-1.5">
                                        <Link href={`/certificate/${item.category}`}>
                                            <h1 className="text-blue-600 uppercase font-medium text-center text-xs max-w-32 ">
                                                {item.category}
                                            </h1>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center">
                                        <button className="text-red-500 text-sm font-medium border border-red-500 rounded-md flex w-24 py-1 items-center justify-center gap-1 hover:bg-red-500 hover:text-white transition-all duration-300 ease-linear " onClick={() => deleteFolder(item)}>
                                            <MdDelete size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <h1 className="not_found">Sorry no data found</h1>
                }
            </section>
        </Layout>
    );
};

export default Category;
