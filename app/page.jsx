import '@styles/globals.css'
import Feed from '@components/Feed'

export default function Page() {
  return (
   <section className='w-full flex-center flex-col'>
    <h1 className="head_next text-center">
        Discover AI prompts 
        <br className='max-md:hidden'/>
        <span className='orange_gradient text-center'>AI-Powered</span>
    </h1>
    <p className='desc text-center'>
        Promptopia is a free AI-powered tool that generates writing prompts for writers, bloggers, and creatives.
    </p>
    <Feed/>
   </section> 
  )
}
