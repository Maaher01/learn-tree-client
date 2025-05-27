import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { baseUrl } from '../../api/api'

import defaultAvatar from './../../assets/avatars/user.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true })
      navigate('/')
    } catch (error) {
      console.error('Logout Failed:', error)
      setError(error)
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={defaultAvatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem component="button" onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
