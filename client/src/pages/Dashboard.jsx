import { useEffect, useState } from 'react';
import { useTasks } from '../store/taskStore';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Dashboard() {
  const { items, page, totalPages, setPage, fetch, create, update, remove, setFilters } = useTasks();
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => { fetch(); }, [page]);

  const byPriority = {
    urgent: items.filter(t=>t.priority==='urgent'),
    high: items.filter(t=>t.priority==='high'),
    medium: items.filter(t=>t.priority==='medium'),
    low: items.filter(t=>t.priority==='low')
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <div className="flex gap-2">
          <input placeholder="Search" className="border p-2 rounded" onChange={(e)=>setFilters({search:e.target.value})} />
          <select className="border p-2 rounded" onChange={(e)=>setFilters({status:e.target.value})}>
            <option value="">All statuses</option>
            {['pending','in-progress','completed','blocked'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="border p-2 rounded" onChange={(e)=>setFilters({priority:e.target.value})}>
            <option value="">All priorities</option>
            {['low','medium','high','urgent'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-4">
          <h3 className="font-semibold mb-3">Create / Edit Task</h3>
          <TaskForm
            initial={editing || {}}
            onSubmit={async (data) => {
              if (editing) { await update(editing._id, data); setEditing(null); }
              else { await create(data); }
            }}
          />
        </div>

        <div className="space-y-6">
          {(['urgent','high','medium','low']).map((p)=> (
            <section key={p}>
              <h3 className={`font-semibold mb-2 capitalize ${p==='urgent'?'text-red-700':p==='high'?'text-orange-700':p==='medium'?'text-yellow-700':'text-green-700'}`}>{p} priority</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {byPriority[p].map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={setEditing}
                    onDelete={(t)=>setConfirm(t)}
                    onStatus={async(id, status)=>{ await update(id, { status }); }}
                  />
                ))}
              </div>
            </section>
          ))}

          <div className="flex justify-end"><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirm}
        title="Delete task?"
        message={`Are you sure you want to delete "${confirm?.title}"? This cannot be undone.`}
        onCancel={()=>setConfirm(null)}
        onConfirm={async()=>{ await remove(confirm._id); setConfirm(null); }}
      />
    </div>
  );
}
