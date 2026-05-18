import { NextFunction, Request, Response } from 'express';
import { Assignment } from '../models/Assignment';
import { sendError, sendSuccess } from '../utils/response';

export const getMyAssignments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const limit  = Math.min(Number(req.query.limit ?? 20), 100);
    const page   = Math.max(Number(req.query.page ?? 1), 1);
    const status = req.query.status as string | undefined;
    const filter: Record<string, unknown> = { assignedTo: userId };
    if (status) filter.status = status;

    const [assignments, total] = await Promise.all([
      Assignment.find(filter).populate('projectId', 'name status').sort({ dueDate: 1 }).skip((page-1)*limit).limit(limit),
      Assignment.countDocuments(filter),
    ]);
    sendSuccess(res, { assignments }, 200, { page, limit, total, totalPages: Math.ceil(total/limit) });
  } catch (err) { next(err); }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const a = await Assignment.findById(req.params.id).populate('projectId assignedTo createdBy', 'name email');
    if (!a) { sendError(res, 'Assignment not found', 404, 'ASSIGNMENT_NOT_FOUND'); return; }
    sendSuccess(res, { assignment: a });
  } catch (err) { next(err); }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.body;
    const completedAt = status === 'Completed' ? new Date() : null;
    const a = await Assignment.findByIdAndUpdate(req.params.id, { status, completedAt }, { new: true });
    if (!a) { sendError(res, 'Assignment not found', 404, 'ASSIGNMENT_NOT_FOUND'); return; }
    sendSuccess(res, { assignment: a });
  } catch (err) { next(err); }
};
