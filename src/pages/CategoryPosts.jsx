import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import PostItem from '../components/PostItem'
import { UserContext } from '../context/userContext'
import { DUMMY_POSTS } from '../data'

const CategoryPosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false) 

  const {category} = useParams() 

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`) 
        setPosts(response?.data)
      }catch(err){
        console.log(err)
      }

      setIsLoading(false)
    }

    fetchPosts();

  }, [category]) 
  
  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="posts">
        {posts.length > 0 ? <div className="container posts__container">
        {
            posts.map(({_id: id, thumbnail, category, description, creator, title, createdAt}) => <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} description={description} authorID={creator} title={title} createdAt={createdAt}/> )
        }
        </div> : <h2 className='center'>No posts found.</h2>}  
    </section>
  )
}

export default CategoryPosts