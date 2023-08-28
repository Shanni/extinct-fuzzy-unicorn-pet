import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const queryList = req.url.split("?")[1].split("&");
  const queryMap = new Map();
  queryList.forEach((item) => {
    const [key, value] = item.split("=");
    queryMap.set(key, value);
  });
  const fileName = queryMap.get("fileName");
  const file = fs.readFileSync(path.resolve(`./app/api/files/${fileName}`));

  const res = new Response(file);
  res.headers.set("Content-Type", "application/octet-stream");

  return res;
}
