"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

declare global {
   var cloudinary: any;
}

interface ImageUploadProps {
   onChange: (value: string) => void;
   value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
   const uploadHandler = useCallback(
      (result: any) => {
         onChange(result.info.secure_url);
      },
      [onChange]
   );

   return (
      <CldUploadWidget onUpload={uploadHandler} uploadPreset="oihsndiz" options={{ maxFiles: 1, maxFileSize: 5_240_000 }}>
         {({ open }) => {
            return (
               <div
                  onClick={() => open?.()}
                  className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-md overflow-hidden"
               >
                  <TbPhotoPlus size={40} />
                  <span className="font-semibold text-lg">Click to upload</span>
                  {value && (
                     <div className="absolute inset-0 size-full">
                        <Image alt="upload" fill style={{ objectFit: "cover" }} src={value} />
                     </div>
                  )}
               </div>
            );
         }}
      </CldUploadWidget>
   );
};

export default ImageUpload;
