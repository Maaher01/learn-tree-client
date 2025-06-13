import { useState, useContext } from 'react'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react'
import { api } from '../../../../api/api'
import SubjectContext from '../../../../context/SubjectContext'

const UnenrollModal = ({ visible, onClose, subject }) => {
  const [error, setError] = useState('')

  const { getAllUserSubjects } = useContext(SubjectContext)

  const deleteEnrollment = async (subject_id) => {
    try {
      await api.delete(`/subject-enrollment/delete-subject-enrollment`, { data: { subject_id } })
      await getAllUserSubjects()
      onClose()
    } catch (error) {
      console.error('Error deleting enrollment', error)
      setError(error)
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredScrollableExample2"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredScrollableExample2">
          Unenroll from {subject?.subject_name} {subject?.class_name}?
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>You will be removed from this class.</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={() => deleteEnrollment(subject?.subject_id)}>
          Unenroll
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UnenrollModal
