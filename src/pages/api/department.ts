import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/db/client";

type Data = {
  message: string;
  data: any;
  error: boolean;
};

async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { data: departments, error } = await supabase
    .from("departments")
    .select("*");

  if (error) {
    return res.status(200).json({
      message: "Internal Server Error",
      data: null,
      error: true,
    });
  }

  return res.status(200).json({
    message: "Success",
    data: departments,
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
