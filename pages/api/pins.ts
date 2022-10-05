import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const pinsData = JSON.parse(req.body);

    const savedPins = await prisma.pin.create({
      data: { ...pinsData },
    });

    res.json(savedPins);
  }

  if (req.method === "DELETE") {
    const { name } = req.body;
    await prisma.pin.deleteMany({
      where: {
        name,
      },
    });
  }

  return res.send("Method not allowed");
};
