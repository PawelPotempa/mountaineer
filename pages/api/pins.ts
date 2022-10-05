import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const pinsData = JSON.parse(req.body);
      const savedPins = await prisma.pin.create({
        data: { ...pinsData },
      });
      res.status(200).json(savedPins);
    } catch (err) {
      res.status(400).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "DELETE") {
    const { name } = req.body;
    await prisma.pin.deleteMany({
      where: {
        name,
      },
    });
  }

  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
};
