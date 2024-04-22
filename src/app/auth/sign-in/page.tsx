'use client'

import React, { useEffect } from 'react'
import { signInWithGooglePopup } from '../../../../firebase.config';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '@/lib/store';


const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state:{user:{uid: ''}}) => state.user); 


    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        return response
    }

  

  return (
    <div >
       <div className='flex items-center flex-col justify-center h-screen '>
        <h1 className='pb-6 text-2xl'>
          Sign Into Studenthub
        </h1>
            <Button onClick={() => {
              
              logGoogleUser().then((userCredential):void => {
                router.push('/property/new', { scroll: false })
            dispatch(setLogin({displayName: userCredential.user.displayName,
              photoURL:userCredential.user.photoURL,
              email: userCredential.user.email,
              uid:userCredential.user.uid

            }))
            })


            }}>Continue with Google</Button>
        </div>
    </div>
  )
}

export default Page