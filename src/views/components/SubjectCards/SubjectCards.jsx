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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SubjectContext from '../../../context/SubjectContext'
import EnrollModal from '../EnrollModal'
import UnenrollModal from '../SubjectCards/UnenrollModal/UnenrollModal'

const SubjectCards = (props) => {
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const { getAllUserSubjects, subjects } = useContext(SubjectContext)

  useEffect(() => {
    getAllUserSubjects()
  }, [])

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
            <CCol sm={6} xl={4} xxl={3} key={subject.subject_id}>
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
            <CButton
              color="primary"
              className="text-light fw-bolder"
              onClick={() => setShowEnrollModal(true)}
            >
              Join Class
            </CButton>
          </div>
        )}
      </CRow>
      <UnenrollModal
        visible={!!selectedSubject}
        subject={selectedSubject}
        onClose={() => setSelectedSubject(null)}
      />
      <EnrollModal visible={showEnrollModal} onClose={() => setShowEnrollModal(false)} />
    </>
  )
}

SubjectCards.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default SubjectCards
