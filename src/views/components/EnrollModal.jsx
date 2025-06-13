import { Form, Formik, Field } from 'formik'
import {
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
import SubjectContext from '../../context/SubjectContext'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/api'

const EnrollModal = ({ visible, onClose }) => {
  const [error, setError] = useState('')
  const [classes, setClasses] = useState([])
  const [classSelected, setClassSelected] = useState(false)
  const [classId, setClassId] = useState()
  const [subjects, setSubjects] = useState([])

  const navigate = useNavigate()

  const { getAllUserSubjects } = useContext(SubjectContext)

  useEffect(() => {
    getAllClasses()
  }, [])

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

  return (
    <Formik
      initialValues={{
        subject_id: '',
      }}
      onSubmit={handleCreateEnrollment}
    >
      <CModal alignment="center" visible={visible} onClose={onClose}>
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
            <CButton color="secondary" onClick={onClose}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit" onClick={onClose}>
              Join
            </CButton>
          </CModalFooter>
        </Form>
      </CModal>
    </Formik>
  )
}

export default EnrollModal
