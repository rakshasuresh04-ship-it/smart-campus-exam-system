export const sampleData = {
  stats: {
    students: 1268,
    faculty: 124,
    subjects: 96,
    exams: 42,
  },
  trendData: [
    { month: 'Jan', exams: 12 },
    { month: 'Feb', exams: 18 },
    { month: 'Mar', exams: 16 },
    { month: 'Apr', exams: 20 },
    { month: 'May', exams: 24 },
    { month: 'Jun', exams: 30 },
  ],
  recentActivities: [
    { id: 'a1', title: 'Midterm timetable published', time: '12 minutes ago' },
    { id: 'a2', title: 'Hall allocation changed for CSE-204', time: '1 hour ago' },
    { id: 'a3', title: 'Faculty assignment synced', time: '3 hours ago' },
    { id: 'a4', title: 'Result publication approval pending', time: 'Today' },
  ],
  students: [
    { id: 's1', name: 'Meera Nair', studentId: 'STU-2048', email: 'meera@campus.edu', department: 'Computer Science', course: 'B.Tech', semester: 'Semester 6', year: 2024, status: 'active' },
    { id: 's2', name: 'Karan Verma', studentId: 'STU-2049', email: 'karan@campus.edu', department: 'Electronics', course: 'B.Tech', semester: 'Semester 6', year: 2024, status: 'active' },
    { id: 's3', name: 'Aisha Khan', studentId: 'STU-2050', email: 'aisha@campus.edu', department: 'Computer Science', course: 'M.Tech', semester: 'Semester 2', year: 2023, status: 'inactive' },
    { id: 's4', name: 'Rohit Das', studentId: 'STU-2051', email: 'rohit@campus.edu', department: 'Mechanical', course: 'B.E.', semester: 'Semester 8', year: 2022, status: 'active' },
  ],
  faculty: [
    { id: 'f1', name: 'Dr. Nisha Rao', facultyId: 'FAC-1001', email: 'nisha@campus.edu', department: 'Computer Science', designation: 'Professor', status: 'active', assignedSubjects: 'Operating Systems, DBMS' },
    { id: 'f2', name: 'Prof. Sandeep Kumar', facultyId: 'FAC-1002', email: 'sandeep@campus.edu', department: 'Electronics', designation: 'Associate Professor', status: 'active', assignedSubjects: 'Signals, DSP' },
    { id: 'f3', name: 'Dr. Salma Ali', facultyId: 'FAC-1003', email: 'salma@campus.edu', department: 'Business', designation: 'Assistant Professor', status: 'inactive', assignedSubjects: 'Economics, Research' },
  ],
  exams: [
    { id: 'e1', name: 'Mid Semester Exam', type: 'Midterm', department: 'Computer Science', semester: 'Semester 6', subject: 'DBMS', date: '2026-11-12', startTime: '09:00', endTime: '10:30', duration: 90, status: 'published' },
    { id: 'e2', name: 'End Semester Exam', type: 'Endterm', department: 'Electronics', semester: 'Semester 6', subject: 'Signals', date: '2026-11-14', startTime: '11:00', endTime: '12:30', duration: 90, status: 'draft' },
    { id: 'e3', name: 'Practical Lab', type: 'Practical', department: 'Computer Science', semester: 'Semester 5', subject: 'Operating Systems', date: '2026-11-17', startTime: '14:00', endTime: '16:00', duration: 120, status: 'completed' },
  ],
  timetable: [
    { id: 't1', date: '2026-11-12', course: 'B.Tech CSE', subject: 'DBMS', hall: 'Block A - Room 204', time: '09:00 - 10:30', conflict: false },
    { id: 't2', date: '2026-11-12', course: 'B.Tech ECE', subject: 'Signals', hall: 'Block C - Room 120', time: '09:00 - 10:30', conflict: true },
    { id: 't3', date: '2026-11-14', course: 'B.Tech CSE', subject: 'Operating Systems', hall: 'Block B - Lab 1', time: '11:00 - 12:30', conflict: false },
  ],
  halls: [
    { id: 'h1', name: 'Main Hall 1', building: 'Academic Block A', capacity: 120, available: true },
    { id: 'h2', name: 'Room 204', building: 'Academic Block B', capacity: 70, available: true },
    { id: 'h3', name: 'Lab 1', building: 'Innovation Hub', capacity: 40, available: false },
  ],
  seatAllocations: [
    { id: 'sa1', student: 'Meera Nair', hall: 'Main Hall 1', seat: 'A-12', status: 'Allocated' },
    { id: 'sa2', student: 'Karan Verma', hall: 'Main Hall 1', seat: 'A-13', status: 'Allocated' },
    { id: 'sa3', student: 'Rohit Das', hall: 'Room 204', seat: 'B-09', status: 'Manual override' },
  ],
  results: [
    { id: 'r1', examName: 'DBMS Midterm', student: 'Meera Nair', marks: 84, maxMarks: 100, grade: 'A', status: 'pass' },
    { id: 'r2', examName: 'Signals Midterm', student: 'Karan Verma', marks: 63, maxMarks: 100, grade: 'B', status: 'pass' },
    { id: 'r3', examName: 'Operating Systems Lab', student: 'Aisha Khan', marks: 48, maxMarks: 100, grade: 'C', status: 'fail' },
  ],
  notifications: [
    { id: 'n1', title: 'Timetable publication', message: 'Your exam timetable has been published for Semester 6.', time: '2 min ago', unread: true },
    { id: 'n2', title: 'Hall ticket is ready', message: 'Hall tickets are now available for download.', time: '1 hour ago', unread: false },
    { id: 'n3', title: 'Seating allocation updated', message: 'Your seating plan has been revised for DBMS.', time: 'Today', unread: false },
  ],
};
