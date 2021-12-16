import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function Posts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const createdPost = await prisma.post.create({
      data: JSON.parse(req.body),
    });

    res.status(201).send(createdPost);
    return;
  }

  res.status(405).send("method not allowed");
}
