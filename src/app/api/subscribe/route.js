import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Subscriber from '@/models/Subscriber';

export async function POST(req) {
  try {
    await dbConnect();
    const subscription = await req.json();

    // Check if subscription already exists
    const existing = await Subscriber.findOne({ endpoint: subscription.endpoint });
    
    if (existing) {
      return NextResponse.json({ success: true, message: 'Already subscribed.' }, { status: 200 });
    }

    // Save to database
    await Subscriber.create(subscription);

    return NextResponse.json({ success: true, message: 'Subscription saved successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ success: false, error: 'Failed to subscribe.' }, { status: 500 });
  }
}
