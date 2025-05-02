import { NextResponse } from "next/server"

export async function GET(request: Request, context: any){
    const n = context.params.id;
    const res = await fetch(`https://restcountries.com/v3.1/lang/${n}`);
    const posts = await res.json();
    return NextResponse.json(posts);
}