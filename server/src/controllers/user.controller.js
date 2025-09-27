import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildPagination } from '../utils/paginate.js';

export const listUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const [items, total] = await Promise.all([
    User.find({}, '-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments()
  ]);
  res.json({ data: items, page, limit, totalItems: total, totalPages: Math.ceil(total / limit) });
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ id: user._id });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { name, email, role } },
    { new: true, runValidators: true, select: '-password' }
  );
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).send();
});
