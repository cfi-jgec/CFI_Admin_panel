"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { FileInput, Label, Modal, Table } from "flowbite-react";
import { deleteStorage, fileToUrlLink } from "@/utils/data";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { useAsyncHandler } from "@/utils/asyncHandler";

type props = {
    url: string;
    refId: string;
};

const Certificate = () => {
    const { category } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [uploadList, setUploadList] = useState<props[]>([]);
    const [certList, setCertList] = useState<props[]>([]);
    const [isUploaded, setIsUploaded] = useState(false);

    const resetValues = () => {
        setUploadList([]);
        setOpenModal(false);
        allCertificates();
    };

    const deleteCertificate = useAsyncHandler(async (item: props) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/certificate/delete`, {
            category,
            item,
        });
        if (item.url) await deleteStorage(item.url);
        allCertificates()
        resetValues();
    });

    const addCertificate = useAsyncHandler(async () => {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/certificate/upload`, {
            category,
            uploadList,
        });
        if (data.list.categoryList.length > 0) {
            setCertList(data.list.categoryList);
        }
        toast.success(data.message);
        resetValues();
    });

    const allCertificates = useAsyncHandler(async () => {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/certificates`, {
            category,
        });
        setCertList(data.item);
    });

    const uploadMany = useAsyncHandler(async (event: any) => {
        let CertificateArray = [];
        for (let i = 0; i < event.target.files.length; i++) {
            let imageFile = event.target.files[i];
            const imgUrl = await fileToUrlLink(imageFile, `Certificates/${category}`);
            if (imgUrl) {
                const certificate = {
                    url: imgUrl,
                    refId: `CFI-${Math.floor(Math.random() * 10000)}`,
                };
                CertificateArray.push(certificate);
            }
        }
        toast.success("files uploaded successfully");
        if (CertificateArray.length > 0) {
            setUploadList(CertificateArray);
        }
        setIsUploaded(true);
    })

    useEffect(() => {
        allCertificates();
    }, [openModal]);


    return (
        <Layout header={"certificate"}>
            <div
                className="button w-56 ms-auto mb-6"
                onClick={() => setOpenModal(true)}
            >
                Upload Certificates
            </div>
            <div>
                <Modal show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Upload Certificates</Modal.Header>
                    <Modal.Body>
                        <div className="mb-2">
                            <Label
                                htmlFor="certificate"
                                value="Upload certificate(You can choose multiple files)"
                            />
                            <Label
                                htmlFor="dropzone-file"
                                className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-3"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <FileInput
                                    id="dropzone-file"
                                    className="hidden"
                                    onChange={(e) => uploadMany(e)}
                                    accept=".pdf"
                                    multiple
                                />
                            </Label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            disabled={!isUploaded}
                            className={`button ms-0 w-52 
                            ${isUploaded ? "bg-green-500" : "bg-green-200"}`}
                            onClick={addCertificate}
                        >
                            Add Certificate
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            {certList.length > 0 && certList ? (
                <div className=" overflow-x-auto my-2 shadow-lg rounded-lg border  mb-12">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Sl. No.</Table.HeadCell>
                            <Table.HeadCell>Event Name</Table.HeadCell>
                            <Table.HeadCell>ref No</Table.HeadCell>
                            <Table.HeadCell>certificate</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divnamee-y">
                            {certList.map((item, i) => {
                                const { url, refId } = item;
                                return (
                                    <Table.Row key={i} className="bg-white dark:border-gray-700">
                                        <Table.Cell className="">{i + 1}</Table.Cell>
                                        <Table.Cell className="text-sm uppercase">
                                            {category}
                                        </Table.Cell>
                                        <Table.Cell>{refId}</Table.Cell>
                                        <Table.Cell>
                                            <Link href={url} target="_blank">
                                                <h1 className="font-semibold text-blue-600 cursor-pointer">
                                                    View
                                                </h1>
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex text-xl items-center">
                                                <div
                                                    onClick={() => deleteCertificate(item)}
                                                    className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                >
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </div>
            ) : (
                <div className="w-full h-60 flex items-center justify-center">
                    <h1 className="not_found">Sorry no data found</h1>
                </div>
            )}
        </Layout>
    );
};

export default Certificate;
