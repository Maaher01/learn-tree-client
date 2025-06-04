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
  CButton,
  CAvatar,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import defaultAvatar from '../../../assets/avatars/user.svg'
import AuthContext from '../../../context/AuthContext'
import { cilEnvelopeClosed, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const SubjectDetails = () => {
  const [className, setClassName] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [error, setError] = useState('')
  const [people, setPeople] = useState([])
  const [questions, setQuestions] = useState([])
  const [activeTab, setActiveTab] = useState(() => {
    return parseInt(localStorage.getItem('activeSubjectTab')) || 1
  })
  const [showPostForm, setShowPostForm] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)

  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link']],
  }

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
      setQuestions(response.data.data)
    } catch (error) {
      console.error('Error fetching questions', error)
      setError(error)
    }
  }

  return (
    <>
      <CTabs
        activeItemKey={activeTab}
        onChange={(key) => {
          setActiveTab(key)
          localStorage.setItem('activeSubjectTab', key)
        }}
      >
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
            {!showPostForm ? (
              <CCard className=" px-3" style={{ cursor: 'pointer' }}>
                <CButton
                  className="d-flex flex-row align-items-center"
                  onClick={() => setShowPostForm(true)}
                >
                  <CAvatar src={defaultAvatar} size="md" />
                  <CCardBody className="text-secondary fw-semibold text-start">
                    Anounce Something to your class...
                  </CCardBody>
                </CButton>
              </CCard>
            ) : (
              <CCard className="p-4 d-flex flex-column gap-5">
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  style={{ backgroundColor: 'white', height: '175px' }}
                />
                <div className="buttons d-flex gap-4 justify-content-end mt-4">
                  <CButton
                    variant="ghost"
                    className="fw-medium"
                    style={{ color: '#4B49B6' }}
                    onClick={() => setShowPostForm(false)}
                  >
                    Cancel
                  </CButton>
                  <CButton color="primary" type="submit">
                    Post
                  </CButton>
                </div>
              </CCard>
            )}
          </CTabPanel>
          <CTabPanel className="p-3" aria-labelledby="quiz-tab-pane" itemKey={2}>
            <CContainer>
              <CRow className="d-flex">
                <CCol sm="auto" style={{ width: '30%' }}>
                  <h1>Question Bank</h1>
                  <CButton
                    color="primary mt-3 d-flex gap-1 align-items-center"
                    onClick={() => setShowQuestionModal(true)}
                  >
                    Create Question<CIcon icon={cilPlus}></CIcon>
                  </CButton>
                  {questions.length > 0 ? (
                    questions.map((qa, index) => (
                      <CCard style={{ cursor: 'pointer' }} className="mt-3" key={index}>
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
                    ))
                  ) : (
                    <CCard className="mt-4">
                      <CCardBody className="text-secondary fw-semibold">
                        No questions created yet
                      </CCardBody>
                    </CCard>
                  )}
                </CCol>
                <CCol sm="auto" style={{ width: '70%' }}>
                  <h1>Quiz Paper</h1>
                  <CCard className="mt-4">
                    <CCardBody className="text-secondary fw-semibold">
                      Drag questions and drop here to create paper
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
            <CModal
              alignment="center"
              scrollable
              visible={showQuestionModal}
              onClose={() => setShowQuestionModal(false)}
              aria-labelledby="VerticallyCenteredScrollableExample2"
            >
              <CModalHeader>
                <CModalTitle id="VerticallyCenteredScrollableExample2">New Question</CModalTitle>
              </CModalHeader>
              <CModalBody></CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClose={() => setShowQuestionModal(false)}>
                  Cancel
                </CButton>
                <CButton color="primary">Submit</CButton>
              </CModalFooter>
            </CModal>
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
                    <div className="name-img d-flex align-items-center gap-4">
                      <CAvatar src={defaultAvatar} width={32} height={32} />
                      <div>{peep.fullname}</div>
                    </div>
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
                    <div className="name-img d-flex align-items-center gap-4">
                      <CAvatar src={defaultAvatar} width={32} height={32} />
                      <div>{peep.fullname}</div>
                    </div>
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
