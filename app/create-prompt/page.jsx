"use client"

import {useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form  from '@components/form'

export default function Prompt() {
    const {data:session} = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    });

    const createPrompt = async (e) => {
       e.preventDefault();
       setSubmitting(true);

       try{
        const resposnse = await fetch('/api/prompt/new',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                prompt:post.prompt,
                userId:session?.user.id,
                tag:post.tag
            })
            })
            if(resposnse.ok){
                router.push('/')
            }
       }catch(err){
           console.log(err)
       }
       finally{
        setSubmitting(false);
       }
    }
   
  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}
