import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  device?: Device;
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ ok: false, err: "잘못된 메소드입니다." });
      return;
    }

    const { productName, location, type, unit, memo } = JSON.parse(req.body);

    if (!productName)
      return res
        .status(200)
        .json({ ok: false, err: "제품명(productName)이 없습니다." });
    else if (!location)
      return res
        .status(200)
        .json({ ok: false, err: "설치위치(location)가 없습니다." });
    else if (!type)
      return res
        .status(200)
        .json({ ok: false, err: "장치종류(type)가 없습니다." });
    else if (!unit)
      return res.status(200).json({ ok: false, err: "단위(unit)가 없습니다." });

    const device = await client.device.create({
      data: {
        productName,
        location,
        type,
        unit,
        memo,
      },
    });
    console.log(device);
    res.status(200).json({ ok: true, device });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  } finally {
    await client.$disconnect;
  }
}
