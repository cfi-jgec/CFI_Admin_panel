"use client";

import { fileToUrlLink } from "@/utils/data";
import { Button, FileInput, Label, Spinner } from "flowbite-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

type props = {
    onUploadComplete: (url: string) => void;
    fileType: string;
    name?: string;
};

export default function FileUpload({
    onUploadComplete,
    fileType,
    name,
}: props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file) {
                const fileUrl = await fileToUrlLink(file, "Notice");
                onUploadComplete(fileUrl!);
                // fileRef.current!.value = null;
                toast.success(`Successfully uploaded file`);
            } else {
                toast.error("Failed to upload file");
            }
        }
        setLoading(false);
    };

    return (
        <div className="w-full">
            <Label htmlFor="dropzone-file">Upload File</Label>
            {loading ? (
                <div className="w-full  h-48 rounded-md flex items-center justify-center bg-gray-200 mt-1">
                    <Button>
                        <Spinner aria-label="Spinner button btn-primary" size="sm" />
                        <span className="pl-3">Uploading...</span>
                    </Button>
                </div>
            ) : (
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
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF, PDF</p>
                </div>
                <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
            </Label>
         )} 
        </div>
    );
}
