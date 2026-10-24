import { useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartDoughnut, CChartLine } from '@coreui/react-chartjs'

const reportPeriods = {
  '7 ngày': {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    visitors: [820, 940, 760, 1120, 1050, 1380, 1210],
    signups: [34, 41, 29, 52, 47, 65, 58],
    revenue: [4.2, 5.1, 4.6, 6.8, 6.1, 7.4, 6.9],
    conversion: '4,2%',
  },
  '30 ngày': {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    visitors: [4820, 5340, 4960, 6210],
    signups: [184, 216, 193, 278],
    revenue: [22.4, 25.1, 23.6, 31.8],
    conversion: '4,6%',
  },
  '12 tháng': {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    visitors: [12800, 14200, 15700, 14900, 17600, 18900, 19300, 21400, 20700, 23100, 24800, 27600],
    signups: [420, 468, 510, 492, 582, 624, 638, 710, 686, 764, 820, 912],
    revenue: [52, 58, 64, 61, 73, 78, 81, 88, 86, 95, 103, 118],
    conversion: '4,9%',
  },
}

const formatNumber = (value) => new Intl.NumberFormat('vi-VN').format(value)

const Reports = () => {
  const [period, setPeriod] = useState('30 ngày')
  const report = reportPeriods[period]
  const totalVisitors = report.visitors.reduce((total, value) => total + value, 0)
  const totalSignups = report.signups.reduce((total, value) => total + value, 0)
  const totalRevenue = report.revenue.reduce((total, value) => total + value, 0)

  return (
    <>
      <CRow className="align-items-center mb-4">
        <CCol>
          <h1 className="h3 mb-1">Báo cáo và thống kê</h1>
          <div className="text-body-secondary">Tổng quan hoạt động và hiệu quả hệ thống</div>
        </CCol>
        <CCol xs="auto">
          <CFormSelect
            aria-label="Chọn khoảng thời gian báo cáo"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            {Object.keys(reportPeriods).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>

      <div className="small text-body-secondary mb-3">Dữ liệu minh họa</div>

      <CRow className="mb-4">
        <CCol xs={12} sm={6} xl={3} className="mb-3 mb-xl-0">
          <CCard className="h-100 border-start border-start-4 border-start-primary">
            <CCardBody>
              <div className="text-body-secondary small">Lượt truy cập</div>
              <div className="fs-4 fw-semibold">{formatNumber(totalVisitors)}</div>
              <div className="small text-success">Trong {period.toLowerCase()}</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} xl={3} className="mb-3 mb-xl-0">
          <CCard className="h-100 border-start border-start-4 border-start-success">
            <CCardBody>
              <div className="text-body-secondary small">Người dùng mới</div>
              <div className="fs-4 fw-semibold">{formatNumber(totalSignups)}</div>
              <div className="small text-success">Tài khoản đăng ký</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} xl={3} className="mb-3 mb-sm-0">
          <CCard className="h-100 border-start border-start-4 border-start-warning">
            <CCardBody>
              <div className="text-body-secondary small">Tỷ lệ chuyển đổi</div>
              <div className="fs-4 fw-semibold">{report.conversion}</div>
              <div className="small text-body-secondary">Theo khoảng thời gian đã chọn</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} xl={3}>
          <CCard className="h-100 border-start border-start-4 border-start-info">
            <CCardBody>
              <div className="text-body-secondary small">Doanh thu</div>
              <div className="fs-4 fw-semibold">{totalRevenue.toFixed(1)} triệu</div>
              <div className="small text-body-secondary">VNĐ, dữ liệu minh họa</div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} xl={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Lưu lượng và người dùng mới</strong>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: '300px' }}>
                <CChartLine
                  data={{
                    labels: report.labels,
                    datasets: [
                      {
                        label: 'Lượt truy cập',
                        data: report.visitors,
                        borderColor: '#287a66',
                        backgroundColor: 'rgba(40, 122, 102, 0.12)',
                        fill: true,
                        tension: 0.35,
                      },
                      {
                        label: 'Người dùng mới',
                        data: report.signups,
                        borderColor: '#d88732',
                        backgroundColor: 'rgba(216, 135, 50, 0.12)',
                        fill: true,
                        tension: 0.35,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} xl={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Nguồn truy cập</strong>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: '300px' }}>
                <CChartDoughnut
                  data={{
                    labels: ['Tìm kiếm', 'Trực tiếp', 'Mạng xã hội', 'Giới thiệu'],
                    datasets: [
                      {
                        data: [42, 28, 18, 12],
                        backgroundColor: ['#287a66', '#d88732', '#4f7c9b', '#c75b55'],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } },
                  }}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Trang được xem nhiều</strong>
        </CCardHeader>
        <CCardBody className="p-0">
          <CTable hover responsive align="middle" className="mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Trang</CTableHeaderCell>
                <CTableHeaderCell scope="col">Lượt xem</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tỷ lệ thoát</CTableHeaderCell>
                <CTableHeaderCell scope="col">Xu hướng</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell className="fw-semibold">Tổng quan</CTableDataCell>
                <CTableDataCell>8.420</CTableDataCell>
                <CTableDataCell>28,4%</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success">+12,8%</CBadge>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="fw-semibold">Báo cáo doanh thu</CTableDataCell>
                <CTableDataCell>5.180</CTableDataCell>
                <CTableDataCell>34,1%</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success">+8,3%</CBadge>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="fw-semibold">Quản lý người dùng</CTableDataCell>
                <CTableDataCell>3.760</CTableDataCell>
                <CTableDataCell>22,7%</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="danger">-2,1%</CBadge>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Reports
