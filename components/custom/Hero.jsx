"use client"

import React from 'react'
import { Button } from '../ui/button'
import { img_hero } from "../../assets/constants/image"
import Image from 'next/image'
import SignInButton from './SignInButton'
import { useUserDetail } from '@/app/provider'
import Link from 'next/link'

function Hero() {

    const { userDetail, setUserDetail } = useUserDetail()

    return (
        <div className='px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col items-center mt-24'>
            <h2 className="font-extralight text-5xl text-center">
                AI-Powered
                <span className="text-indigo-500">
                    Email Templates
                </span>
            </h2>
            <p className='text-center mt-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minus deleniti nam soluta minima quisquam necessitatibus amet! Ea tempore quisquam fuga aut dolorem eos consectetur assumenda aliquam. Quisquam, dolores ipsum?
            </p>
            <div className='flex gap-5 mt-6'>
                <Link href="/dashboard">
                    <Button variant="outline" className='cursor-pointer'>
                        Try Demo
                    </Button>
                </Link>
                {!userDetail?.email && <SignInButton />}
            </div>
            <Image
                src={img_hero}
                alt="Hero Image"
                width={1000}
                height={800}
                className="mt-12"
            />
        </div>
    )
}

export default Hero
