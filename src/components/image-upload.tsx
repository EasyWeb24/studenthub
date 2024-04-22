'use client'

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from 'react'

const ImageUpload = ({setImageUrl, imageUrl}:{setImageUrl:Dispatch<SetStateAction<string>>, imageUrl:string}) => {


  return (
    <div className="pb-4" >
        <UploadDropzone endpoint='imageUploader' appearance={{
            label: ''
        }}  onClientUploadComplete={(res) => {
          setImageUrl(res[0].url)
          
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}/> 
       {  imageUrl.length ? <div className="py-4">
                   <Image
          alt="New Property"
          className="object-cover rounded-t-lg"
          height={400}
          src={imageUrl}
          style={{
            objectFit: "cover",
          }} 
          width={400}
        />
                </div> : null
        }
    </div>
  )
}

export default ImageUpload