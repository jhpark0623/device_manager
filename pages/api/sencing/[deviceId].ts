import { Sencing } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  value?: Number;
  postSencing?: Sencing;
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { deviceId } = req.query;
  if (!deviceId)
    return res.status(200).json({ ok: false, err: "장치ID를 입력해주세요." });

  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ ok: false, err: "잘못된 메소드입니다." });
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        const getSencing = await client.sencing.findFirst({
          where: {
            // 필터링
            deviceId: deviceId.toString(),
          },
          select: {
            // 필드를 선택하여 가져옴
            value: true,
          },
          orderBy: {
            // 정렬
            createAt: "desc",
          },
        });
        res.status(200).json({ ok: true, value: getSencing?.value });
        break;
      case "POST":
        const obj = JSON.parse(req.body).value;

        if (isNaN(obj))
          return res
            .status(500)
            .json({ ok: false, err: "숫자를 입력해주세요." });

        const value = Number(obj);

        const postSencing = await client.sencing.create({
          data: {
            value,
            deviceId: deviceId.toString(),
          },
        });
        res.status(200).json({ ok: true, postSencing });
        break;
    }
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  } finally {
    await client.$disconnect;
  }
}
