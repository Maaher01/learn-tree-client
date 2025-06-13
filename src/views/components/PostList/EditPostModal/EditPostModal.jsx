import { useState, useContext } from 'react'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react'
import { api } from '../../../../api/api'
import PostContext from '../../../../context/PostContext'
import { Form, Formik } from 'formik'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { postSchema } from '../../../../schema'

const EditPostModal = ({ visible, post, onClose, class_id, subject_id }) => {
  const [error, setError] = useState('')

  const { getAllPostsByClassSubject } = useContext(PostContext)

  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link']],
  }

  const editPost = async (values, post_id) => {
    try {
      const payLoad = {
        post_text: values.post_text,
      }

      await api.put(`/post/edit-post/${post_id}`, payLoad)
      await getAllPostsByClassSubject(class_id, subject_id)
      await onClose()
    } catch (error) {
      console.error('Error editing enrollment', error)
      setError(error)
    }
  }

  return (
    <CModal
      size="lg"
      scrollable
      alignment="center"
      visible={visible}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredScrollableExample2"
    >
      <Formik
        initialValues={{ post_text: post?.post_text }}
        validationSchema={postSchema}
        validateOnMount={true}
        onSubmit={(values) => editPost(values, post?.post_id)}
      >
        {({ values, setFieldValue, isValid, dirty }) => (
          <Form>
            <CModalHeader>
              <CModalTitle id="VerticallyCenteredScrollableExample2">Edit Post</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={values.post_text}
                style={{ backgroundColor: 'white', height: '150px' }}
                onChange={(value) => setFieldValue('post_text', value)}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={onClose}>
                Cancel
              </CButton>
              <CButton
                color="primary"
                type="submit"
                disabled={!isValid || !dirty}
                onClick={() => editPost(post?.post_id)}
              >
                Save
              </CButton>
            </CModalFooter>
          </Form>
        )}
      </Formik>
    </CModal>
  )
}

export default EditPostModal
