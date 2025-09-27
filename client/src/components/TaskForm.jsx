import { useState } from 'react';

export default function TaskForm({ initial = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    dueDate: initial.dueDate ? initial.dueDate.substring(0,10) : '',
    priority: initial.priority || 'low'
  });
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ ...form, dueDate: form.dueDate ? new Date(form.dueDate) : null });
      }}
    >
      <input className="w-full border p-2 rounded" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
      <textarea className="w-full border p-2 rounded" placeholder="Description" rows={4} value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
      <div className="flex gap-3">
        <input type="date" className="border p-2 rounded" value={form.dueDate} onChange={(e)=>setForm({...form,dueDate:e.target.value})} />
        <select className="border p-2 rounded" value={form.priority} onChange={(e)=>setForm({...form,priority:e.target.value})}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </form>
  );
}
