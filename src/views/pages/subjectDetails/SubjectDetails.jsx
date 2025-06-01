import { useContext, useEffect, useState } from 'react'
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
  CButton,
} from '@coreui/react'
import AuthContext from '../../../context/AuthContext'

const SubjectDetails = () => {
  const [className, setClassName] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [error, setError] = useState('')
  const [people, setPeople] = useState([])

  const { user } = useContext(AuthContext)

  const { class_id, subject_id } = useParams()

  useEffect(() => {
    getSubjectDetails()
    getAllEnrolledPeople()
    getAllQuestionsByClassSubject()
  }, [class_id, subject_id])

  const getSubjectDetails = async () => {
    try {
      const response = await api.get(`/subject/get-subject-details/${class_id}/${subject_id}`)
      setClassName(response.data.data.class_name)
      setSubjectName(response.data.data.subject_name)
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching subject details', error)
      setError(error)
    }
  }

  const getAllEnrolledPeople = async () => {
    try {
      const response = await api.get(`subject-enrollment/${class_id}/${subject_id}`)
      setPeople(response.data.data)
    } catch (error) {
      console.error('Error fetching people', error)
      setError(error)
    }
  }

  const getAllQuestionsByClassSubject = async () => {
    try {
      const response = await api.get(
        `question/get-all-questions-by-class-subject/${class_id}/${subject_id}`,
      )
    } catch (error) {
      console.error('Error fetching questions', error)
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
          {user.role === 'Admin' ? (
            <CTab aria-controls="stream-tab-pane" itemKey={2}>
              Create Quiz
            </CTab>
          ) : null}

          <CTab aria-controls="people-tab-pane" itemKey={3}>
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
          <CTabPanel className="p-3" aria-labelledby="people-tab-pane" itemKey={3}>
            <CListGroup className="mt-2">
              <h1>Teachers</h1>
              {people
                .filter((peep) => peep.role === 'Admin')
                .map((peep, index) => (
                  <CListGroupItem key={index}>
                    <div className="d-flex justify-content-between gap-2 text-secondary fw-semibold">
                      <div>{peep.fullname}</div>
                      <div>Email: {peep.email}</div>
                    </div>
                  </CListGroupItem>
                ))}
            </CListGroup>
            <CListGroup className="mt-5">
              <h1>Students</h1>
              {people
                .filter((peep) => peep.role === 'Student')
                .map((peep, index) => (
                  <CListGroupItem className="d-flex justify-content-between" key={index}>
                    <div className="d-flex justify-content-between">
                      <div className="name-email d-flex gap-2">
                        <div>{peep.fullname}</div>
                        <div>({peep.email})</div>
                      </div>
                      <div className="role">{peep.role}</div>
                    </div>
                  </CListGroupItem>
                ))}
            </CListGroup>
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default SubjectDetails
