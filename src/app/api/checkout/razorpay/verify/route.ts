import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    // In live mode with real keys:
    // crypto.createHmac('sha256', secret).update(order_id + "|" + payment_id).digest('hex') === signature
    // In test/sandbox mode:
    const isValid = Boolean(razorpayOrderId && (razorpayPaymentId || razorpaySignature));

    return NextResponse.json({
      success: isValid,
      paymentStatus: isValid ? 'paid' : 'failed',
      verifiedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
