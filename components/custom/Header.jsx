"use client"

import React from 'react'
import Image from 'next/image'
import { img_logo } from "../../assets/constants/image"
import SignInButton from './SignInButton'
import { useUserDetail } from '@/app/provider'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from "next/navigation"

function Header() {
    const { userDetail, setUserDetail } = useUserDetail()
    const router = useRouter()
    const logout = () => {
        setUserDetail(null)
        localStorage.removeItem('userDetail')
        router.push('/')
    }

    return (
        <div className='flex justify-between items-center p-4 shadow-sm px-10'>
            <div className='flex items-center gap-4'>
                <Image
                    src={img_logo}
                    alt="Logo"
                    width={180}
                />
                {userDetail?.email && (
                    <Link href={"/dashboard"}>
                        <Button className="cursor-pointer">
                            Dashboard
                        </Button>
                    </Link>
                )}
            </div>
            <div>
                {userDetail?.email ?
                    <div className='flex gap-3 items-center'>

                        <Button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-500 cursor-pointer text-white font-bold px-3"
                        >
                            Log Out
                        </Button>
                        <Image
                            src={userDetail?.picture}
                            alt="Profile"
                            width={40}
                            height={40}
                            className='rounded-full'
                        />
                    </div>
                    : <SignInButton />
                }
            </div>
        </div>
    )
}

export default Header
