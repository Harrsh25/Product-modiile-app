import { NextFunction, Request, Response } from 'express';
import { Attendance } from '../models/Attendance';
import { sendError, sendSuccess } from '../utils/response';

export const punchIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({ userId, date: today });
    if (existing?.checkIn) { sendError(res, 'Already punched in today', 409, 'ALREADY_CHECKED_IN'); return; }

    const now = new Date();
    const nineAM = new Date();
    nineAM.setHours(9, 0, 0, 0);
    const status = now > nineAM ? 'Late' : 'Present';

    const record = existing
      ? await Attendance.findByIdAndUpdate(existing._id, { checkIn: now, status, location: req.body.location ?? '' }, { new: true })
      : await Attendance.create({ userId, date: today, checkIn: now, status, location: req.body.location ?? '' });

    sendSuccess(res, { attendance: record }, 201);
  } catch (err) { next(err); }
};

export const punchOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await Attendance.findOne({ userId, date: today });
    if (!record?.checkIn) { sendError(res, 'You have not punched in today', 400, 'NOT_CHECKED_IN'); return; }
    if (record.checkOut)  { sendError(res, 'Already punched out today', 409, 'ALREADY_CHECKED_OUT'); return; }

    const updated = await Attendance.findByIdAndUpdate(record._id, { checkOut: new Date() }, { new: true });
    sendSuccess(res, { attendance: updated });
  } catch (err) { next(err); }
};

export const getHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const limit = Math.min(Number(req.query.limit ?? 30), 100);
    const page  = Math.max(Number(req.query.page ?? 1), 1);
    const skip  = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Attendance.find({ userId }).sort({ date: -1 }).skip(skip).limit(limit),
      Attendance.countDocuments({ userId }),
    ]);

    sendSuccess(res, { records }, 200, { page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

export const getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { month, year } = req.query;
    const m = Number(month ?? new Date().getMonth() + 1) - 1;
    const y = Number(year  ?? new Date().getFullYear());

    const start = new Date(y, m, 1);
    const end   = new Date(y, m + 1, 0, 23, 59, 59);

    const records = await Attendance.find({ userId, date: { $gte: start, $lte: end } });

    const summary = {
      present: records.filter(r => r.status === 'Present').length,
      late:    records.filter(r => r.status === 'Late').length,
      absent:  records.filter(r => r.status === 'Absent').length,
      leave:   records.filter(r => r.status === 'Off' || r.status === 'Holiday').length,
      graced:  records.filter(r => r.status === 'Graced').length,
      halfDay: records.filter(r => r.status === 'Half Day').length,
    };

    sendSuccess(res, { summary, records });
  } catch (err) { next(err); }
};
