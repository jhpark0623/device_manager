// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

type Data = {
  name: string;
  result?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { start, end } = req.query;

  if (!start) {
    start = "1";
    end = "5";
  } else if (!end) end = (Number(start) + 4).toString();

  if (Number(start) + 4 < Number(end)) end = (Number(start) + 4).toString();

  if (Number(start) >= Number(end)) end = (Number(start) + 4).toString();

  try {
    fetch(
      `http://tour.chungnam.go.kr/_prog/openapi/?func=tour&start=${start}&end=${end}`
    )
      .then((res) => res.text())
      .then((xmlStr) => {
        parseString(xmlStr, { explicitArray: false }, (err, obj) => {
          res.status(200).json({ name: "John Doe", result: obj });
        });
      });
  } catch (err) {
    res.status(500).json({ name: "John Doe" });
  }
}
