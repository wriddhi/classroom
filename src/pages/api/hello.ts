import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/db/client";

type Data = {
  message: string;
  data: any;
  error: boolean;
};

async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { data: teachers, error } = await supabase.from("teacher").select("*");

  if (error) {
    return res.status(200).json({
      message: "Internal Server Error",
      data: null,
      error: true,
    });
  }

  if (teachers?.length === 0) {
    return res.status(200).json({
      message: "No teacher found",
      data: null,
      error: true,
    });
  }

  const { data: classes, error: classError } = await supabase
    .from("extra_classes")
    .select("*");

  if (classError) {
    return res.status(200).json({
      message: "Internal Server Error",
      data: null,
      error: true,
    });
  }

  if (classes?.length === 0) {
    return res.status(200).json({
      message: "No classes found",
      data: null,
      error: true,
    });
  }

  return res.status(200).json({
    message: "Classes fetched successfully",
    data: {
      teachers,
      classes,
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
