import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CTooltip,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CCard,
  CCardBody,
  CCardSubtitle,
  CFormSelect,
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilContrast, cilMenu, cilMoon, cilSun, cilPlus } from '@coreui/icons'
import { Form, Formik, Field } from 'formik'
import { api } from '../api/api'

import { AppHeaderDropdown } from './header/index'
import SubjectContext from '../context/SubjectContext'

const AppHeader = () => {
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [error, setError] = useState('')
  const [classes, setClasses] = useState([])
  const [classSelected, setClassSelected] = useState(false)
  const [classId, setClassId] = useState()
  const [subjects, setSubjects] = useState([])

  const { getAllUserSubjects } = useContext(SubjectContext)

  const location = useLocation()
  const navigate = useNavigate()

  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })

    getAllClasses()
  }, [])

  const showEnrollButton = location.pathname === '/dashboard'

  const getAllClasses = async () => {
    try {
      const response = await api.get(`class/get-all-classes`)
      setClasses(response.data.data)
    } catch (error) {
      console.error('Error fetching classes', error)
      setError(error)
    }
  }

  const handleChangeClass = async (event) => {
    try {
      setClassId(event.target.value)
      setClassSelected(!!event.target.value)

      const response = await api.get(`subject/get-subjects-by-class/${event.target.value}`)
      setSubjects(response.data.data)
    } catch (error) {
      console.error('Error fetching subjects', error)
      setError(error)
    }
  }

  const handleCreateEnrollment = async (values) => {
    try {
      await api.post(`subject-enrollment/create-subject-enrollment`, values)
      getAllUserSubjects()
      navigate('/')
    } catch (error) {
      console.error('Error enrolling', error)
      setError(error)
    }
  }

  return (
    <>
      <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
        <CContainer className="border-bottom px-4" fluid>
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          {showEnrollButton && (
            <CHeaderNav className="ms-auto" style={{ cursor: 'pointer' }}>
              <CNavItem>
                <CNavLink onClick={() => setShowEnrollModal(true)}>
                  <CTooltip content="Join Class" placement="bottom">
                    <CIcon icon={cilPlus} size="xl" style={{ color: 'black' }} />
                  </CTooltip>
                </CNavLink>
              </CNavItem>
            </CHeaderNav>
          )}

          <CHeaderNav>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <CDropdown variant="nav-item" placement="bottom-end">
              <CDropdownToggle caret={false}>
                {colorMode === 'dark' ? (
                  <CIcon icon={cilMoon} size="lg" />
                ) : colorMode === 'auto' ? (
                  <CIcon icon={cilContrast} size="lg" />
                ) : (
                  <CIcon icon={cilSun} size="lg" />
                )}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  active={colorMode === 'light'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('light')}
                >
                  <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                </CDropdownItem>
                <CDropdownItem
                  active={colorMode === 'dark'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('dark')}
                >
                  <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                </CDropdownItem>
                <CDropdownItem
                  active={colorMode === 'auto'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('auto')}
                >
                  <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
      </CHeader>
      <Formik
        initialValues={{
          subject_id: '',
        }}
        onSubmit={handleCreateEnrollment}
      >
        <CModal
          alignment="center"
          visible={showEnrollModal}
          onClose={() => setShowEnrollModal(false)}
        >
          <Form>
            <CModalHeader>
              <CModalTitle>Join Class</CModalTitle>
            </CModalHeader>
            <CModalBody className="d-flex flex-column gap-3">
              <CCard>
                <CCardBody>
                  <CCardSubtitle>Choose Your Class</CCardSubtitle>
                  <CInputGroup className="mb-4 mt-3">
                    <Field as={CFormSelect} name="class" onChange={handleChangeClass}>
                      <option value="0">Select your class</option>
                      {classes.map((cls) => (
                        <option key={cls.class_id} value={cls.class_id}>
                          {cls.class_name}
                        </option>
                      ))}
                    </Field>
                  </CInputGroup>
                </CCardBody>
              </CCard>
              <CCard>
                <CCardBody>
                  <CCardSubtitle>Choose Your Subject</CCardSubtitle>
                  <CInputGroup className="mb-4 mt-3">
                    <Field as={CFormSelect} name="subject_id" disabled={!classSelected}>
                      <option value="0">Select your subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>
                          {sub.subject_name}
                        </option>
                      ))}
                    </Field>
                  </CInputGroup>
                </CCardBody>
              </CCard>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setShowEnrollModal(false)}>
                Cancel
              </CButton>
              <CButton color="primary" type="submit" onClick={() => setShowEnrollModal(false)}>
                Join
              </CButton>
            </CModalFooter>
          </Form>
        </CModal>
      </Formik>
    </>
  )
}

export default AppHeader
