import Task from '../models/Task.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildPagination } from '../utils/paginate.js';

function canModify(user, task) {
  return user.role === 'admin' || String(task.createdBy) === String(user.id);
}

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, assignee } = req.body;
  const task = await Task.create({ title, description, dueDate, priority, createdBy: req.user.id, assignee });
  res.status(201).json(task);
});

export const getTasks = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const { status, priority, search, assignee, mine } = req.query;

  const $and = [];
  if (status) $and.push({ status });
  if (priority) $and.push({ priority });
  if (assignee) $and.push({ assignee });
  if (mine === 'true') $and.push({ $or: [{ createdBy: req.user.id }, { assignee: req.user.id }] });
  else if (req.user.role !== 'admin') $and.push({ $or: [{ createdBy: req.user.id }, { assignee: req.user.id }] });
  if (search) $and.push({ title: { $regex: search, $options: 'i' } });

  const query = $and.length ? { $and } : {};

  const [items, total] = await Promise.all([
    Task.find(query)
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Task.countDocuments(query)
  ]);

  res.json({ data: items, page, limit, totalItems: total, totalPages: Math.ceil(total / limit) });
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate('assignee', 'name email').populate('createdBy', 'name email');
  if (!task) return res.status(404).json({ message: 'Not found' });
  if (req.user.role !== 'admin' && String(task.createdBy._id) !== req.user.id && String(task.assignee?._id) !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  if (!canModify(req.user, task)) return res.status(403).json({ message: 'Forbidden' });

  const fields = ['title', 'description', 'dueDate', 'priority', 'status', 'assignee'];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) task[f] = req.body[f];
  });
  await task.save();
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  if (!canModify(req.user, task)) return res.status(403).json({ message: 'Forbidden' });
  await task.deleteOne();
  res.status(204).send();
});

export const updateStatus = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  if (!canModify(req.user, task)) return res.status(403).json({ message: 'Forbidden' });
  task.status = req.body.status;
  await task.save();
  res.json(task);
});

export const updatePriority = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  if (!canModify(req.user, task)) return res.status(403).json({ message: 'Forbidden' });
  task.priority = req.body.priority;
  await task.save();
  res.json(task);
});

export const assignTask = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { id, userId } = { id: req.params.id, userId: req.params.userId };
  const task = await Task.findByIdAndUpdate(id, { assignee: userId }, { new: true });
  if (!task) return res.status(404).json({ message: 'Not found' });
  res.json(task);
});
