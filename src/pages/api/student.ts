import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/db/client";
import { Student, TakenClass, Attendance } from "@/types";

type Data = {
  message: string;
  data: {
    student: Student;
    total: TakenClass[];
    attendance: Attendance[];
  } | null;
  error: boolean;
};

async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query as { id: string };

  if (!id) {
    return res.status(400).json({
      message: "id parameter is required",
      data: null,
      error: true,
    });
  }

  const { data: student, error } = await supabase
    .from("student")
    .select("*")
    .eq("id", id)
    .returns<Student[]>()
    .single();

  if (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: null, error: true });
  }

  if (!student) {
    return res
      .status(404)
      .json({ message: "Student not found", data: null, error: true });
  }

  const { data: validClasses, error: classError } = await supabase
    .from("classes")
    .select("*")
    .eq("semester", student.semester)
    .eq("department", student.department)
    .eq("course", student.course)
    .returns<TakenClass[]>();

  const { data: attendance, error: attendanceError } = await supabase
    .from("attendance")
    .select("*")
    .eq("student", student.id)
    .returns<Attendance[]>();

  if (classError || attendanceError || !validClasses || !attendance) {
    return res.status(500).json({
      message: "Something went wrong",
      data: null,
      error: true,
    });
  }

  return res.status(200).json({
    message: "Student found",
    data: {
      student: student,
      total: validClasses,
      attendance: attendance,
    },
    error: false,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    default:
      return res.status(405).json({
        message: "Method not allowed",
        data: null,
        error: true,
      });
  }
}
