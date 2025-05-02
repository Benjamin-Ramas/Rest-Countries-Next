import { NextResponse } from "next/server";
import { Context } from "vm";

export async function GET(context: Context){
    const data = await fetch(`https://restcountries.com/v3.1/name/${context.params.id}?fullText=true`);
    const posts: object = await data.json();
    return NextResponse.json({posts});
}