import { CCard, CCardBody } from '@coreui/react'

const QuizPaper = () => {
  return (
    <>
      <h1>Quiz Paper</h1>
      <CCard className="mt-4">
        <CCardBody className="text-secondary fw-semibold">
          Drag questions and drop here to create paper
        </CCardBody>
      </CCard>
    </>
  )
}

export default QuizPaper
