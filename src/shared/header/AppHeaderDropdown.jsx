import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import defaultAvatar from './../../assets/avatars/user.svg'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        {user.image !== null ? (
          <img src={user.image} style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
        ) : (
          <img src={defaultAvatar} style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem style={{ cursor: 'pointer' }} onClick={logout}>
          <CIcon icon={cilAccountLogout} className="me-3" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
