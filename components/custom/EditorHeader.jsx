"use client"

import { img_logo } from '@/assets/constants/image'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Code, Monitor, Smartphone } from 'lucide-react'
import { useEmailTemplate, useScreenSize } from '@/app/provider'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

function EditorHeader({viewHTMLCode}) {
    const {screenSize, setScreenSize} = useScreenSize()
    const updateEmailTemplate = useMutation(api.emailTemplate.UpdateTemplateDesign)
    const {templateId} = useParams()
    const {emailTemplate, setEamailTemplate} = useEmailTemplate()

    const onSaveTemplate = async () => {
        await updateEmailTemplate({
            tid: templateId,
            design: emailTemplate
        })

        toast('Email Template Saved Success')
    }

    return (
        <div className='p-4 shadow-sm flex justify-between'>
            <Link
                href={'/dashboard/create'}
            >
                <Image
                    src={img_logo}
                    alt="logo"
                    width={160}
                    height={150}
                />
            </Link>
            <div className='flex gap-3'>
                <Button
                    onClick={() => setScreenSize('desktop')} 
                    className={`${screenSize == 'desktop' && 'bg-purple-100 text-indigo-500'}`}
                    variant="ghost">
                    <Monitor/>
                    Desktop
                </Button>
                <Button
                    onClick={() => setScreenSize('mobile')} 
                    className={`${screenSize == 'mobile' && 'bg-purple-100 text-indigo-500'}`}
                    variant="ghost">
                    <Smartphone/>
                    Mobile
                </Button>
            </div>
            <div className='flex gap-3'>
                <Button 
                    variant="ghost" 
                    className="hover:text-indigo-500 "
                    onClick={() => viewHTMLCode(true)}
                >
                    <Code/>
                </Button>
                <Button variant="outline">
                    Send Test Email
                </Button>
                <Button
                    className="cursor-pointer"
                    onClick={onSaveTemplate}
                >
                    Save Template
                </Button>
            </div>
        </div>
    )
}

export default EditorHeader
