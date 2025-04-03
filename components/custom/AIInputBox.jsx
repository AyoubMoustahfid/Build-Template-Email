"use client"
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import Prompt from '@/Data/Prompt'
import axios from 'axios'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import {v4 as uuidv4} from "uuid"
import {  useUserDetail } from '@/app/provider'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

function AIInputBox() {

    const [userInput, setUserInput] = useState()
    const [loading, setLoading] = useState(false)
    const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate)
    const {userDetail, setUserDetail} = useUserDetail()
    
    const router = useRouter()

    const OnGenerate = async () => {
        const PROMPT = Prompt.EMAIL_PROMPT + "\n" + userInput
        const tid = uuidv4()
        setLoading(true)

        try{
            const result = await axios.post('/api/ai-email-generate', {
                prompt: PROMPT,
            })
            const resp = await SaveTemplate({
                tid: tid,
                design: result.data,
                email: userDetail?.email,
                description: userInput
            })
            router.push(`/editor/${tid}`)
            setLoading(false)
        }catch(err){
            console.error(err)
            setLoading(false)
        }
    }

    return (
        <div className='mt-5'>
            <p className='mb-2'>
                Provide details about the email template you'd like to create
            </p>
            <Textarea
                placeholder="Start writing here..."
                rows="10"
                className="text-xl"
                onChange={e => setUserInput(e.target.value)}
            />
            <Button
                onClick={OnGenerate}
                disabled={(userInput?.length == 0 || loading)}
                className="w-full mt-7 bg-purple-600 hover:bg-purple-700"
            >
                {loading ? <span className='flex gap-1'> <Loader2 className='animate-spin'/> Please wait...</span> : 'GENERATE'}
                
            </Button>
        </div>
    )
}

export default AIInputBox
