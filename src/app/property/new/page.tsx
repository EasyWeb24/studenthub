'use client'
import * as z from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../../../firebase.config'
import ImageUpload from '@/components/image-upload'
import { useEffect, useState } from 'react'
import NavigationBase from '@/components/navigation-base'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'


const addProperty = async (property:{propertyTitle:string, propertyDescription?:string, location:string, additionalInfo:string, imageUrl:string}) => {
    try {
        const docRef = await addDoc(collection(db, "properties"), {
          ...property  
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}


const formSchema = z.object({
    propertyTitle: z.string(),
    propertyDescripton: z.string(),
    location: z.string(),
    additionalInfo: z.string(),
    imageUrl: z.string(),
    price:  z.coerce.number()
})




const Page = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const router = useRouter()

    const user = useSelector((state:{user:{uid: ''}}) => state.user); 

   user.uid === null && router.push('/auth/sign-in')


const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
})



const handleSubmit = async (values:z.infer<typeof formSchema>) => {
await addProperty(values)
}

useEffect(()=>{
    form.register('imageUrl')
imageUrl && form.setValue('imageUrl', imageUrl)
}, [imageUrl, form])

  return (
  <div className='pt-16'>
    <NavigationBase/>
  <main className='py-6 px-4'>                    
    <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl}  />
    {form.formState.errors.imageUrl  &&<div className='pb-4 text-destructive'>
        { form.formState.errors.imageUrl.message}
    </div>}

       
       <Form {...form}>
<form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
    <FormField control={form.control} name='propertyTitle' render={({field} ) => {
        return <FormItem>
            <FormLabel>
                Property Title
            </FormLabel>
            <FormControl>
<Input {...field} placeholder='Property Title' />
            </FormControl>
            <FormMessage/>
        </FormItem>
    }}/>
    <FormField control={form.control} name='location' render={({field} ) => {
        return <FormItem>
            <FormLabel>
Location
            </FormLabel>
            <FormControl>
<Input {...field} placeholder='Location'/>
            </FormControl>
            <FormMessage/>
        </FormItem>
    }}/>
    <FormField control={form.control} name='additionalInfo' render={({field} ) => {
        return <FormItem>
            <FormLabel>
Additional Information
            </FormLabel>
            <FormControl>
<Input {...field} placeholder='Additional Information'/>
            </FormControl>
            <FormMessage/>
        </FormItem>
    }}/>
    <FormField control={form.control} name='price' render={({field} ) => {
        return <FormItem>
            <FormLabel>
Price            </FormLabel>
            <FormControl>
<Input {...field} placeholder='Price' type='number' />
            </FormControl>
            <FormMessage/>
        </FormItem>
    }}/>
    <FormField control={form.control} name='propertyDescripton' render={({field} ) => {
        return <FormItem>
            <FormLabel>
                Property Description
            </FormLabel>
            <FormControl>
<Textarea {...field} placeholder='Property Description' />
            </FormControl>
            <FormMessage/>
        </FormItem>
    }}/>
    <Button type='submit' >
Submit
    </Button>
</form>
       </Form>
    </main>
  </div>
  )
}

export default Page