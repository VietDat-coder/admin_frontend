import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const initialUsers = [
  {
    id: 1,
    name: 'Nguyễn Minh Anh',
    email: 'minhanh@example.com',
    role: 'Quản trị viên',
    status: 'Hoạt động',
    joinedAt: '12/03/2025',
  },
  {
    id: 2,
    name: 'Trần Quốc Bảo',
    email: 'quocbao@example.com',
    role: 'Biên tập viên',
    status: 'Hoạt động',
    joinedAt: '28/04/2025',
  },
  {
    id: 3,
    name: 'Lê Thu Hà',
    email: 'thuha@example.com',
    role: 'Thành viên',
    status: 'Hoạt động',
    joinedAt: '05/06/2025',
  },
  {
    id: 4,
    name: 'Phạm Hoàng Long',
    email: 'hoanglong@example.com',
    role: 'Thành viên',
    status: 'Tạm khóa',
    joinedAt: '19/07/2025',
  },
  {
    id: 5,
    name: 'Vũ Ngọc Lan',
    email: 'ngoclan@example.com',
    role: 'Biên tập viên',
    status: 'Hoạt động',
    joinedAt: '02/09/2025',
  },
  {
    id: 6,
    name: 'Đặng Gia Huy',
    email: 'giahuy@example.com',
    role: 'Thành viên',
    status: 'Hoạt động',
    joinedAt: '14/11/2025',
  },
]

const emptyForm = { name: '', email: '', role: 'Thành viên', status: 'Hoạt động' }

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái')
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const activeCount = users.filter((user) => user.status === 'Hoạt động').length
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'Tất cả trạng thái' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openModal = (user) => {
    setEditingId(user?.id ?? null)
    setForm(
      user
        ? { name: user.name, email: user.email, role: user.role, status: user.status }
        : emptyForm,
    )
    setModalVisible(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (editingId) {
      setUsers((currentUsers) =>
        currentUsers.map((user) => (user.id === editingId ? { ...user, ...form } : user)),
      )
    } else {
      const nextId = Math.max(0, ...users.map((user) => user.id)) + 1
      setUsers((currentUsers) => [
        { ...form, id: nextId, joinedAt: new Date().toLocaleDateString('vi-VN') },
        ...currentUsers,
      ])
    }
    setModalVisible(false)
  }

  const deleteUser = (user) => {
    if (window.confirm(`Bạn có chắc muốn xóa người dùng ${user.name}?`)) {
      setUsers((currentUsers) => currentUsers.filter((item) => item.id !== user.id))
    }
  }

  return (
    <>
      <CRow className="align-items-center mb-4">
        <CCol>
          <h1 className="h3 mb-1">Quản lý người dùng</h1>
          <div className="text-body-secondary">
            Danh sách và trạng thái tài khoản trong hệ thống
          </div>
        </CCol>
        <CCol xs="auto">
          <CButton color="primary" onClick={() => openModal()}>
            <CIcon icon={cilPeople} className="me-2" />
            Thêm người dùng
          </CButton>
        </CCol>
      </CRow>

      <CRow className="mb-4">
        <CCol xs={12} sm={6} xl={4}>
          <CCard className="h-100">
            <CCardBody>
              <div className="text-body-secondary small">Tổng người dùng</div>
              <div className="fs-4 fw-semibold">{users.length}</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} xl={4}>
          <CCard className="h-100">
            <CCardBody>
              <div className="text-body-secondary small">Đang hoạt động</div>
              <div className="fs-4 fw-semibold">{activeCount}</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} xl={4}>
          <CCard className="h-100">
            <CCardBody>
              <div className="text-body-secondary small">Tạm khóa</div>
              <div className="fs-4 fw-semibold">{users.length - activeCount}</div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <strong>Danh sách tài khoản</strong>
          <div className="d-flex flex-wrap gap-2">
            <CFormInput
              aria-label="Tìm theo tên hoặc email"
              placeholder="Tìm tên hoặc email..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <CFormSelect
              aria-label="Lọc theo trạng thái"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>Tất cả trạng thái</option>
              <option>Hoạt động</option>
              <option>Tạm khóa</option>
            </CFormSelect>
          </div>
        </CCardHeader>
        <CCardBody className="p-0">
          <CTable hover responsive align="middle" className="mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Người dùng</CTableHeaderCell>
                <CTableHeaderCell scope="col">Vai trò</CTableHeaderCell>
                <CTableHeaderCell scope="col">Ngày tham gia</CTableHeaderCell>
                <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-end">
                  Thao tác
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredUsers.map((user) => (
                <CTableRow key={user.id}>
                  <CTableDataCell>
                    <div className="fw-semibold">{user.name}</div>
                    <div className="small text-body-secondary">{user.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>{user.role}</CTableDataCell>
                  <CTableDataCell>{user.joinedAt}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={user.status === 'Hoạt động' ? 'success' : 'secondary'}>
                      {user.status}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="text-end text-nowrap">
                    <CButton
                      size="sm"
                      color="primary"
                      variant="ghost"
                      onClick={() => openModal(user)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      variant="ghost"
                      onClick={() => deleteUser(user)}
                    >
                      Xóa
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
              {filteredUsers.length === 0 && (
                <CTableRow>
                  <CTableDataCell colSpan={5} className="py-4 text-center text-body-secondary">
                    Không tìm thấy người dùng phù hợp.
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <form onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>{editingId ? 'Cập nhật người dùng' : 'Thêm người dùng'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <CFormLabel htmlFor="user-name">Họ và tên</CFormLabel>
              <CFormInput
                id="user-name"
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="user-email">Email</CFormLabel>
              <CFormInput
                id="user-email"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="user-role">Vai trò</CFormLabel>
              <CFormSelect
                id="user-role"
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value })}
              >
                <option>Quản trị viên</option>
                <option>Biên tập viên</option>
                <option>Thành viên</option>
              </CFormSelect>
            </div>
            <div>
              <CFormLabel htmlFor="user-status">Trạng thái</CFormLabel>
              <CFormSelect
                id="user-status"
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value })}
              >
                <option>Hoạt động</option>
                <option>Tạm khóa</option>
              </CFormSelect>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" variant="outline" onClick={() => setModalVisible(false)}>
              Hủy
            </CButton>
            <CButton color="primary" type="submit">
              Lưu người dùng
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  )
}

export default UserManagement
