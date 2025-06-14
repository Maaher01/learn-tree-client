import { Formik, Form } from 'formik'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { postCommentSchema } from '../../../../../../schema'
import { useState, useContext, useRef, useEffect } from 'react'
import { api } from '../../../../../../api/api'
import AuthContext from '../../../../../../context/AuthContext'
import { CButton } from '@coreui/react'
import { cilArrowThickRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import defaultAvatar from '../../../../../../assets/avatars/user.svg'

const NewCommentForm = ({ post, refreshComments }) => {
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [error, setError] = useState('')

  const { user } = useContext(AuthContext)

  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link']],
  }

  const formRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowCommentForm(false)
      }
    }

    if (showCommentForm) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCommentForm])

  const handleCreateComment = async (values, { resetForm }) => {
    try {
      const payLoad = {
        comment_text: values.comment_text,
        post_id: values.post_id,
        user_id: user.user_id,
      }

      await api.post(`post-comment/create-comment`, payLoad)

      await refreshComments()
      resetForm()
    } catch (err) {
      console.error('Error creating comment', err)
      setError(err)
    }
  }

  return (
    <div className="d-flex gap-3 w-100 mt-3">
      {user.image ? (
        <img src={user.image} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
      ) : (
        <img src={defaultAvatar} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
      )}
      <Formik
        initialValues={{ comment_text: '', post_id: post.post_id }}
        onSubmit={handleCreateComment}
        validationSchema={postCommentSchema}
        validateOnMount={true}
      >
        {({ values, setFieldValue, isValid, dirty }) => (
          <Form className="d-flex w-100 align-items-center gap-2" ref={formRef}>
            {showCommentForm ? (
              <div className="flex-grow-1 mb-2">
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  value={values.comment_text}
                  style={{ backgroundColor: 'white' }}
                  onChange={(value) => setFieldValue('comment_text', value)}
                />
              </div>
            ) : (
              <p
                className="flex-grow-1 border rounded-pill text-secondary fw-medium text-start py-2 px-3 mb-1"
                onClick={() => setShowCommentForm(true)}
              >
                Add class comment...
              </p>
            )}
            <CButton
              className="p-0"
              type="submit"
              style={{ border: '1px solid transparent' }}
              disabled={!isValid || !dirty}
            >
              <CIcon icon={cilArrowThickRight} size="xl" />
            </CButton>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewCommentForm
