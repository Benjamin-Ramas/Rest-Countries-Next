import { NextResponse } from "next/server"
import { Context } from "vm";

export async function GET(context: Context){
    console.log(`Contexts: ${context.params.id}`)
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${context.params.id}`);
    const posts = await res.json();
    return NextResponse.json(posts);
}