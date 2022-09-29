import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  device?: Device[];
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, err: "잘못된 메소드입니다." });
    return;
  }

  try {
    const device = await client.device.findMany();
    res.status(200).json({ ok: true, device });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  } finally {
    await client.$disconnect;
  }
}
