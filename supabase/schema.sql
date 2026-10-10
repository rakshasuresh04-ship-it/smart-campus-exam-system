CREATE TYPE public.app_role AS ENUM ('admin', 'faculty', 'student');

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role public.app_role NOT NULL DEFAULT 'student',
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  code text NOT NULL UNIQUE,
  hod_id uuid REFERENCES public.profiles(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  department_id uuid NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  duration_years integer NOT NULL CHECK (duration_years > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.semesters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  number integer NOT NULL CHECK (number > 0),
  academic_year text NOT NULL,
  UNIQUE (number, academic_year)
);

CREATE TABLE IF NOT EXISTS public.subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  credits integer NOT NULL CHECK (credits > 0),
  department_id uuid REFERENCES public.departments(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL UNIQUE,
  profile_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  department_id uuid REFERENCES public.departments(id),
  course_id uuid REFERENCES public.courses(id),
  semester_id uuid REFERENCES public.semesters(id),
  enrollment_year integer NOT NULL CHECK (enrollment_year > 2000),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id text NOT NULL UNIQUE,
  profile_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  department_id uuid REFERENCES public.departments(id),
  designation text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.subject_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id uuid NOT NULL REFERENCES public.faculty(id) ON DELETE CASCADE,
  subject_id uuid NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  academic_year text NOT NULL,
  UNIQUE (faculty_id, subject_id, academic_year)
);

CREATE TABLE IF NOT EXISTS public.student_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id uuid NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  semester_id uuid NOT NULL REFERENCES public.semesters(id) ON DELETE CASCADE,
  academic_year text NOT NULL,
  UNIQUE (student_id, subject_id, semester_id, academic_year)
);

CREATE TABLE IF NOT EXISTS public.examinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  examination_type text NOT NULL CHECK (examination_type IN ('Midterm', 'Endterm', 'Practical', 'Supplementary')),
  academic_year text NOT NULL,
  semester_id uuid REFERENCES public.semesters(id),
  subject_id uuid REFERENCES public.subjects(id),
  exam_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  max_marks integer NOT NULL CHECK (max_marks > 0),
  passing_marks integer NOT NULL CHECK (passing_marks > 0),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  created_by uuid REFERENCES public.profiles(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (end_time > start_time)
);

CREATE TABLE IF NOT EXISTS public.exam_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  examination_id uuid NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
  eligible boolean NOT NULL DEFAULT true,
  registered_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, examination_id)
);

CREATE TABLE IF NOT EXISTS public.examination_halls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  building text NOT NULL,
  room_number text NOT NULL,
  capacity integer NOT NULL CHECK (capacity > 0),
  available boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.seat_allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  examination_id uuid NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  hall_id uuid NOT NULL REFERENCES public.examination_halls(id) ON DELETE CASCADE,
  seat_number text NOT NULL,
  row_label text,
  status text NOT NULL DEFAULT 'allocated' CHECK (status IN ('allocated', 'manual_override', 'reassigned')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (examination_id, student_id),
  UNIQUE (examination_id, hall_id, seat_number)
);

CREATE TABLE IF NOT EXISTS public.invigilation_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  examination_id uuid NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
  faculty_id uuid NOT NULL REFERENCES public.faculty(id) ON DELETE CASCADE,
  hall_id uuid NOT NULL REFERENCES public.examination_halls(id) ON DELETE CASCADE,
  duty_role text NOT NULL DEFAULT 'Invigilator' CHECK (duty_role IN ('Invigilator', 'Chief Invigilator', 'Support')),
  assigned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (examination_id, faculty_id, hall_id)
);

CREATE TABLE IF NOT EXISTS public.marks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  examination_id uuid NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  marks_obtained numeric(5,2) NOT NULL CHECK (marks_obtained >= 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'reviewed', 'published')),
  entered_by uuid REFERENCES public.profiles(id),
  entered_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (examination_id, student_id)
);

CREATE TABLE IF NOT EXISTS public.results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  examination_id uuid NOT NULL REFERENCES public.examinations(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  total_marks numeric(5,2) NOT NULL,
  grade text,
  pass boolean NOT NULL,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  UNIQUE (examination_id, student_id)
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id uuid REFERENCES public.profiles(id),
  title text NOT NULL,
  message text NOT NULL,
  category text NOT NULL DEFAULT 'general' CHECK (category IN ('exam', 'hall', 'result', 'schedule', 'system')),
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  performed_by uuid REFERENCES public.profiles(id),
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_students_department ON public.students(department_id);
CREATE INDEX IF NOT EXISTS idx_faculty_department ON public.faculty(department_id);
CREATE INDEX IF NOT EXISTS idx_exams_date ON public.examinations(exam_date);
CREATE INDEX IF NOT EXISTS idx_calendars_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id, is_read);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.examination_halls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seat_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invigilation_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by owner or admin" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Profiles can update own record" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins manage departments" ON public.departments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Students and faculty can read relevant academic data" ON public.subjects
  FOR SELECT USING (true);

CREATE POLICY "Students can read own record" ON public.students
  FOR SELECT USING (
    auth.uid() = profile_id OR EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Faculty can read assigned records" ON public.faculty
  FOR SELECT USING (
    auth.uid() = profile_id OR EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins manage examinations" ON public.examinations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Students can read their exam registrations" ON public.exam_registrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.students s WHERE s.id = exam_registrations.student_id AND s.profile_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins manage hall allocations" ON public.seat_allocations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Students can read their own results" ON public.results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.students s WHERE s.id = results.student_id AND s.profile_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Notification access is recipient-only or admin" ON public.notifications
  FOR SELECT USING (
    recipient_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins manage audit logs" ON public.audit_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', new.email), 'student');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
