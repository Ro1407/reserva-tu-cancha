import { NextRequest } from "next/server";
import { processPayment } from "@/lib/payments";
import { createHmac } from 'crypto';

export async function POST(request: NextRequest): Promise<Response> {
  const signature = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");
  const body: any = await request.json();

  if (!signature || !requestId || !body.data || !body.data.id) {
    return new Response( null, { status: 400 });
  }

  const paymentId = body.data.id.toString();

  if (!validateWebhookSignature(signature, requestId, paymentId)) {
    return new Response( null, { status: 401 });
  }

  await processPayment(body.data.id);
  return new Response(null, { status: 200 });
}


function validateWebhookSignature( signature: string, requestId: string, resourceId: string): boolean {
  const WEBHOOK_SECRET = process.env.MERCADO_PAGO_SECRET_KEY

  // Make sure the env variable exists
  if (!WEBHOOK_SECRET) {
    console.error('MERCADO_PAGO_SECRET_KEY no configurado');
    return false;
  }

  // Obtain ts and v1 from the header
  const headerAttributes = signature.split(',');
  let ts = undefined, hash = undefined

  headerAttributes.forEach((headerAttribute) => {
    // Split each part into key and value
    const [key, value] = headerAttribute.split('=');
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === 'ts') {
        ts = trimmedValue;
      } else if (trimmedKey === 'v1') {
        hash = trimmedValue;
      }
    }
  })

  if (!hash || !ts) return false

  //Generate the manifest string
  const manifest = `id:${resourceId};request-id:${requestId};ts:${ts};`;

  //Create an HMAC signature
  const hmacSignature = createHmac('sha256', WEBHOOK_SECRET)
    .update(manifest)
    .digest('hex');

  return hash === hmacSignature;
}
