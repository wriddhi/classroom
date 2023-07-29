import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/db/client";
import { TakenClass, AllotedClass, Teacher } from "@/types";

type Data = {
  message: string;
  data: { teachers: Teacher[]; taken: TakenClass[], alloted: AllotedClass[] };
  error: boolean;
};

async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { data: teachers, error: teachersError } = await supabase
    .from("teacher")
    .select("*");
  const { data: alloted, error: classError } = await supabase
    .from("extra_classes")
    .select("*");
  const { data: taken, error: takenError } = await supabase
    .from("classes")
    .select("*");

  if (teachersError || classError || takenError) {
    return res.status(500).json({
      message: "Something went wrong",
      data: {
        teachers: [],
        taken: [],
        alloted: [],
      },
      error: true,
    });
  }

    return res.status(200).json({
        message: "Success",
        data: {
            teachers: teachers || [],
            taken: taken || [],
            alloted: alloted || [],
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
