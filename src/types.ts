export type Role = 'admin' | 'faculty' | 'student';

export interface Department {
  id: string;
  name: string;
  code: string;
  hod: string;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  department: string;
  course: string;
  semester: string;
  year: number;
  status: 'active' | 'inactive';
}

export interface FacultyMember {
  id: string;
  name: string;
  facultyId: string;
  email: string;
  department: string;
  designation: string;
  status: 'active' | 'inactive';
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  department: string;
}

export interface Examination {
  id: string;
  name: string;
  type: string;
  department: string;
  semester: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'exam' | 'hall' | 'result' | 'schedule' | 'system';
  unread: boolean;
}

export interface ResultItem {
  id: string;
  examName: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  status: 'pass' | 'fail';
  published: boolean;
}
