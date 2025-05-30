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
import { useEffect, useState } from 'react'
import { api } from '../../api/api'

const SubjectCards = (props) => {
  const [error, setError] = useState('')
  const [subjects, setSubjects] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getAllUserSubjects()
  }, [])

  const getAllUserSubjects = async () => {
    try {
      const response = await api.get(`/subject-enrollment/get-all-subjects`)
      setSubjects(response.data.data)
    } catch (error) {
      console.error('Error fetching user subjects', error)
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
                <CCardImage orientation="top" src={images[index % images.length]} height={100} />
                <CCardImageOverlay className="text-white">
                  <div className="d-flex justify-content-between">
                    <CCardTitle className="fs-4 mb-0">
                      {subject.subject_name + ' ' + subject.class_name}
                    </CCardTitle>
                    <CDropdown alignment="start">
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
                        <CDropdownItem onClick={() => setShowModal(!showModal)}>
                          Unenroll
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
                </CCardImageOverlay>
              </CCard>
            </CCol>
          ))
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: '55vh' }}
          >
            <img src="src/assets/images/empty_states_home.svg" />
            <p className="mt-4 fw-bolder text-secondary">No classes to show</p>
            <CButton color="info" className="text-light fw-bolder">
              Join Class
            </CButton>
          </div>
        )}
      </CRow>
      <CModal
        alignment="center"
        scrollable
        visible={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
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
