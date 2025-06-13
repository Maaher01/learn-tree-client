import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { postSchema } from '../../schema'
import { CCard, CButton, CCardBody } from '@coreui/react'
import defaultAvatar from '../../assets/avatars/user.svg'
import AuthContext from '../../context/AuthContext'
import PostContext from '../../context/PostContext'
import { api } from '../../api/api'

const PostForm = () => {
  const [showPostForm, setShowPostForm] = useState(false)

  const { user } = useContext(AuthContext)
  const { getAllPostsByClassSubject } = useContext(PostContext)

  const { class_id, subject_id } = useParams()

  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link']],
  }

  const handleCreatePost = async (values) => {
    try {
      const payLoad = {
        post_text: values.post_text,
        user_id: user.user_id,
        class_id: class_id,
        subject_id: subject_id,
      }

      await api.post(`post/create-post`, payLoad)
      setShowPostForm(false)
      await getAllPostsByClassSubject(class_id, subject_id)
    } catch (error) {
      console.error('Error creating post', error)
      setError(error)
    }
  }

  return (
    <>
      {!showPostForm ? (
        <CCard className=" px-3" style={{ cursor: 'pointer' }}>
          <CButton
            className="d-flex flex-row align-items-center"
            onClick={() => setShowPostForm(true)}
          >
            {user.image ? (
              <img
                src={user.image}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
            ) : (
              <img
                src={defaultAvatar}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
            )}
            <CCardBody className="text-secondary fw-semibold text-start">
              Anounce Something to your class
            </CCardBody>
          </CButton>
        </CCard>
      ) : (
        <CCard className="p-4 d-flex flex-column gap-5">
          <Formik
            initialValues={{ post_text: '' }}
            onSubmit={handleCreatePost}
            validationSchema={postSchema}
            validateOnMount={true}
          >
            {({ values, setFieldValue, isValid, dirty }) => (
              <Form>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  value={values.post_text}
                  style={{ backgroundColor: 'white', height: '175px' }}
                  onChange={(value) => setFieldValue('post_text', value)}
                />
                <div
                  className="buttons d-flex gap-4 justify-content-end"
                  style={{ marginTop: '70px' }}
                >
                  <CButton
                    variant="ghost"
                    className="fw-medium"
                    style={{ color: '#4B49B6' }}
                    onClick={() => setShowPostForm(false)}
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
        </CCard>
      )}
    </>
  )
}

export default PostForm
