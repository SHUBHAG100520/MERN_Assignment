import PriorityBadge from './PriorityBadge';

export default function TaskCard({ task, onEdit, onDelete, onStatus }) {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{task.title}</h4>
          <p className="text-xs text-gray-500">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</p>
        </div>
        <PriorityBadge value={task.priority} />
      </div>
      <p className="text-sm line-clamp-2">{task.description}</p>
      <div className="flex items-center gap-2 text-sm">
        <span className="px-2 py-1 rounded bg-gray-100">{task.status}</span>
        {task.assignee && <span className="text-gray-500">→ {task.assignee.name}</span>}
      </div>
      <div className="flex gap-2 justify-end">
        <select value={task.status} onChange={(e)=>onStatus(task._id, e.target.value)} className="border p-1 rounded">
          {['pending','in-progress','completed','blocked'].map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={()=>onEdit(task)}>Edit</button>
        <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={()=>onDelete(task)}>Delete</button>
      </div>
    </div>
  );
}
