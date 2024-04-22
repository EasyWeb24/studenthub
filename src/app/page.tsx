'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { Badge } from "@/components/ui/badge"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import NavigationBase from "@/components/navigation-base";



export default function Home() {
  const [properties, setProperties] = useState<{
    propertyTitle: string,
    propertyDescripton: string,
    location: string,
    additionalInfo: string,
    imageUrl: string,
    id: string,
    price:string
  }[]>();
 
  
 
  useEffect(()=>{
    const fetchPost = async () => {
     
      await getDocs(collection(db, "properties"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id })) as {
                    propertyTitle: string,
                    propertyDescripton: string,
                    location: string,
                    additionalInfo: string,
                    imageUrl: string,
                    id: string,
                    price:string

                  }[]
                  setProperties(newData);                
              console.log(properties, newData);
          })
     
  }
      fetchPost();
  }, [])

  if (!properties) return <>
  <NavigationBase/>
Loading State  
</>

  return (
   <>
   <NavigationBase/>
   <div className="mt-16 px-3 ">
   <Carousel >
  <CarouselContent>
  
   
      {
         properties?.map(({propertyDescripton, propertyTitle, imageUrl, additionalInfo, location, id, price})=> {
          return <CarouselItem key={id}> <Card className="w-fit">
          <div className="aspect-w-4 aspect-h-5 relative ">
               <Image
                 alt="Product"
                 className="object-cover rounded-t-lg"
                 height={300}
                 src={imageUrl}
                 style={{
                   aspectRatio: "400/300",
                   objectFit: "cover",
                 }} 
                 width={400}
               />
             </div>
         <CardHeader>
           <CardTitle>{propertyTitle}</CardTitle>
           <CardDescription>
            Description: {propertyDescripton}
           </CardDescription>
         </CardHeader>
         <CardContent>
         <div className="flex flex-col gap-2 items-start">
          <Badge >
       {location}
          </Badge>
           <Badge className="text-3xl font-semibold">
           ₦{price}
           
           </Badge>
          </div>
          
         </CardContent>
         <CardFooter>
         <p>
            Additional Information: {additionalInfo}
           </p>
       
         </CardFooter>
       </Card> </CarouselItem>
          })
      }
  
  </CarouselContent>
  </Carousel>
   </div>
 
   </>
  );
}
