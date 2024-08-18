import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodeToken: any = jwt.verify(token, process.env.SECRET_KEY!);
    return decodeToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
