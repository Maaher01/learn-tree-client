import defaultAvatar from '../../../../assets/avatars/user.svg'
import { useContext } from 'react'
import {
  CCard,
  CCardTitle,
  CCardText,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { format, parseISO } from 'date-fns'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import AuthContext from '../../../../context/AuthContext'
import CommentSection from './CommentSection/CommentSection'

const PostCard = ({
  post,
  setSelectedPost,
  setShowEditModal,
  setShowDeleteModal,
  comments,
  refreshComments,
}) => {
  const { user } = useContext(AuthContext)

  const currentDate = new Date()

  return (
    <CCard className="px-4 py-3">
      <CCardTitle className="d-flex align-items-center gap-3 mb-0">
        <div className="name-body mb-2 d-flex gap-3">
          {post.image !== null ? (
            <img
              src={post.imageUrl}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          ) : (
            <img
              src={defaultAvatar}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          )}
          <div className="d-flex flex-column gap-1">
            <p className="fs-6 text-tertiary mb-0">{post.fullname}</p>
            <div className="d-flex gap-1 text-secondary" style={{ fontSize: '13.5px' }}>
              {(currentDate - parseISO(post.created_at)) / (1000 * 60 * 60) >= 48 ? (
                <p className="mt-1" style={{ fontSize: '13.5px' }}>
                  {format(post.created_at, 'MMM d, y')}
                </p>
              ) : (currentDate - parseISO(post.created_at)) / (1000 * 60 * 60) >= 24 ? (
                <p className="m-0 fw-medium" style={{ fontSize: '13.5px' }}>
                  Yesterday
                </p>
              ) : (
                <p className="m-0 fw-medium" style={{ fontSize: '13.5px' }}>
                  {format(post.created_at, 'h:mm a')}
                </p>
              )}
              {post.created_at !== post.updated_at ? (
                <p className="m-0 fw-medium" style={{ fontSize: '13.5px' }}>
                  (Edited{' '}
                  {(currentDate - parseISO(post.updated_at)) / (1000 * 60 * 60) >= 48
                    ? format(post.updated_at, 'MMM d, y')
                    : (currentDate - parseISO(post.updated_at)) / (1000 * 60 * 60) >= 24
                      ? 'Yesterday'
                      : format(post.updated_at, 'h:mm a')}
                  )
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
        {post.user_id === user.id ? (
          <CDropdown alignment="start" className="position-absolute top-0 end-0 m-3">
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
                  setSelectedPost(post), setShowEditModal(true)
                }}
              >
                Edit
              </CDropdownItem>
              <CDropdownItem
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedPost(post), setShowDeleteModal(true)
                }}
              >
                Delete
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        ) : (
          <p></p>
        )}
      </CCardTitle>
      <CCardText
        className="mb-0"
        style={{ fontSize: '14px' }}
        dangerouslySetInnerHTML={{
          __html: post.post_text,
        }}
      />
      <hr className="m-0" />
      <CommentSection post={post} comments={comments} refreshComments={refreshComments} />
    </CCard>
  )
}

export default PostCard
