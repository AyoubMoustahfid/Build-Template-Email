"use client"

import React from 'react'
import { Button } from '../ui/button';
import {useGoogleLogin} from "@react-oauth/google"
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {useRouter} from "next/navigation"

function SignInButton() {
    const router = useRouter()
    
    const CreateUser = useMutation(api.users.CreateUser)
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            console.log(userInfo.data);
            const user = userInfo.data;

            const result = await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture
            })

            const userDetails = {
                ...user,
                _id: result?._id?? result
            }
            
            if(user){
                localStorage.setItem("userDetail", JSON.stringify(userDetails))
                router.push('/dashboard/create')
                window.location.reload()
            }

        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <div>
            <Button onClick={googleLogin} className="cursor-pointer">
                Sign In with Google
            </Button>
        </div>
    )
}

export default SignInButton
