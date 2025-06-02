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
  CTooltip,
  CCardBody,
  CCardSubtitle,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'
import AuthContext from '../../../context/AuthContext'
import { cilEnvelopeClosed } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const SubjectDetails = () => {
  const [className, setClassName] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [error, setError] = useState('')
  const [people, setPeople] = useState([])
  const [questions, setQuestions] = useState([])

  const { user } = useContext(AuthContext)

  const { class_id, subject_id } = useParams()

  useEffect(() => {
    getSubjectDetails()
    getAllEnrolledPeople()
    getAllQuestionsByClassSubject()
  }, [class_id, subject_id])

  const getSubjectDetails = async () => {
    try {
      const response = await api.get(`subject/get-subject-details/${class_id}/${subject_id}`)
      setClassName(response.data.data.class_name)
      setSubjectName(response.data.data.subject_name)
    } catch (error) {
      console.error('Error fetching subject details', error)
      setError(error)
    }
  }

  const getAllEnrolledPeople = async () => {
    try {
      const response = await api.get(`subject-enrollment/get-all-people/${subject_id}`)
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
      console.log(response.data.data)

      setQuestions(response.data.data)
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
            <CTab aria-controls="quiz-tab-pane" itemKey={2}>
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
          <CTabPanel className="p-3" aria-labelledby="quiz-tab-pane" itemKey={2}>
            <CContainer>
              <CRow>
                <CCol sm="auto">
                  <h1>Question Bank</h1>
                  {questions.map((qa, index) => (
                    <CCard
                      style={{ width: '30rem', cursor: 'pointer' }}
                      className="mt-4"
                      key={index}
                    >
                      <CCardBody>
                        <div className="d-flex justify-content-between align-items-center">
                          <CCardTitle>{qa.question_text}</CCardTitle>
                          <CCardSubtitle className="mb-2 text-body-secondary">
                            Full Marks: {qa.full_marks}
                          </CCardSubtitle>
                        </div>
                        {qa.options.map((op, index) => (
                          <CContainer key={index}>
                            <CRow>
                              <CCol xs={6}>{op.option_text}</CCol>
                            </CRow>
                          </CContainer>
                        ))}
                      </CCardBody>
                    </CCard>
                  ))}
                </CCol>
                <CCol sm="auto">
                  <h1>Quiz Paper</h1>
                  <CCard style={{ width: '40rem' }} className="mt-4">
                    <CCardBody>This is some text within a card body.</CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          </CTabPanel>
          <CTabPanel className="p-3" aria-labelledby="people-tab-pane" itemKey={3}>
            <CListGroup className="mt-2">
              <h1>Teachers</h1>
              {people
                .filter((peep) => peep.role === 'Admin')
                .map((peep, index) => (
                  <CListGroupItem
                    className="d-flex justify-content-between gap-2 text-secondary fw-semibold mt-2"
                    key={index}
                  >
                    <div>{peep.fullname}</div>
                    <div className="d-flex gap-2" style={{ cursor: 'pointer' }}>
                      <CTooltip content={`Email ${peep.email}`} placement="bottom">
                        <CIcon size="xl" icon={cilEnvelopeClosed} />
                      </CTooltip>
                    </div>
                  </CListGroupItem>
                ))}
            </CListGroup>
            <CListGroup className="mt-5">
              <h1>Students</h1>
              {people
                .filter((peep) => peep.role === 'Student')
                .map((peep, index) => (
                  <CListGroupItem
                    className="d-flex justify-content-between gap-2 text-secondary fw-semibold mt-2"
                    key={index}
                  >
                    <div>{peep.fullname}</div>
                    <div className="d-flex gap-2" style={{ cursor: 'pointer' }}>
                      <CTooltip content={`Email ${peep.email}`} placement="bottom">
                        <CIcon size="xl" icon={cilEnvelopeClosed} />
                      </CTooltip>
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
