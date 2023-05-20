import {connectToDatabase} from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (request,{params}) => {
    try{
        await connectToDatabase();
        const prompts = await Prompt.findById(params.id).populate(
            'creator',
        );
        if(!prompt) return new Response("Prompt not found",{
            status:404,
            headers:{
                'Content-Type':'application/json'
            }
        })
        return new Response(JSON.stringify(prompts),{
            status:200,
            headers:{
                'Content-Type':'application/json'
            }
        })
      
    }catch(err){
        return new Response("Failed to fetch all prompts",JSON.stringify(err),{
            status:500,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
}

// PATCH

export const PATCH = async (request,{params}) => {
    const {prompt,tag} = await request.json();

    try{
        await  connectToDatabase();
        const exsistingPrompt = await Prompt.findById(params.id);

        if(!exsistingPrompt) return new Response("Prompt not found",{
            status:404
        })
        exsistingPrompt.prompt = prompt;
        exsistingPrompt.tag = tag;

        await exsistingPrompt.save();

        return new Response(JSON.stringify(exsistingPrompt),{
            status:200,
        })
    }catch(err){
        return new Response("Failed to update prompt",JSON.stringify(err),{
            status:500,
        })
    }
}

// DELETE

export const DELETE = async (request,{params}) => {
    try{
        await connectToDatabase();
        const prompt = await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfuly",{
            status:200,
        })
    }catch(err){
        return new Response("Failed to delete prompt",JSON.stringify(err),{
            status:500,
        })
    }
}