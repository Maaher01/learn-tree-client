import { useContext, useState } from 'react'
import {
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'
import AuthContext from '../../../context/AuthContext'

import SubjectHeader from '../../components/SubjectHeader'
import PostForm from '../../components/PostForm'
import PostList from '../../components/PostList/PostList'
import PeopleList from '../../components/PeopleList'
import QuestionBank from '../../components/QuestionBank'
import QuizPaper from '../../components/QuizPaper'

const SubjectDetails = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return parseInt(localStorage.getItem('activeSubjectTab')) || 1
  })

  const { user } = useContext(AuthContext)

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
          {user.role === 'Teacher' ? (
            <CTab aria-controls="quiz-tab-pane" itemKey={2}>
              Create Quiz
            </CTab>
          ) : null}

          <CTab aria-controls="people-tab-pane" itemKey={3}>
            People
          </CTab>
        </CTabList>

        <CTabContent>
          <CTabPanel className="py-4" aria-labelledby="stream-tab-pane" itemKey={1}>
            <div className="stream-content d-flex flex-column gap-4">
              <SubjectHeader />
              <PostForm />
              <PostList />
            </div>
          </CTabPanel>
          <CTabPanel className="py-4" aria-labelledby="quiz-tab-pane" itemKey={2}>
            <CContainer>
              <CRow>
                <CCol xs={12} md={4} className="mb-4">
                  <QuestionBank />
                </CCol>
                <CCol xs={12} md={8}>
                  <QuizPaper />
                </CCol>
              </CRow>
            </CContainer>
          </CTabPanel>
          <CTabPanel className="py-4" aria-labelledby="people-tab-pane" itemKey={3}>
            <PeopleList />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default SubjectDetails
