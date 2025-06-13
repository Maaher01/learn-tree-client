import { Formik, Form } from 'formik'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { postCommentSchema } from '../../../../../../../schema'
import { useState } from 'react'
import { api } from '../../../../../../../api/api'
import { CButton } from '@coreui/react'

const EditCommentForm = ({ comment, setShowEditCommentForm, refreshComments, onClose }) => {
  const [error, setError] = useState('')

  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link']],
  }

  const editComment = async (values, comment_id) => {
    try {
      const payLoad = {
        comment_text: values.comment_text,
      }

      await api.put(`/post-comment/edit-comment/${comment_id}`, payLoad)
      await refreshComments()
      await onClose()
    } catch (error) {
      console.error('Error editing comment', error)
      setError(error)
    }
  }

  return (
    <div className="my-4">
      <Formik
        initialValues={{ comment_text: comment.comment_text }}
        onSubmit={(values) => editComment(values, comment?.comment_id)}
        validationSchema={postCommentSchema}
        validateOnMount={true}
      >
        {({ values, setFieldValue, isValid, dirty }) => (
          <Form className="d-flex flex-column align-items-center gap-2">
            <ReactQuill
              theme="snow"
              modules={modules}
              value={values.comment_text}
              style={{ backgroundColor: 'white', width: '100%' }}
              onChange={(value) => setFieldValue('comment_text', value)}
            />
            <div className="d-flex gap-2 justify-content-start mt-4 w-100">
              <CButton
                variant="ghost"
                className="fw-medium"
                style={{ color: '#4B49B6' }}
                onClick={() => setShowEditCommentForm(false)}
              >
                Cancel
              </CButton>
              <CButton color="primary" type="submit" disabled={!isValid || !dirty}>
                Post
              </CButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditCommentForm
