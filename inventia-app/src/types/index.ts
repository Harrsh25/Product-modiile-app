// ─── Navigation ──────────────────────────────────────────────────────────────
export type TabParamList = {
  Dashboard: undefined;
  MyWork: undefined;
  Attend: undefined;
  Projects: undefined;
  More: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  AssignmentDetail: { id: string };
  ProjectDetail: { id: string };
};

// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  initials: string;
  color: string;
}

// ─── Attendance ──────────────────────────────────────────────────────────────
export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Half Day' | 'Off' | 'Holiday' | 'Graced';

export interface AttendanceDay {
  date: string; // YYYY-MM-DD
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
  note?: string;
}

export interface AttendanceSummary {
  present: number;
  leave: number;
  absent: number;
  graced: number;
}

// ─── Leave ───────────────────────────────────────────────────────────────────
export interface LeaveBalance {
  type: string;
  used: number;
  total: number;
  color: string;
}

// ─── Events ──────────────────────────────────────────────────────────────────
export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  color: string;
  icon: string;
}

// ─── Assignments ─────────────────────────────────────────────────────────────
export type AssignmentType = 'Subtask' | 'Task' | 'Issue' | 'Bug';
export type AssignmentStatus = 'Not Started' | 'Ongoing' | 'Completed' | 'Overdue' | 'On Hold';

export interface Assignment {
  id: string;
  title: string;
  parentTask: string;
  type: AssignmentType;
  status: AssignmentStatus;
  dueDate: string;
  projectId: string;
  projectName: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

// ─── Projects ────────────────────────────────────────────────────────────────
export type ProjectStatus = 'Active' | 'Priority' | 'Completed' | 'Not Started' | 'Overdue';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  progress: number; // 0-100
  totalTasks: number;
  completedTasks: number;
  members: User[];
  description: string;
}

// ─── Approvals ───────────────────────────────────────────────────────────────
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';
export type ApprovalType = 'Leave' | 'Attendance' | 'Expense' | 'Travel';

export interface Approval {
  id: string;
  name: string;
  type: ApprovalType;
  date: string;
  status: ApprovalStatus;
  initials: string;
  color: string;
}

// ─── Summary ─────────────────────────────────────────────────────────────────
export interface SummaryItem {
  label: string;
  value: number | string;
  color: string;
  change?: string;
}

// ─── Modules ─────────────────────────────────────────────────────────────────
export interface Module {
  id: string;
  name: string;
  icon: string;
  color: string;
  badge?: number;
}
