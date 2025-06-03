import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import defaultAvatar from './../../assets/avatars/user.svg'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const AppHeaderDropdown = () => {
  const { logout } = useContext(AuthContext)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={defaultAvatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        {/* <CDropdownItem style={{ cursor: 'pointer' }}>
          <CIcon icon={cilSettings} className="me-3" />
          Settings
        </CDropdownItem> */}
        <CDropdownItem style={{ cursor: 'pointer' }} onClick={logout}>
          <CIcon icon={cilAccountLogout} className="me-3" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
