import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilImage } from '@coreui/icons'
import { registerFormSchema } from '../../../schema'
import { Form, Formik, Field } from 'formik'
import CustomInput from '../../components/CustomInput/CustomInput'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../../../api/api'
import { useState } from 'react'

const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [previewImage, setPreviewImage] = useState(null)

  const handleRegister = async (values) => {
    try {
      const formData = new FormData()

      formData.append('fullname', values.fullname)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('role', values.role)

      if (values.image) {
        formData.append('file', values.image)
      }

      await api.post(`/auth/register`, formData)
      navigate('/login')
    } catch (error) {
      console.error('Registration Failed:', error)
      setError(error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Formik
                  initialValues={{
                    fullname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    image: null,
                    role: '',
                  }}
                  validationSchema={registerFormSchema}
                  onSubmit={handleRegister}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <h1>Register</h1>
                      <p className="text-body-secondary">Create your account</p>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CustomInput placeholder="Full Name" type="text" name="fullname" />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CustomInput placeholder="Email" type="email" name="email" />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CustomInput placeholder="Password" type="password" name="password" />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CustomInput
                          type="password"
                          placeholder="Repeat password"
                          name="confirmPassword"
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilImage} />
                        </CInputGroupText>
                        <CustomInput
                          type="file"
                          name="image"
                          onChange={(e) => {
                            const file = e.currentTarget.files[0]
                            setFieldValue('image', file)

                            if (file) {
                              setPreviewImage(URL.createObjectURL(file))
                            } else {
                              setPreviewImage(null)
                            }
                          }}
                        />
                      </CInputGroup>

                      {previewImage !== null ? (
                        <img
                          src={previewImage}
                          alt="Uploaded Image"
                          height="150"
                          className="py-4"
                        />
                      ) : (
                        <p></p>
                      )}

                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <Field as={CFormSelect} name="role">
                          <option>Select your role</option>
                          <option value="Student">Student</option>
                          <option value="Teacher">Teacher</option>
                        </Field>
                      </CInputGroup>

                      {error && <CAlert color="danger">{error}</CAlert>}
                      <div className="d-grid">
                        <CButton color="success" type="submit">
                          Create Account
                        </CButton>
                      </div>

                      <p className="text-body-secondary text-center mt-3">
                        Already have an account?{' '}
                        <span>
                          <Link to="/login" className="px-0">
                            Login
                          </Link>
                        </span>{' '}
                        Now
                      </p>
                    </Form>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
