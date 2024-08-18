"use client";

import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getCroppedImg } from "@/utils/CroppedImage";
import { storage } from "@/firebase";
import { Button, FileInput, Label } from "flowbite-react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { deleteStorage } from "@/utils/data";
import Image from "next/image";

interface CroppedArea {
    x: number;
    y: number;
    width: number;
    height: number;
}
type props = {
    onUploadComplete: (url: string) => void;
    aspect: number;
    fileType: string;
};

const ImageCropUpload: React.FC<props> = ({
    onUploadComplete,
    aspect,
    fileType,
}) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    // const [uploadedImg, setUploadedImg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] =
        useState<CroppedArea | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const onCropComplete = useCallback(
        (croppedArea: any, croppedAreaPixels: CroppedArea) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
        }
    };

    const handleUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        setLoading(true);
        try {
            // @ts-ignore
            setImageSrc(() => (fileRef.current.value = null));
            const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
            const blob = await fetch(croppedImg).then((res) => res.blob());
            const storageRef = ref(storage, `${fileType}/${Date.now()}`);
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            toast.success("photo uploaded successfully");
            // setUploadedImg(downloadURL);
            onUploadComplete(downloadURL);
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <Loader />;
    return (
        <div className="mt-1">
            <Label className="pb-2">Upload photo {`(<3MB)`}</Label>
            {/* {uploadedImg ? (
                <div className="flex items-center gap-x-2 w-48 h-48">
                    <Image
                        src={uploadedImg}
                        width={300}
                        height={300}
                        alt="uploaded"
                        className="w-44 h-44 object-contain"
                    />
                    <Button
                        type="button"
                        color={"failure"}
                        onClick={async () => {
                            await deleteStorage(uploadedImg);
                            setUploadedImg(null);
                        }}
                    >
                        Remove
                    </Button>
                </div>
            ) : ( */}
            <Label
                htmlFor="dropzone-file"
                className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-1"
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
                        <span className="font-semibold">Click to upload</span> or drag and
                        drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF, PDF
                    </p>
                </div>
                <FileInput
                    ref={fileRef}
                    accept="image/*"
                    id="dropzone-file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </Label>
            {/* )} */}
            {imageSrc && (
                <div className="w-full h-screen fixed top-0 left-0 bg-black/30  flex items-center justify-center z-[999]">
                    <div className="w-full max-w-xl h-[400px] bg-white z-[9999]">
                        <div className="w-full h-full relative">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="flex items-center justify-center  gap-x-4">
                            <button onClick={handleUpload} className="button ms-0 mt-4">
                                Upload
                            </button>
                            <button
                                onClick={() =>
                                    // @ts-ignore
                                    setImageSrc(() => (fileRef.current.value = null))
                                }
                                className="button  ms-0 bg-red-500 mx-auto mt-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCropUpload;
