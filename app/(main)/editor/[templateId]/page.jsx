"use client"

import { useEmailTemplate, useUserDetail } from '@/app/provider'
import Canvas from '@/components/custom/Canvas'
import EditorHeader from '@/components/custom/EditorHeader'
import ElementsSideBar from '@/components/custom/ElementsSideBar'
import Settings from '@/components/custom/Settings'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {

    const [viewHTMLCode, setViewHTMLCode] = useState()
    const {templateId} = useParams()
    const {userDetail, setUserDetail} = useUserDetail()
    const [loading, setLoading] = useState(false)
    const {emailTemplate, setEmailTemplate} = useEmailTemplate()


    const convex = useConvex();

    const GetTemplateData = async () => {
        setLoading(true)
        const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
            tid: templateId,
            email: userDetail?.email
        })
        setEmailTemplate(result?.design)
        setLoading(false)
    }

    useEffect(() => {
        if(userDetail){
            GetTemplateData()
        }
    }, [userDetail])


    return (
        <div>
            <EditorHeader
                viewHTMLCode={(v) => setViewHTMLCode(v)}
            />

            {!loading ? (
                <div className='grid grid-cols-5'>
                <ElementsSideBar />
                <div className='col-span-3 bg-gray-100'>
                    <Canvas
                        viewHTMLCode={viewHTMLCode}
                        closeDialog={() => setViewHTMLCode(false)}
                    />
                </div>
                <Settings />
            </div>
            ) : (
                <div class="bg-gray-200 w-full min-h-screen flex justify-center items-center">
                    <div class="flex flex-col min-h-screen w-full items-center justify-center bg-gray-200">
                        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
                            <div class="h-9 w-9 rounded-full bg-gray-200"></div>
                        </div>
                            <p className='font-bold mt-1'>
                                Please wait...
                            </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default page
