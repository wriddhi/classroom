import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/db/client";
import { TakenClass, AllotedClass, Teacher } from "@/types";

type Data = {
  message: string;
  data: { teachers: Teacher[]; taken: TakenClass[], alloted: AllotedClass[] };
  error: boolean;
};

async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  
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
