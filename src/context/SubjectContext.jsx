import { createContext, useState } from 'react'
import { api } from '../api/api'

const SubjectContext = createContext({})

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([])
  const [error, setError] = useState('')

  const getAllUserSubjects = async () => {
    try {
      const response = await api.get(`/subject-enrollment/get-all-subjects`)
      setSubjects(response.data.data)
    } catch (error) {
      console.error('Error fetching user subjects', error)
      setError(error)
    }
  }

  return (
    <SubjectContext.Provider value={{ getAllUserSubjects, subjects }}>
      {children}
    </SubjectContext.Provider>
  )
}

export default SubjectContext
