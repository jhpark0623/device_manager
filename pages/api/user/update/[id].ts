import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";

type Data = {
  ok: boolean;
  user?: User;
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.method);
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ ok: false, err: "지원하지 않는 메서드입니다." });

  try {
    if (!JSON.parse(req.body).name)
      return res.status(200).json({ ok: false, err: "이름을 입력하세요" });

    const updateUser = await client.user.update({
      where: {
        id: req.query.id?.toString(),
      },
      data: {
        name: JSON.parse(req.body).name,
      },
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  } finally {
    await client.$disconnect;
  }
}
