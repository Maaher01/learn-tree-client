import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import {
  CCardImage,
  CCard,
  CCardImageOverlay,
  CCardTitle,
  CCardText,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'

const SubjectDetails = () => {
  const [className, setClassName] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [error, setError] = useState('')
  const [people, setPeople] = useState([])

  const { subject_id } = useParams()

  useEffect(() => {
    getSubjectDetails()
    getAllEnrolledPeople()
  }, [subject_id])

  const getSubjectDetails = async () => {
    try {
      const response = await api.get(`/subject/get-subject-details/${subject_id}`)
      setClassName(response.data.data.class_name)
      setSubjectName(response.data.data.subject_name)
    } catch (error) {
      console.error('Error fetching subject details', error)
      setError(error)
    }
  }

  const getAllEnrolledPeople = async () => {
    try {
      const response = await api.get(`subject-enrollment/get-all-students/${subject_id}`)
      setPeople(response.data.data)
    } catch (error) {
      console.error('Error fetching people', error)
      setError(error)
    }
  }

  return (
    <>
      <CTabs defaultActiveItemKey={1}>
        <CTabList variant="underline-border">
          <CTab aria-controls="stream-tab-pane" itemKey={1}>
            Stream
          </CTab>
          <CTab aria-controls="people-tab-pane" itemKey={2}>
            People
          </CTab>
        </CTabList>

        <CTabContent>
          <CTabPanel className="p-3" aria-labelledby="stream-tab-pane" itemKey={1}>
            <CCard className="mb-3 bg-dark text-white">
              <CCardImage src={'src/assets/images/img_bookclub.jpg'} height={240} />
              <CCardImageOverlay className="d-flex flex-column justify-content-end align-items-start">
                <CCardTitle className="fs-1">{subjectName + ' ' + className}</CCardTitle>
                <CCardText></CCardText>
              </CCardImageOverlay>
            </CCard>
          </CTabPanel>
          <CTabPanel className="p-3" aria-labelledby="people-tab-pane" itemKey={2}>
            <CListGroup>
              <CListGroupItem>Cras justo odio</CListGroupItem>
            </CListGroup>
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default SubjectDetails
