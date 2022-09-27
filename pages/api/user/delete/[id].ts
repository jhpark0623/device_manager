import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";

type Data = {
  ok: boolean;
  deletedId?: String;
  user?: User;
  err?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.query.id);
    const deleteUser = await client.user.delete({
      where: { id: req.query.id?.toString() },
    });
    console.log(deleteUser);
    res.status(200).json({ ok: true, deletedId: deleteUser.id });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  }
}
