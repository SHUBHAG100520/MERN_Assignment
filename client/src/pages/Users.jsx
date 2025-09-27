import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Users(){
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'user' });
  const load = async()=>{ const res = await api.get('/users'); setUsers(res.data.data); };
  useEffect(()=>{ load(); },[]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">User Management</h1>
      <form className="flex gap-2" onSubmit={async(e)=>{e.preventDefault(); await api.post('/users', form); setForm({ name:'', email:'', password:'', role:'user'}); await load();}}>
        <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <select className="border p-2 rounded" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>

      <table className="w-full text-left">
        <thead><tr><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Role</th><th className="p-2">Actions</th></tr></thead>
        <tbody>
          {users.map(u=> (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2"><button className="px-3 py-1 bg-red-600 text-white rounded" onClick={async()=>{ await api.delete(`/users/${u._id}`); await load(); }}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
