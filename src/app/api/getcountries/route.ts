/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"

export async function GET(){
    const data = await fetch('https://restcountries.com/v3.1/all');
    const posts: object = await data.json();
    return(NextResponse.json(posts));
}