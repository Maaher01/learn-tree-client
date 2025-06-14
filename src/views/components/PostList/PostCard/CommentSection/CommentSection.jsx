import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import CommentItem from './CommentItem/CommentItem'
import NewCommentForm from './NewCommentForm/NewCommentForm'
import { useState } from 'react'

const CommentSection = ({ post, comments, refreshComments }) => {
  const [showAllComments, setShowAllComments] = useState(false)

  const handleToggleComments = () => setShowAllComments((prev) => !prev)

  const visibleComments = showAllComments ? comments : comments?.slice(0, 1)

  return (
    <div className="cmnt-section">
      <div className="cmnt-main">
        {comments?.length > 1 && (
          <CButton
            className="d-flex align-items-center gap-2 p-0 fw-medium text-primary my-3"
            onClick={handleToggleComments}
            style={{ fontSize: '14.5px' }}
          >
            <CIcon icon={cilPeople} />
            <p className="mb-0">{comments.length} class comments</p>
          </CButton>
        )}
        {comments?.length === 1 && (
          <div
            className="d-flex align-items-center gap-2 p-0 fw-medium text-secondary my-3"
            style={{ fontSize: '14.5px' }}
          >
            <CIcon icon={cilPeople} />
            <p className="mb-0">{comments.length} class comment</p>
          </div>
        )}
        {visibleComments?.map((comment) => (
          <CommentItem
            comment={comment}
            key={comment.comment_id}
            refreshComments={refreshComments}
          />
        ))}
      </div>
      <NewCommentForm post={post} refreshComments={refreshComments} />
    </div>
  )
}

export default CommentSection
