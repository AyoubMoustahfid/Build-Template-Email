"use client"
import { img_create_email } from '@/assets/constants/image'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useConvex } from 'convex/react'
import { useUserDetail } from '@/app/provider'
import { api } from '@/convex/_generated/api'
import moment from 'moment'

function EmailTemplateList() {
    const [emailList, setEmailList] = useState([])
    const convex = useConvex()
    const { userDetail, setUserDetail } = useUserDetail()


    useEffect(() => {
        userDetail && GetTemplateList()
    }, [userDetail])

    const GetTemplateList = async () => {
        const result = await convex.query(api.emailTemplate.GetAllUserTemplate, {
            email: userDetail?.email
        })

        setEmailList(result)
    }
    return (
        <div>
            <h2 className='font-bold text-xl text-indigo-500'>
                Workshop
            </h2>
            {emailList?.length == 0 ? (
                <div className='flex justify-center mt-7 flex-col items-center'>
                    <Image
                        src={img_create_email}
                        alt="email"
                        height={250}
                        width={250}
                    />
                    <Link href={'/dashboard/create'}>
                        <Button className="mt-7">
                            + Create New
                        </Button>
                    </Link>
                </div>
            ) :
                <div className="overflow-x-auto mt-8">
                    <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
                        <thead>
                            <tr class="border-b">
                                <th className="px-6 py-4 text-left text-gray-600 font-bold">E-Mail</th>
                                <th className="px-6 py-4 text-left text-gray-600 font-bold">Description</th>
                                <th className="px-6 py-4 text-left text-gray-600 font-bold">Creation Time</th>
                                <th className="px-6 py-4 text-left text-gray-600 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emailList?.map((item, index) => (
                                <tr className="border-b" key={index}>
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <Image
                                            src={'/file.svg'}
                                            alt="email"
                                            width={48}
                                            height={48}
                                            className=' object-contain w-12 h-12 rounded-md'
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {moment(item?._creationTime).format('LLLL')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/editor/${item.tid}`}>
                                            <Button className="cursor-pointer w-full bg-purple-500 hover:bg-purple-700">
                                                View/Edit
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }


        </div>
    )
}

export default EmailTemplateList
