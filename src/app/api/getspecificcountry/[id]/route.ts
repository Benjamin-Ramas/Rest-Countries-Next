import { Params } from "next/dist/server/request/params";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: {params: Params}){
    const data = await fetch(`https://restcountries.com/v3.1/name/${context.params.id}?fullText=true`);
    const posts: object = await data.json();
    return NextResponse.json({posts});
}