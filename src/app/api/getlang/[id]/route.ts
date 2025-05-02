import { NextResponse } from "next/server"
import { Context } from "vm";

export async function GET(context: Context){
    const n = context.params.id;
    const res = await fetch(`https://restcountries.com/v3.1/lang/${n}`);
    const posts = await res.json();
    return NextResponse.json(posts);
}