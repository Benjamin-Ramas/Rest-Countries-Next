import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { id: string } }){
    const data = await fetch(`https://restcountries.com/v3.1/name/${context.params.id}?fullText=true`);
    const posts: object = await data.json();
    return NextResponse.json({posts});
}