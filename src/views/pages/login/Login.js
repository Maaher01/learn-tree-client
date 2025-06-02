import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilEnvelopeClosed } from '@coreui/icons'
import { Form, Formik } from 'formik'
import { loginFormSchema } from '../../../schema'
import { api } from '../../../api/api'
import AuthContext from '../../../context/AuthContext'
import { useContext, useState } from 'react'
import CustomInput from '../../../components/CustomInput/CustomInput'

const Login = () => {
  const { checkAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const [error, setError] = useState('')

  const handleLogin = async (values) => {
    try {
      await api.post(`/auth/login`, values)
      await checkAuth()
      navigate('/')
    } catch (error) {
      console.error('Login Failed:', error)
      setError(error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginFormSchema}
                    onSubmit={handleLogin}
                  >
                    <Form>
                      <h1>Login</h1>
                      <p className="text-body-secondary">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <CustomInput type="email" placeholder="Email" name="email" />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CustomInput type="password" placeholder="Password" name="password" />
                      </CInputGroup>
                      {error && <CAlert color="danger">{error}</CAlert>}
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" type="submit">
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </Form>
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src="src/assets/brand/learn-tree-favicon.png" width={100} height={75} />
                    <h2 className="mt-2">Sign up</h2>
                    <p>Don't have an account yet?</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
