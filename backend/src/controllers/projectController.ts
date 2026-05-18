import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { Project } from '../models/Project';
import { sendError, sendSuccess } from '../utils/response';

const createSchema = z.object({
  name:        z.string().min(1).max(200),
  description: z.string().optional().default(''),
  status:      z.enum(['Active', 'Priority', 'Completed', 'Not Started', 'Overdue']).default('Not Started'),
  startDate:   z.string().datetime(),
  endDate:     z.string().datetime(),
  members:     z.array(z.string()).default([]),
});

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const limit  = Math.min(Number(req.query.limit ?? 20), 100);
    const page   = Math.max(Number(req.query.page ?? 1), 1);
    const status = req.query.status as string | undefined;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    const [projects, total] = await Promise.all([
      Project.find(filter).populate('members', 'name email initials').sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit),
      Project.countDocuments(filter),
    ]);
    sendSuccess(res, { projects }, 200, { page, limit, total, totalPages: Math.ceil(total/limit) });
  } catch (err) { next(err); }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'name email');
    if (!project) { sendError(res, 'Project not found', 404, 'PROJECT_NOT_FOUND'); return; }
    sendSuccess(res, { project });
  } catch (err) { next(err); }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createSchema.parse(req.body);
    const project = await Project.create({ ...data, createdBy: req.user!.userId });
    sendSuccess(res, { project }, 201);
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) { sendError(res, 'Project not found', 404, 'PROJECT_NOT_FOUND'); return; }
    sendSuccess(res, { project });
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) { sendError(res, 'Project not found', 404, 'PROJECT_NOT_FOUND'); return; }
    res.status(204).send();
  } catch (err) { next(err); }
};
