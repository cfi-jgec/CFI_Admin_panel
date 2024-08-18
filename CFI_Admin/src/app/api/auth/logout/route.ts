 
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try { 
        const response = NextResponse.json(
            { message: "log out successful" },
            { status: 200 }
        );
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error: any) {
        NextResponse.json({ message: error.message }, { status: 500 });
        console.log(error);
    }
}