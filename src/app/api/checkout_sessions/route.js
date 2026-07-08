import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getUser } from '@/lib/session';


export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const user=await getUser()

        const PRICE_ID='price_1Tqw0PHT75yvwioqhJm0JZe4'

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email:user?.email,
            line_items: [
                {
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata:{
                priceId:PRICE_ID,
                userId:user.id,
                userEmail:user.email
            },
            mode: 'subscription',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
        });
        return NextResponse.redirect(session.url, 303)
        console.log(session,'session')
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}