import { getCurrentUser } from '@/actions/getCurrentUser';
import { CartProductType } from '@/app/product/[productId]/ProdeucDetails';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
});

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity

        return acc + itemTotal;
    }, 0)
    
    return totalPrice;
}
export async function POST(request: Request){
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.json({error: "Chưa xác thực"}, {status: 401})
    }

    const body = await request.json()
    const {items, payment_intent_id} = body
    const total = calculateOrderAmount(items) * 100
    const orderData = {
        user: {connect: {id: currentUser.id}},
        amount: total,
        currency: 'vnd',
        status: "Chưa xử lý",
        deliveryStatus: "Chưa xử lý",
        paymentIntentId: payment_intent_id,
        products: items
    }

    if(payment_intent_id){
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

        if(current_intent) {
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id, {amount: total}
            )
            //update the order
    
            const [existing_order, update_order] = await Promise.all([
                prisma?.order.findFirst({
                    where: {paymentIntentId: payment_intent_id}
                }),
                prisma?.order.update({
                    where:{paymentIntentId: payment_intent_id},
                    data: {
                        amount: total,
                        products: items
                    }
                })
            ])
    
            if(existing_order){
                return NextResponse.json({error: 'Thanh toán không hợp lệ'}, {status:400})
            }
    
        return NextResponse.json({ paymentIntent: updated_intent });
        }
    }else{
        //create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'vnd',
            automatic_payment_methods: {enabled: true}
        })

        //create the order
        orderData.paymentIntentId = paymentIntent.id

        await prisma?.order.create({
            data: orderData,
        })
        return NextResponse.json({ paymentIntent });
    }
}