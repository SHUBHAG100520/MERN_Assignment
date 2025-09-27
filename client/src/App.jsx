import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import Users from './pages/Users';
import { useAuth } from './store/authStore';
import './index.css';

function PrivateRoute({ children }) {
  const token = useAuth((s) => s.token);
  return token ? children : <Navigate to="/login" />;
}

export default function App(){
  const { token, logout } = useAuth();
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav className="border-b p-4 flex justify-between">
          <div className="flex gap-4"><Link to="/">Tasks</Link><Link to="/users">Users</Link></div>
          {token && <button onClick={logout} className="px-3 py-1 bg-gray-200 rounded">Logout</button>}
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/tasks/:id" element={<PrivateRoute><TaskDetails /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
