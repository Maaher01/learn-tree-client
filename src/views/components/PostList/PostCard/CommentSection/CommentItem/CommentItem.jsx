import { format, parseISO } from 'date-fns'
import AuthContext from '../../../../../../context/AuthContext'
import { useContext, useState } from 'react'
import defaultAvatar from '../../../../../../assets/avatars/user.svg'
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import DeleteCommentModal from './DeleteCommentModal/DeleteCommentModal'
import EditCommentForm from './EditCommentForm/EditCommentForm'

const CommentItem = ({ comment, refreshComments }) => {
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)
  const [showEditCommentForm, setShowEditCommentForm] = useState(false)
  const [selectedComment, setSelectedComment] = useState(null)

  const { user } = useContext(AuthContext)

  const currentDate = new Date()

  return (
    <>
      <div className="d-flex gap-3">
        <div className="cmnt-avatar">
          {comment.image !== null ? (
            <img
              src={comment.imageUrl}
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            />
          ) : (
            <img
              src={defaultAvatar}
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            />
          )}
        </div>
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex flex-column w-100">
            <div className="d-flex gap-2 align-items-center mb-1">
              <p className="fs-6 text-tertiary mb-0 fw-medium">{comment.fullname}</p>
              {(currentDate - parseISO(comment.created_at)) / (1000 * 60 * 60) >= 48 ? (
                <p className="text-secondary m-0 fw-medium" style={{ fontSize: '13.5px' }}>
                  {format(comment.created_at, 'MMM d, y ')}
                </p>
              ) : (currentDate - parseISO(comment.created_at)) / (1000 * 60 * 60) >= 24 ? (
                <p className="text-secondary m-0 fw-medium" style={{ fontSize: '13.5px' }}>
                  Yesterday
                </p>
              ) : (
                <p className="text-secondary m-0 fw-medium" style={{ fontSize: '13.5px' }}>
                  {format(comment.created_at, 'h:mm a')}
                </p>
              )}
            </div>
            {showEditCommentForm ? (
              <>
                <EditCommentForm
                  comment={comment}
                  setShowEditCommentForm={setShowEditCommentForm}
                  refreshComments={refreshComments}
                  onClose={() => {
                    setSelectedComment(null), setShowEditCommentForm(false)
                  }}
                />
                <hr className="mt-0" />
              </>
            ) : (
              <div
                style={{ fontSize: '13px' }}
                dangerouslySetInnerHTML={{
                  __html: comment.comment_text,
                }}
              />
            )}
          </div>
          {showEditCommentForm ? (
            <p></p>
          ) : (
            <div className="dropdown">
              {comment.user_id === user.id ? (
                <CDropdown alignment="start">
                  <CDropdownToggle
                    variant="outline"
                    color="dark"
                    caret={false}
                    className="p-0 border-0 "
                    style={{
                      zIndex: 10,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <CIcon icon={cilOptions} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedComment(comment), setShowEditCommentForm(true)
                      }}
                    >
                      Edit
                    </CDropdownItem>
                    <CDropdownItem
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedComment(comment), setShowDeleteCommentModal(true)
                      }}
                    >
                      Delete
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              ) : (
                <p></p>
              )}
            </div>
          )}
        </div>
      </div>
      <DeleteCommentModal
        visible={showDeleteCommentModal}
        comment={selectedComment}
        refreshComments={refreshComments}
        onClose={() => {
          setSelectedComment(null), setShowDeleteCommentModal(false)
        }}
      />
    </>
  )
}

export default CommentItem
