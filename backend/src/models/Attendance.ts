import { Document, Model, Schema, Types, model } from 'mongoose';

export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Half Day' | 'Off' | 'Holiday' | 'Graced';

export interface IAttendance extends Document {
  userId: Types.ObjectId;
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  status: AttendanceStatus;
  note: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date:     { type: Date, required: true },
    checkIn:  { type: Date, default: null },
    checkOut: { type: Date, default: null },
    status:   { type: String, enum: ['Present', 'Late', 'Absent', 'Half Day', 'Off', 'Holiday', 'Graced'], default: 'Absent' },
    note:     { type: String, default: '' },
    location: { type: String, default: '' },
  },
  { timestamps: true }
);

attendanceSchema.index({ userId: 1, date: -1 });
attendanceSchema.index({ date: -1 });

export const Attendance: Model<IAttendance> = model<IAttendance>('Attendance', attendanceSchema);
