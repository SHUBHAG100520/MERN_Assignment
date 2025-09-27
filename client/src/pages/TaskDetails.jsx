import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import PriorityBadge from '../components/PriorityBadge';

export default function TaskDetails(){
  const { id } = useParams();
  const [task, setTask] = useState(null);
  useEffect(()=>{ (async()=>{ const res = await api.get(`/tasks/${id}`); setTask(res.data); })(); },[id]);
  if(!task) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6 space-y-2">
      <Link to="/" className="text-blue-600">← Back</Link>
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <PriorityBadge value={task.priority} />
      <p className="text-gray-600">Status: {task.status}</p>
      <p className="text-gray-600">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString(): '—'}</p>
      <p className="mt-4 whitespace-pre-wrap">{task.description || 'No description'}</p>
    </div>
  );
}
