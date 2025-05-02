/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any){
    const param = await context.params;
    const name = await param.id;
    const data = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    const posts: object = await data.json();
    return NextResponse.json({posts});
}