import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = headers()
  const svix_id = (await headerPayload).get('svix-id')
  const svix_timestamp = (await headerPayload).get('svix-timestamp')
  const svix_signature = (await headerPayload).get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type
  try {
    if (eventType === 'user.created') {
      const { id, email_addresses, image_url, username, first_name, last_name } = evt.data;
      console.log('Processing user.created event for user:', id);

      const mongoUser = await createUser({
        clerkId: id,
        name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      });

      console.log('User created in database:', mongoUser);
      return NextResponse.json({ message: 'OK', user: mongoUser });
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, image_url, username, first_name, last_name } = evt.data;
      console.log('Processing user.updated event for user:', id);

      const mongoUser = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
          username: username!,
          email: email_addresses[0].email_address,
          picture: image_url,
        },
        path: `/profile/${id}`
      });

      console.log('User updated in database:', mongoUser);
      return NextResponse.json({ message: 'OK', user: mongoUser });
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;
      console.log('Processing user.deleted event for user:', id);

      const deletedUser = await deleteUser({
        clerkId: id!,
      });

      console.log('User deleted from database:', deletedUser);
      return NextResponse.json({ message: 'OK', user: deletedUser });
    }

    console.log('Unsupported event type:', eventType);
    return NextResponse.json({ message: 'Event type not supported' });
  } catch (err) {
    console.error('Error processing event:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}