import { Router } from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateStatus,
  updatePriority,
  assignTask
} from '../controllers/task.controller.js';

const router = Router();
router.use(auth);

router.post('/', [body('title').notEmpty()], handleValidation, createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', [body('status').isIn(['pending', 'in-progress', 'completed', 'blocked'])], handleValidation, updateStatus);
router.patch('/:id/priority', [body('priority').isIn(['low', 'medium', 'high', 'urgent'])], handleValidation, updatePriority);
router.patch('/:id/assign/:userId', assignTask);

export default router;
