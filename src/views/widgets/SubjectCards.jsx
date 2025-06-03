import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CCard,
  CCardImage,
  CCardTitle,
  CCardImageOverlay,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../api/api'
import { Link } from 'react-router-dom'
import SubjectContext from '../../context/SubjectContext'

const SubjectCards = (props) => {
  const [error, setError] = useState('')
  const [selectedSubject, setSelectedSubject] = useState(null)

  const { getAllUserSubjects, subjects } = useContext(SubjectContext)

  useEffect(() => {
    getAllUserSubjects()
  }, [])

  const deleteEnrollemnt = async (subject_id) => {
    try {
      await api.delete(`/subject-enrollment/delete-subject-enrollment`, { data: { subject_id } })
      setSelectedSubject(null)
      getAllUserSubjects()
    } catch (error) {
      console.error('Error deleting enrollment', error)
      setError(error)
    }
  }

  const images = [
    'src/assets/images/Honors.jpg',
    'src/assets/images/img_bookclub.jpg',
    'src/assets/images/Writing.jpg',
  ]

  return (
    <>
      <CRow className={props.className} xs={{ gutter: 4 }}>
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <CCol sm={6} xl={4} xxl={3} key={index}>
              <CCard style={{ height: '239px', cursor: 'pointer' }}>
                <Link to={`/class/details/${subject.class_id}/${subject.subject_id}`}>
                  <CCardImage orientation="top" src={images[index % images.length]} height={100} />
                  <CCardImageOverlay className="text-white">
                    <div className="d-flex justify-content-between">
                      <CCardTitle className="fs-4 mb-0">
                        {(subject.subject_name + ' ' + subject.class_name).length >= 17
                          ? (subject.subject_name + ' ' + subject.class_name).slice(0, 17) + '...'
                          : subject.subject_name + ' ' + subject.class_name}
                      </CCardTitle>
                    </div>
                  </CCardImageOverlay>
                </Link>
                <CDropdown alignment="start" className="position-absolute top-0 end-0 m-3">
                  <CDropdownToggle
                    variant="ghost"
                    caret={false}
                    className="p-0 bg-transparent border-0"
                    style={{
                      zIndex: 10,
                    }}
                  >
                    <CIcon icon={cilOptions} className="text-white" />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => setSelectedSubject(subject)}>
                      Unenroll
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCard>
            </CCol>
          ))
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: '55vh' }}
          >
            <img src="src/assets/images/empty_states_home.svg" />
            <p className="mt-4 mb-2 fw-bolder text-secondary">No classes to show</p>
            <CButton color="primary" className="text-light fw-bolder">
              Join Class
            </CButton>
          </div>
        )}
      </CRow>
      <CModal
        alignment="center"
        scrollable
        visible={!!selectedSubject}
        onClose={() => setSelectedSubject(null)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">
            Unenroll from {selectedSubject?.subject_name} {selectedSubject?.class_name}?
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>You will be removed from this class.</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setSelectedSubject(null)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => deleteEnrollemnt(selectedSubject?.subject_id)}>
            Unenroll
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

SubjectCards.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default SubjectCards
