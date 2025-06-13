import {
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CContainer,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api/api'

const QuestionBank = () => {
  const [questions, setQuestions] = useState([])
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [error, setError] = useState('')

  const { class_id, subject_id } = useParams()

  useEffect(() => {
    getAllQuestionsByClassSubject()
  }, [class_id, subject_id])

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
      <>
        <h1>Question Bank</h1>
        <CButton
          color="primary mt-3 d-flex gap-1 align-items-center"
          onClick={() => setShowQuestionModal(true)}
        >
          Create Question<CIcon icon={cilPlus}></CIcon>
        </CButton>
        {questions.length > 0 ? (
          questions.map((qa) => (
            <CCard style={{ cursor: 'pointer' }} className="mt-3" key={qa.question_id}>
              <CCardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <CCardTitle>{qa.question_text}</CCardTitle>
                  <CCardSubtitle className="mb-2 text-body-secondary">
                    Full Marks: {qa.full_marks}
                  </CCardSubtitle>
                </div>
                {qa.options.map((op) => (
                  <CContainer key={op.option_id}>
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
            <CCardBody className="text-secondary fw-semibold">No questions created yet</CCardBody>
          </CCard>
        )}
      </>
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
    </>
  )
}

export default QuestionBank
