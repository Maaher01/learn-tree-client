import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../api/api'
import axios from 'axios'

const SubjectCards = (props) => {
  const [error, setError] = useState('')
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getAllUserSubjects()
  }, [])

  const getAllUserSubjects = async () => {
    try {
      const response = await axios.get(`${baseUrl}/subject-enrollment/get-all-subjects`, {
        withCredentials: true,
      })
      setSubjects(response.data.data)
    } catch (error) {
      console.error('Error fetching user subjects', error)
      setError(error)
    }
  }

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {subjects.map((subject) => (
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsD
            title={subject.subject_name}
            icon={<CIcon height={52} className="my-4 text-white" />}
            style={{
              '--cui-card-cap-bg': '#00aced',
            }}
          />
        </CCol>
      ))}
    </CRow>
  )
}

SubjectCards.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default SubjectCards
