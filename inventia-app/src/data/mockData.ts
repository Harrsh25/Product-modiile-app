import {
  Approval, Assignment, AttendanceDay, AttendanceSummary,
  CalendarEvent, LeaveBalance, Module, Project, User,
} from '../types';

// ─── Current User ────────────────────────────────────────────────────────────
export const CURRENT_USER: User = {
  id: 'u1', name: 'Harrsh', role: 'Produce Engineer',
  avatar: '', initials: 'H', color: '#4A6CF7',
};

// ─── Team Members ────────────────────────────────────────────────────────────
export const USERS: User[] = [
  { id: 'u1', name: 'Harrsh',     role: 'Engineer',   avatar: '', initials: 'H',  color: '#4A6CF7' },
  { id: 'u2', name: 'Rahul Verma',role: 'Manager',    avatar: '', initials: 'RV', color: '#8B5CF6' },
  { id: 'u3', name: 'Sara Pati',  role: 'Designer',   avatar: '', initials: 'SP', color: '#22C55E' },
  { id: 'u4', name: 'Vijay Shetty',role: 'Developer', avatar: '', initials: 'VS', color: '#F59E0B' },
  { id: 'u5', name: 'Priya Nair', role: 'QA',         avatar: '', initials: 'PN', color: '#EC4899' },
  { id: 'u6', name: 'Amit Shah',  role: 'DevOps',     avatar: '', initials: 'AS', color: '#14B8A6' },
];

// ─── Leave Balances ───────────────────────────────────────────────────────────
export const LEAVE_BALANCES: LeaveBalance[] = [
  { type: 'Annual Leave',   used: 5,  total: 21, color: '#4A6CF7' },
  { type: 'Sick Leave',     used: 2,  total: 10, color: '#22C55E' },
  { type: 'Casual Leave',   used: 1,  total: 6,  color: '#F59E0B' },
];

// ─── Events ──────────────────────────────────────────────────────────────────
export const UPCOMING_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Client Meeting', time: '10:00 AM', date: 'Today, May 19', color: '#4A6CF7', icon: 'people-outline' },
  { id: 'e2', title: 'Design Review',  time: '2:00 PM',  date: 'Today, May 19', color: '#8B5CF6', icon: 'color-palette-outline' },
  { id: 'e3', title: 'Sprint Planning',time: '11:00 AM', date: 'Tomorrow',      color: '#22C55E', icon: 'git-branch-outline' },
];

// ─── Assignments ──────────────────────────────────────────────────────────────
export const ASSIGNMENTS: Assignment[] = [
  { id: 'a1',  title: 'Requirement Gathering',   parentTask: 'HR Orbit',              type: 'Subtask', status: 'Not Started', dueDate: '1 May',  projectId: 'p2', projectName: 'HR Orbit Development',        priority: 'High'     },
  { id: 'a2',  title: 'HR orbit',                parentTask: 'Requirement Gathering', type: 'Task',    status: 'Ongoing',     dueDate: '20 Jun', projectId: 'p2', projectName: 'HR Orbit Development',        priority: 'High'     },
  { id: 'a3',  title: 'Leave and absence',       parentTask: 'Requirement Gathering', type: 'Subtask', status: 'Ongoing',     dueDate: '19 Apr', projectId: 'p2', projectName: 'HR Orbit Development',        priority: 'Medium'   },
  { id: 'a4',  title: 'Final submission',        parentTask: 'HR Orbit - Work list',  type: 'Subtask', status: 'Completed',   dueDate: '19 Apr', projectId: 'p2', projectName: 'HR Orbit Development',        priority: 'High'     },
  { id: 'a5',  title: 'Accommodate Changes',     parentTask: 'Final submission - Work list', type: 'Subtask', status: 'Ongoing', dueDate: '8 Jun', projectId: 'p2', projectName: 'HR Orbit Development', priority: 'Medium'   },
  { id: 'a6',  title: 'Review',                  parentTask: 'Accommodate Changes - Final submission', type: 'Subtask', status: 'Ongoing', dueDate: '4 Jun', projectId: 'p2', projectName: 'HR Orbit Development', priority: 'Low' },
  { id: 'a7',  title: 'Productivity orbit',      parentTask: 'Requirement Gathering', type: 'Subtask', status: 'Not Started', dueDate: '20 Jun', projectId: 'p3', projectName: 'Productivity Suite',          priority: 'High'     },
  { id: 'a8',  title: 'Attendance',              parentTask: 'Productivity orbit - Requirement Gathering', type: 'Subtask', status: 'Not Started', dueDate: '19 Apr', projectId: 'p3', projectName: 'Productivity Suite', priority: 'Medium' },
  { id: 'a9',  title: 'Final submission',        parentTask: 'Attendance - Productivity orbit', type: 'Subtask', status: 'Not Started', dueDate: '19 Jun', projectId: 'p3', projectName: 'Productivity Suite', priority: 'High' },
  { id: 'a10', title: 'Accommodate Changes',     parentTask: 'Final submission - Work list', type: 'Subtask', status: 'Not Started', dueDate: '8 Jun', projectId: 'p3', projectName: 'Productivity Suite',    priority: 'Medium'   },
  { id: 'a11', title: 'Review',                  parentTask: 'Accommodate Changes - Final submission', type: 'Subtask', status: 'Ongoing', dueDate: '4 Jun', projectId: 'p3', projectName: 'Productivity Suite', priority: 'Low'   },
  { id: 'a12', title: 'Project planning and management', parentTask: 'Productivity orbit', type: 'Subtask', status: 'Completed', dueDate: '19 Jun', projectId: 'p4', projectName: 'Activity Orbit Platform', priority: 'Critical' },
  { id: 'a13', title: 'Accommodate Changes',     parentTask: 'Project planning and management', type: 'Subtask', status: 'Not Started', dueDate: '8 Jun', projectId: 'p4', projectName: 'Activity Orbit Platform', priority: 'High' },
  { id: 'a14', title: 'Final submission',        parentTask: 'Accommodate Changes - Work list', type: 'Subtask', status: 'Completed', dueDate: '19 Jun', projectId: 'p4', projectName: 'Activity Orbit Platform', priority: 'High' },
  { id: 'a15', title: 'Activity orbit',          parentTask: 'Requirement Gathering', type: 'Task',    status: 'Completed',   dueDate: '22 Jun', projectId: 'p4', projectName: 'Activity Orbit Platform',   priority: 'High'     },
  { id: 'a16', title: 'Cost center',             parentTask: 'Activity orbit - Requirement Gathering', type: 'Subtask', status: 'Ongoing', dueDate: '10 Jun', projectId: 'p4', projectName: 'Activity Orbit Platform', priority: 'Medium' },
  { id: 'a17', title: 'Final submission',        parentTask: 'Cost center - Activity orbit', type: 'Subtask', status: 'Ongoing', dueDate: '10 Jun', projectId: 'p4', projectName: 'Activity Orbit Platform', priority: 'High' },
  { id: 'a18', title: 'Accommodate Changes',     parentTask: 'Final submission - Work list', type: 'Subtask', status: 'Completed', dueDate: '8 Jun', projectId: 'p4', projectName: 'Activity Orbit Platform', priority: 'Medium' },
  { id: 'a19', title: 'Tower schedule',          parentTask: 'Activity orbit',        type: 'Subtask', status: 'Overdue',     dueDate: '19 Apr', projectId: 'p4', projectName: 'Activity Orbit Platform',   priority: 'Critical' },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'p1', name: 'Office Relocation Project', status: 'Active',
    startDate: 'Jan 19', endDate: 'Feb 24, 2025', progress: 68,
    totalTasks: 12, completedTasks: 8, description: 'Relocate office facilities',
    members: [USERS[0], USERS[1], USERS[2], USERS[3]],
  },
  {
    id: 'p2', name: 'HR Orbit Development', status: 'Priority',
    startDate: 'Dec 18', endDate: 'Feb 24, 2025', progress: 100,
    totalTasks: 18, completedTasks: 18, description: 'HR management system development',
    members: [USERS[0], USERS[1], USERS[4]],
  },
  {
    id: 'p3', name: 'Productivity Suite', status: 'Active',
    startDate: 'Mar 15', endDate: 'May 30, 2025', progress: 45,
    totalTasks: 20, completedTasks: 9, description: 'Productivity tools development',
    members: [USERS[0], USERS[2], USERS[3], USERS[5]],
  },
  {
    id: 'p4', name: 'Activity Orbit Platform', status: 'Active',
    startDate: 'Apr 1', endDate: 'Jun 15, 2025', progress: 30,
    totalTasks: 25, completedTasks: 8, description: 'Activity tracking platform',
    members: [USERS[1], USERS[3], USERS[4]],
  },
];

// ─── Approvals ────────────────────────────────────────────────────────────────
export const APPROVALS: Approval[] = [
  { id: 'ap1', name: 'Rahul Verma', type: 'Leave',      date: 'May 20-22', status: 'Pending', initials: 'RV', color: '#8B5CF6' },
  { id: 'ap2', name: 'Sara Pati',  type: 'Attendance',  date: 'Regularization', status: 'Pending', initials: 'SP', color: '#22C55E' },
  { id: 'ap3', name: 'Vijay Shetty',type: 'Expense',   date: 'Submitted Apr 24', status: 'Pending', initials: 'VS', color: '#F59E0B' },
];

// ─── Attendance Data ──────────────────────────────────────────────────────────
export const ATTENDANCE_HISTORY: AttendanceDay[] = [
  { date: '2026-05-19', checkIn: '08:30 am', checkOut: '06:05 pm', status: 'Present' },
  { date: '2026-05-18', checkIn: null,        checkOut: null,       status: 'Off'     },
  { date: '2026-05-17', checkIn: null,        checkOut: null,       status: 'Off'     },
  { date: '2026-05-16', checkIn: '08:30 am', checkOut: '06:13 pm', status: 'Present' },
  { date: '2026-05-15', checkIn: '08:30 am', checkOut: '06:18 pm', status: 'Present' },
  { date: '2026-05-14', checkIn: '07:27 pm', checkOut: '10:37 pm', status: 'Half Day'},
  { date: '2026-05-13', checkIn: '08:30 am', checkOut: '06:05 pm', status: 'Present' },
  { date: '2026-05-12', checkIn: '08:30 am', checkOut: '06:05 pm', status: 'Present' },
  { date: '2026-05-11', checkIn: null,        checkOut: null,       status: 'Off'     },
  { date: '2026-05-10', checkIn: null,        checkOut: null,       status: 'Off'     },
  { date: '2026-05-09', checkIn: '08:30 am', checkOut: '06:05 pm', status: 'Present' },
  { date: '2026-05-08', checkIn: '08:30 am', checkOut: '06:05 pm', status: 'Present' },
  { date: '2026-05-07', checkIn: '08:30 am', checkOut: '06:05 pm', status: 'Present' },
  { date: '2026-05-06', checkIn: '08:30 am', checkOut: '06:05 pm', status: 'Present' },
  { date: '2026-05-05', checkIn: '09:10 am', checkOut: '05:50 pm', status: 'Late'    },
  { date: '2026-05-04', checkIn: null,        checkOut: null,       status: 'Absent'  },
  { date: '2026-05-03', checkIn: null,        checkOut: null,       status: 'Off'     },
  { date: '2026-05-02', checkIn: null,        checkOut: null,       status: 'Off'     },
  { date: '2026-05-01', checkIn: '08:30 am', checkOut: '06:05 pm', status: 'Present' },
];

export const ATTENDANCE_SUMMARY: AttendanceSummary = {
  present: 15,
  leave: 0,
  absent: 4,
  graced: 2,
};

// days in May 2026 with status for calendar dots
export const CALENDAR_DOT_MAP: Record<number, AttendanceDay['status']> = {
  1: 'Present', 2: 'Off', 3: 'Off', 4: 'Absent', 5: 'Late',
  6: 'Present', 7: 'Present', 8: 'Present', 9: 'Present', 10: 'Off',
  11: 'Off', 12: 'Present', 13: 'Present', 14: 'Half Day', 15: 'Present',
  16: 'Present', 17: 'Off', 18: 'Off', 19: 'Present',
};

// ─── Modules ──────────────────────────────────────────────────────────────────
export const ALL_MODULES: Module[] = [
  { id: 'm1',  name: 'Approvals',   icon: 'checkmark-circle-outline', color: '#8B5CF6' },
  { id: 'm2',  name: 'Projects',    icon: 'folder-outline',           color: '#4A6CF7' },
  { id: 'm3',  name: 'Documents',   icon: 'document-text-outline',    color: '#6B7280' },
  { id: 'm4',  name: 'Shifts',      icon: 'calendar-outline',         color: '#F59E0B' },
  { id: 'm5',  name: 'Timesheet',   icon: 'time-outline',             color: '#EF4444' },
  { id: 'm6',  name: 'Payroll',     icon: 'cash-outline',             color: '#22C55E' },
  { id: 'm7',  name: 'Travel',      icon: 'airplane-outline',         color: '#3B82F6' },
  { id: 'm8',  name: 'Performance', icon: 'trending-up-outline',      color: '#A855F7' },
  { id: 'm9',  name: 'Communicate', icon: 'mail-outline',             color: '#F97316' },
  { id: 'm10', name: 'Directory',   icon: 'people-outline',           color: '#14B8A6' },
  { id: 'm11', name: 'Manager Hub', icon: 'briefcase-outline',        color: '#6366F1' },
  { id: 'm12', name: 'My Wallet',   icon: 'wallet-outline',           color: '#EC4899' },
  { id: 'm13', name: 'Skills',      icon: 'ribbon-outline',           color: '#8B5CF6' },
  { id: 'm14', name: 'Wellness',    icon: 'heart-outline',            color: '#EF4444' },
  { id: 'm15', name: 'Analytics',   icon: 'bar-chart-outline',        color: '#4A6CF7' },
  { id: 'm16', name: 'Profile',     icon: 'person-outline',           color: '#6B7280' },
];

// ─── Dashboard Summary ────────────────────────────────────────────────────────
export const DASHBOARD_SUMMARY = {
  tasks:    { value: 5,  label: 'Tasks',    change: '+4 since',   color: '#4A6CF7' },
  meetings: { value: 2,  label: 'Meeting',  change: '',           color: '#EF4444' },
  overdue:  { value: 4,  label: 'Overdue',  change: '+1 As now',  color: '#EF4444' },
  hrTask:   { value: 1,  label: 'HR Task',  change: 'HR this week',color: '#22C55E' },
};

export const ANNOUNCEMENTS = [
  { id: 'an1', title: 'Mandatory Safety Training — All Sites', tag: 'Action required', date: 'May 19', color: '#EF4444' },
  { id: 'an2', title: 'New Leave Policy — Effective May 1',   tag: '',               date: 'May 19', color: '#4A6CF7' },
];
