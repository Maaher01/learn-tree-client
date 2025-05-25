import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const SubjectCards = (props) => {
  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon height={52} className="my-4 text-white" />}
          style={{
            '--cui-card-cap-bg': '#00aced',
          }}
        />
      </CCol>
    </CRow>
  )
}

SubjectCards.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default SubjectCards
