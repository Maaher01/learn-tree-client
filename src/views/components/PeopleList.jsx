import { CListGroup, CListGroupItem, CTooltip, CAvatar } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import defaultAvatar from '../../assets/avatars/user.svg'
import { cilEnvelopeClosed } from '@coreui/icons'
import { api } from '../../api/api'
import CIcon from '@coreui/icons-react'

const PeopleList = () => {
  const [people, setPeople] = useState([])
  const [error, setError] = useState('')

  const { class_id, subject_id } = useParams()

  useEffect(() => {
    getAllEnrolledPeople()
  }, [class_id, subject_id])

  const getAllEnrolledPeople = async () => {
    try {
      const response = await api.get(`subject-enrollment/get-all-people/${subject_id}`)
      setPeople(response.data.data)
    } catch (error) {
      console.error('Error fetching people', error)
      setError(error)
    }
  }

  return (
    <>
      <CListGroup className="mt-2">
        <h2 className="fw-semibold mb-4">Teachers</h2>
        {people
          .filter((peep) => peep.role === 'Teacher')
          .map((peep) => (
            <CListGroupItem
              className="d-flex justify-content-between gap-2 text-secondary fw-semibold py-3"
              key={peep.user_id}
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
        <h2 className="fw-semibold mb-4">Students</h2>
        {people
          .filter((peep) => peep.role === 'Student')
          .map((peep, index) => (
            <CListGroupItem
              className="d-flex justify-content-between gap-2 text-secondary fw-semibold py-3"
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
    </>
  )
}

export default PeopleList
