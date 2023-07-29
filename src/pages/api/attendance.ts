import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/db/client";
import { TakenClass, Student, Attendance } from "@/types";

type Data = {
  message: string;
  data: any;
  error: boolean;
};

async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!id) {
    return res.status(200).json({
      message: "Invalid query params",
      data: null,
      error: true,
    });
  }

  const { data: studentData, error: studentError } = await supabase
    .from("student")
    .select("*")
    .eq("id", id)
    .returns<Student[]>();

  if (studentError) {
    return res.status(200).json({
      message: "Error while fetching student",
      data: null,
      error: true,
    });
  }

  //   const classQuery = supabase.from("classes").select("id");

  //   if (student) {
  //     classQuery.eq("student", student);
  //   }

  //   if (subject) {
  //     classQuery.eq("subject", subject);
  //   }

  //   if (course) {
  //     classQuery.eq("course", course);
  //   }

  //   if (semester) {
  //     classQuery.eq("semester", semester);
  //   }

  //   const { data: allClasses, error } = await classQuery;

  //   if (error) {
  //     return res.status(200).json({
  //       message: "Error while fetching classes",
  //       data: null,
  //       error: true,
  //     });
  //   }

  //   let attendedClasses = [];

  //   for (let i = 0; i < allClasses.length; i++) {
  //     const { data: attendance, error } = await supabase
  //       .from("attendance")
  //       .select("*")
  //       .eq("class", allClasses[i].id)
  //       .eq("student", student);
  //     if (error) {
  //       return res.status(200).json({
  //         message: "Error while fetching teacher",
  //         data: null,
  //         error: true,
  //       });
  //     }
  //     if (attendance.length > 0) {
  //       attendedClasses.push(allClasses[i]);
  //     }
  //   }
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
