import { useState, useContext } from 'react'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react'
import { api } from '../../../../api/api'
import PostContext from '../../../../context/PostContext'

const DeletePostModal = ({ visible, post, onClose, class_id, subject_id }) => {
  const [error, setError] = useState('')

  const { getAllPostsByClassSubject } = useContext(PostContext)

  const deletePost = async (post_id) => {
    try {
      await api.delete(`/post/delete-post`, { data: { post_id } })
      await getAllPostsByClassSubject(class_id, subject_id)
      onClose()
    } catch (error) {
      console.error('Error deleting enrollment', error)
      setError(error)
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredScrollableExample2"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredScrollableExample2">Delete announcement?</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Comments will also be deleted.</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={() => deletePost(post?.post_id)}>
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeletePostModal
