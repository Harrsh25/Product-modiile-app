import { Document, Model, Schema, Types, model } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  description: string;
  type: 'Subtask' | 'Task' | 'Issue' | 'Bug';
  status: 'Not Started' | 'Ongoing' | 'Completed' | 'Overdue' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  projectId: Types.ObjectId;
  assignedTo: Types.ObjectId;
  createdBy: Types.ObjectId;
  parentTask: Types.ObjectId | null;
  dueDate: Date;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    type:        { type: String, enum: ['Subtask', 'Task', 'Issue', 'Bug'], default: 'Task' },
    status:      { type: String, enum: ['Not Started', 'Ongoing', 'Completed', 'Overdue', 'On Hold'], default: 'Not Started' },
    priority:    { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    projectId:   { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentTask:  { type: Schema.Types.ObjectId, ref: 'Assignment', default: null },
    dueDate:     { type: Date, required: true },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

assignmentSchema.index({ assignedTo: 1, status: 1 });
assignmentSchema.index({ projectId: 1 });
assignmentSchema.index({ dueDate: 1 });

export const Assignment: Model<IAssignment> = model<IAssignment>('Assignment', assignmentSchema);
