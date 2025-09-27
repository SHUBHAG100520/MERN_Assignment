import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import { allowRoles } from '../middleware/roles.js';
import { listUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();
router.use(auth, allowRoles('admin'));

router.get('/', listUsers);
router.post('/', [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }), body('role').isIn(['admin', 'user'])], handleValidation, createUser);
router.patch('/:id', handleValidation, updateUser);
router.delete('/:id', deleteUser);

export default router;
