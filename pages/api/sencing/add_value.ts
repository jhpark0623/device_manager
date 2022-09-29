import { Sencing } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  sencing?: Sencing;
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

    const { value, deviceId } = JSON.parse(req.body);

    // if (!value)
    //   return res
    //     .status(200)
    //     .json({ ok: false, err: "제품명(productName)이 없습니다." });
    // else if (!deviceId)
    //   return res
    //     .status(200)
    //     .json({ ok: false, err: "설치위치(location)가 없습니다." });

    const sencing = await client.sencing.create({
      data: {
        value: Number(value),
        deviceId: deviceId,
      },
    });
    console.log(sencing);

    res.status(200).json({ ok: true, sencing });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  } finally {
    await client.$disconnect;
  }
}
