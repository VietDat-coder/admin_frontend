import React from 'react'

// Cac trang chinh trong menu
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const UserManagement = React.lazy(() => import('./views/users/UserManagement'))
const Reports = React.lazy(() => import('./views/reports/Reports'))

export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/users', name: 'Quan ly nguoi dung', element: UserManagement },
  { path: '/reports', name: 'Bao cao va thong ke', element: Reports },
]

export default routes
