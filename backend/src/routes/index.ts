import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController';
import * as attendanceController from '../controllers/attendanceController';
import * as authController from '../controllers/authController';
import * as projectController from '../controllers/projectController';
import { protect } from '../middleware/auth';

const router = Router();

// ─── Auth (public) ────────────────────────────────────────────────────────────
router.post('/auth/register', authController.register);
router.post('/auth/login',    authController.login);
router.post('/auth/refresh',  authController.refresh);
router.get('/auth/me', protect, authController.getMe);

// ─── Projects (protected) ─────────────────────────────────────────────────────
router.get('/projects',       protect, projectController.getAll);
router.get('/projects/:id',   protect, projectController.getOne);
router.post('/projects',      protect, projectController.create);
router.patch('/projects/:id', protect, projectController.update);
router.delete('/projects/:id',protect, projectController.remove);

// ─── Assignments (protected) ──────────────────────────────────────────────────
router.get('/assignments',              protect, assignmentController.getMyAssignments);
router.get('/assignments/:id',          protect, assignmentController.getOne);
router.patch('/assignments/:id/status', protect, assignmentController.updateStatus);

// ─── Attendance (protected) ───────────────────────────────────────────────────
router.post('/attendance/punch-in',   protect, attendanceController.punchIn);
router.post('/attendance/punch-out',  protect, attendanceController.punchOut);
router.get('/attendance/history',     protect, attendanceController.getHistory);
router.get('/attendance/summary',     protect, attendanceController.getSummary);

export default router;
