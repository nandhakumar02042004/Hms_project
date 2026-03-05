import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Calendar, 
  UserPlus, 
  Activity, 
  LayoutDashboard, 
  Stethoscope, 
  ChevronRight,
  Plus
} from 'lucide-react';

const API_BASE = '/api'; // Proxied to Django

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // These endpoints correspond to the ViewSets in Django
      const [docs, pats, apps] = await Promise.all([
        axios.get(`${API_BASE}/hms/doctors/`),
        axios.get(`${API_BASE}/hms/patients/`),
        axios.get(`${API_BASE}/hms/appointments/`)
      ]);
      setDoctors(docs.data);
      setPatients(pats.data);
      setAppointments(apps.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <li 
      className={`nav-item ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      <Icon size={20} />
      <span>{label}</span>
      {activeTab === id && <ChevronRight size={16} ml="auto" />}
    </li>
  );

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="logo">
          <Activity size={32} />
          <span>HMS Core</span>
        </div>
        <ul className="nav-links">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="doctors" icon={Stethoscope} label="Doctors" />
          <NavItem id="patients" icon={Users} label="Patients" />
          <NavItem id="appointments" icon={Calendar} label="Appointments" />
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1 className="page-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <button className="nav-item active" style={{ border: 'none', cursor: 'pointer' }}>
            <Plus size={18} />
            <span>New {activeTab.slice(0, -1)}</span>
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Doctors</div>
                <div className="stat-value">{doctors.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Patients</div>
                <div className="stat-value">{patients.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Active Appointments</div>
                <div className="stat-value">{appointments.length}</div>
              </div>
            </div>

            <div className="data-card">
              <h3>Recent Appointments</h3>
              <table style={{ marginTop: '1rem' }}>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map(app => (
                    <tr key={app.id}>
                      <td>{app.patient_name || 'Patient ' + app.patient}</td>
                      <td>{app.doctor_name || 'Dr. ' + app.doctor}</td>
                      <td>{new Date(app.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${app.status.toLowerCase() === 'scheduled' ? 'badge-pending' : 'badge-success'}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr><td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No recent appointments found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {(activeTab === 'doctors' || activeTab === 'patients') && (
          <div className="data-card">
             <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>{activeTab === 'doctors' ? 'Specialization' : 'DOB'}</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'doctors' ? doctors : patients).map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>{item.name || (item.first_name + ' ' + item.last_name)}</td>
                      <td>{item.specialization || item.dob}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_number}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
