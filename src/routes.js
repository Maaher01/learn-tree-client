import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const SubjectDetails = React.lazy(() => import('./views/pages/subjectDetails/SubjectDetails'))

const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Classes', element: Dashboard },
  { path: '/class/details/:class_id/:subject_id', name: 'Class Details', element: SubjectDetails },
]

export default routes
