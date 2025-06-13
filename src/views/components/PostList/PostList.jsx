import { useState, useEffect, useContext } from 'react'
import { CCard, CRow, CCol, CCardImage, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import PostContext from '../../../context/PostContext'
import { useParams } from 'react-router-dom'
import DeletePostModal from '../PostList/DeletePostModal/DeletePostModal'
import EditPostModal from '../PostList/EditPostModal/EditPostModal'
import PostCard from '../PostList/PostCard/PostCard'

const PostList = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [commentsByPost, setCommentsByPost] = useState({})

  const { getAllPostsByClassSubject, posts, getCommentsByPost } = useContext(PostContext)

  const { class_id, subject_id } = useParams()

  useEffect(() => {
    getAllPostsByClassSubject(class_id, subject_id)
  }, [class_id, subject_id])

  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = {}
      for (const post of posts) {
        const comments = await getCommentsByPost(post.post_id)
        commentsData[post.post_id] = comments
      }
      setCommentsByPost(commentsData)
    }

    if (posts.length > 0) {
      fetchComments()
    }
  }, [posts])

  return (
    <>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <PostCard
              post={post}
              key={post.post_id}
              comments={commentsByPost[post.post_id] || []}
              refreshComments={async () => {
                const updated = await getCommentsByPost(post.post_id)
                setCommentsByPost((prev) => ({ ...prev, [post.post_id]: updated }))
              }}
              setSelectedPost={setSelectedPost}
              setShowEditModal={setShowEditModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          ))}
          <DeletePostModal
            visible={showDeleteModal}
            post={selectedPost}
            class_id={class_id}
            subject_id={subject_id}
            onClose={() => {
              setSelectedPost(null), setShowDeleteModal(false)
            }}
          />
          <EditPostModal
            visible={showEditModal}
            post={selectedPost}
            class_id={class_id}
            subject_id={subject_id}
            onClose={() => {
              setSelectedPost(null), setShowEditModal(false)
            }}
          />
        </>
      ) : (
        <CCard className="mb-3 p-5">
          <CRow className="g-4">
            <CCol md={2}>
              <CCardImage src={'src/assets/images/no_posts.svg'} />
            </CCol>
            <CCol md={10}>
              <CCardBody>
                <CCardTitle className="fs-4 fw-normal">
                  This is where you can talk to your class
                </CCardTitle>
                <CCardText className="fw-medium text-secondary">
                  Use the stream to view/share announcements, post/attempt assignments, and respond
                  to questions
                </CCardText>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      )}
    </>
  )
}

export default PostList
