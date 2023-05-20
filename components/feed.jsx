"use client";

import PromptCard from '@components/promptcard'
import {useState,useEffect} from 'react'

function PromptCardList({data,handleTagClick}) {
  return (
    <div className='mt-16 prompt_layout'>
     {
      data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))
     }
    </div>
  )
}

export default function Feed() {
  const [searchtext, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/prompt`)
      const data = await res.json()
      setPosts(data);
      console.log(data)
    }
    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='What are you thinking?'
          value={searchtext}
          onChange={handleSearchTextChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
      data = {posts}
      handleTagClick = {() => {}}
      />
    </section>
  )
}
