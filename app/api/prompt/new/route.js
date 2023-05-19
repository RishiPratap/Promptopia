import {connectToDatabase} from "@utils/database";
import Prompt from "@models/prompt";

export const POST  = async (req, res) => {
    const { prompt, userId, tag } = await req.json();

    try{
        await connectToDatabase();
        const newPrompt = await Prompt.create({
            creator:userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{
            status:201,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }catch(err){
        console.log(err)
        return new Response(JSON.stringify(err),{
            status:500,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
}