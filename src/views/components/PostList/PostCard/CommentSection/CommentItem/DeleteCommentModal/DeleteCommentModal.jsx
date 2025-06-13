import { useState } from 'react'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react'
import { api } from '../../../../../../../api/api'

const DeleteCommentModal = ({ visible, comment, onClose, refreshComments }) => {
  const [error, setError] = useState('')

  const deleteComment = async (comment_id) => {
    try {
      await api.delete(`/post-comment/delete-comment`, { data: { comment_id } })
      await refreshComments()
      onClose()
    } catch (error) {
      console.error('Error deleting comment', error)
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
        <CModalTitle id="VerticallyCenteredScrollableExample2">Delete comment?</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Are you sure you want to delete this comment?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={() => deleteComment(comment?.comment_id)}>
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteCommentModal
