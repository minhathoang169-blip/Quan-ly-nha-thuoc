import { useEffect, useState } from 'react'
import Storefront from './Storefront.jsx'

export default function App() {
  const [admin, setAdmin] = useState(window.location.pathname === '/admin')

  function openAdmin() {
    window.history.pushState({}, '', admin ? '/' : '/admin')
    setAdmin(!admin)
    window.scrollTo(0, 0)
  }

  return admin
    ? <AdminPage onBack={openAdmin} />
    : <Storefront onAdmin={openAdmin} />
}

function AdminPage({ onBack }) {
  // Lazy loading keeps the existing inventory workspace intact for staff.
  const [Dashboard, setDashboard] = useState(null)
  useEffect(() => { import('./AdminDashboard.jsx').then((module) => setDashboard(() => module.default)) }, [])
  if (!Dashboard) return <div className="admin-loading">Đang mở không gian quản trị…</div>
  return <><button className="admin-back" type="button" onClick={onBack}>← Cửa hàng</button><Dashboard /></>
}
