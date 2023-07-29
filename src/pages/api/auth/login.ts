import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/db/client";
import { User } from "@/types";

type Data = {
    message: string;
    data: User | null;
    error: boolean;
};


async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id, password, role } = req.body;

    if (!id || !password || !role) {
        return res.status(400).json({
            message: "id, role and password are required",
            data: null,
            error: true,
        });
    }

    const { data: user, error } = await supabase.from("credentials").select("*").eq("id", id).eq("password", password).eq("role", role);

    if (error) {
        return res.status(200).json({
            message: "Internal Server Error",
            data: null,
            error: true,
        });
    }

    if (user?.length === 0) {
        return res.status(200).json({
            message: "Invalid credentials",
            data: null,
            error: true,
        });
    }

    const {data: userData, error: userError} = await supabase.from(user[0].role).select("*").eq("id", user[0].id);

    if (userError) {
        return res.status(200).json({
            message: "Internal Server Error",
            data: null,
            error: true,
        });
    }

    if (userData?.length === 0) {
        return res.status(200).json({
            message: "Invalid credentials",
            data: null,
            error: true,
        });
    }

    return res.status(200).json({
        message: "Login successful",
        data: {id: userData[0].id, name: userData[0].name, role: role},
        error: false,
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
    ) {
    switch (req.method) {
        case "POST":
        return POST(req, res);
        default:
        return res.status(405).json({
            message: "Method not allowed",
            data: null,
            error: true,
        });
    }
    }