import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  device?: Device;
  deleteId?: String;
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.query.delete);
    const deleteDevice = await client.device.delete({
      where: { id: req.query.delete?.toString() },
    });
    console.log(deleteDevice);
    res.status(200).json({ ok: true, deleteId: deleteDevice.id });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  } finally {
    await client.$disconnect;
  }
}
