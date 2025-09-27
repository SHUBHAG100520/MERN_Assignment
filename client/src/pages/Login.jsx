import { useState } from 'react';
import { useAuth } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-xl p-6 space-y-3">
        <h1 className="text-xl font-semibold">Login</h1>
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full py-2 bg-blue-600 text-white rounded" onClick={async()=>{ await login(email,password); navigate('/'); }}>Sign in</button>
      </div>
    </div>
  );
}
