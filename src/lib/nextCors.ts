import NextCors from "nextjs-cors";
import type { NextApiRequest, NextApiResponse } from "next";

export const nextCors = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
};
