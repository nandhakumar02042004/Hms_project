import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  CreditCard, 
  FlaskConical, 
  Home, 
  LogOut 
} from 'lucide-react'

// Basic Component Templates
const Dashboard = () => (
  <div className="container mt-4">
    <h2>Welcome to HMS Admin Dashboard</h2>
    <div className="row mt-4">
      <div className="col-md-3">
        <div className="card text-white bg-primary mb-3">
          <div className="card-body">
            <h5 className="card-title">Total Patients</h5>
            <p className="card-text h2">1,250</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h5 className="card-title">Doctors Active</h5>
            <p className="card-text h2">45</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-info mb-3">
          <div className="card-body">
            <h5 className="card-title">Lab Orders</h5>
            <p className="card-text h2">18</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-warning mb-3">
          <div className="card-body">
            <h5 className="card-title">Unpaid Bills</h5>
            <p className="card-text h2">$4,200</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Patients = () => (
  <div className="container mt-4 shadow-sm p-4 bg-white rounded">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3>Patient Management</h3>
      <button className="btn btn-primary">Add New Patient</button>
    </div>
    <table className="table table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>Male</td>
          <td>1990-05-15</td>
          <td>+1 234 567 890</td>
          <td><button className="btn btn-sm btn-outline-info">View</button></td>
        </tr>
      </tbody>
    </table>
  </div>
)

const App = () => {
  return (
    <Router>
      <div className="d-flex" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        {/* Sidebar */}
        <div className="bg-dark text-white p-3 shadow" style={{ width: '280px' }}>
          <h4 className="mb-4 text-primary fw-bold">HMS Core</h4>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white d-flex align-items-center gap-2">
                <Home size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/patients" className="nav-link text-white d-flex align-items-center gap-2 mt-2">
                <Users size={18} /> Patients
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="nav-link text-white d-flex align-items-center gap-2 mt-2">
                <Stethoscope size={18} /> Doctors
              </Link>
            </li>
            <li>
              <Link to="/appointments" className="nav-link text-white d-flex align-items-center gap-2 mt-2">
                <Calendar size={18} /> Appointments
              </Link>
            </li>
            <li>
              <Link to="/lab-orders" className="nav-link text-white d-flex align-items-center gap-2 mt-2">
                <FlaskConical size={18} /> Lab Reports
              </Link>
            </li>
            <li>
              <Link to="/billing" className="nav-link text-white d-flex align-items-center gap-2 mt-2">
                <CreditCard size={18} /> Billing
              </Link>
            </li>
          </ul>
          <hr />
          <div className="mt-auto">
            <a href="#" className="nav-link text-danger d-flex align-items-center gap-2">
              <LogOut size={18} /> Sign Out
            </a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow-1 overflow-auto">
          <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4">
            <span className="navbar-brand mb-0 h1">Healthcare Management System</span>
            <div className="ms-auto">
              <span className="badge bg-soft-primary text-dark border">Admin User</span>
            </div>
          </nav>
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<div>Doctor Management (WIP)</div>} />
            <Route path="/appointments" element={<div>Appointments (WIP)</div>} />
            <Route path="/lab-orders" element={<div>Lab Orders (WIP)</div>} />
            <Route path="/billing" element={<div>Billing System (WIP)</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
