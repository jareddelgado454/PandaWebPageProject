import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
    const stripe = new Stripe(process.env.SECRET_KEY_STRIPE);
    const prices = await stripe.prices.list();
    return NextResponse.json(prices.data)
}