export const roles = ["admin", "student"] as const;

export type Role = (typeof roles)[number];

export type User = {
  id: string;
  name: string;
  role: Role;
};

export type Teacher = {
  id: string;
  name: string;
  department: string;
  position: "half" | "full";
};

export type Student = {
    id: string;
    name: string;
    department: string;
    course: string;
    semester: number;
}

export type TakenClass = {
  id: string;
  department: string;
  semester: number;
  faculty: string;
  start_time: string;
  end_time: string;
  date: string;
  room: string;
  strength: number | null;
  subject: string;
};

export type AllotedClass = {
  id: string;
  department: string | null;
  course: string | null;
  semester: number | null;
  subject: string | null;
  faculty: string | null;
  start_time: string | null;
  end_time: string | null;
  date: string | null;
  section: string | null;
  room: string | null;
  mode: "online" | "offline";
};

export type Attendance = {
    class: string;
    student: string;
    entry_time: string;
    exit_time: string;
    status: string;
}