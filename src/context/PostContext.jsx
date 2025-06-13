import { createContext, useState } from 'react'
import { api } from '../api/api'

const PostContext = createContext({})

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  const getAllPostsByClassSubject = async (class_id, subject_id) => {
    try {
      const response = await api.get(`post/posts/${class_id}/${subject_id}`)
      const postsData = response.data.data
      setPosts(postsData)
    } catch (error) {
      console.error('Error fetching posts', error)
      setError(error)
    }
  }

  const getCommentsByPost = async (post_id) => {
    try {
      const response = await api.get(`post-comment/get-comments-by-post?postId=${post_id}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching post comments', error)
      setError(error)
    }
  }

  return (
    <PostContext.Provider value={{ getAllPostsByClassSubject, posts, getCommentsByPost }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContext
