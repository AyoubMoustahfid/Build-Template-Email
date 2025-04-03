
import { GenerateEmailTemplateAIModel } from "@/config/AiModal"
import {NextResponse} from "next/server"

export async function POST(req){
    const {prompt} = await req.json()

    try{
        const result = await GenerateEmailTemplateAIModel.sendMessage(prompt)
        const aiResp = result.response.text();
        return NextResponse.json(JSON.parse(aiResp))

     }catch(e){
        return NextResponse.json({error: "Failed to generate email template"}, {status: 500})
    }
}

