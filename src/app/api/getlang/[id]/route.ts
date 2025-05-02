/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"

export async function GET(request: Request, context: any){
    const param = await context.params;
    const lang = await param.id;
    const res = await fetch(`https://restcountries.com/v3.1/lang/${lang}`);
    const posts = await res.json();
    return NextResponse.json(posts);
}