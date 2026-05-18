import { Document, Model, Schema, Types, model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  status: 'Active' | 'Priority' | 'Completed' | 'Not Started' | 'Overdue';
  startDate: Date;
  endDate: Date;
  progress: number;
  members: Types.ObjectId[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status:      { type: String, enum: ['Active', 'Priority', 'Completed', 'Not Started', 'Overdue'], default: 'Not Started' },
    startDate:   { type: Date, required: true },
    endDate:     { type: Date, required: true },
    progress:    { type: Number, min: 0, max: 100, default: 0 },
    members:     [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

projectSchema.index({ status: 1 });
projectSchema.index({ createdBy: 1 });
projectSchema.index({ members: 1 });

export const Project: Model<IProject> = model<IProject>('Project', projectSchema);
