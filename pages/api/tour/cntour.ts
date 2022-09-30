// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

type Data = {
  name: string;
  totalCnt?: Number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch("https://tour.chungnam.go.kr/_prog/openapi/?func=tour&mode=getCnt")
      .then((res) => res.text())
      .then((xmlStr) => {
        parseString(xmlStr, { explicitArray: false }, (err, obj) => {
          const totalCnt = obj.item_info.item.totalCnt;

          res.status(200).json({ name: "John Doe", totalCnt });
        });
      });
  } catch (err) {
    res.status(500).json({ name: "John Doe" });
  }
}
