import { CCardImage, CCard, CCardImageOverlay, CCardTitle, CCardText } from '@coreui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api/api'

const SubjectHeader = () => {
  const [className, setClassName] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [error, setError] = useState('')

  const { class_id, subject_id } = useParams()

  useEffect(() => {
    getSubjectDetails()
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

  return (
    <CCard className="bg-dark text-white">
      <CCardImage src={'src/assets/images/img_bookclub.jpg'} height={240} />
      <CCardImageOverlay className="d-flex flex-column justify-content-end align-items-start">
        <CCardTitle className="fs-1">{subjectName + ' ' + className}</CCardTitle>
        <CCardText></CCardText>
      </CCardImageOverlay>
    </CCard>
  )
}

export default SubjectHeader
