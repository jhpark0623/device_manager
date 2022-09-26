import type { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";
import client from "../../libs/server/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await client.user.create({
      data: { name: "박종훈", age: 20, addr: "서울" },
    });
    res.status(200).json({ name: "come" });
  } catch (err) {
    res.status(200).json({ name: "back" });
  }
}
