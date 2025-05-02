/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"

export async function GET(request: Request, context: any){
    const param = await context.params;
    const code = await param.id;
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const posts = await res.json();
    return NextResponse.json(posts);
}