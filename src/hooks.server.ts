import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
  // Log environment variables for debugging (remove in production)
  console.log('Environment mode:', process.env.NODE_ENV);
  
  // Skip authentication for public assets and API routes
  if (event.url.pathname.startsWith('/favicon.ico') || 
      event.url.pathname.startsWith('/_app/') ||
      event.url.pathname.startsWith('/images/') ||
      event.url.pathname.startsWith('/build/') ||
      event.url.pathname.includes('.')) {
    return await resolve(event);
  }

  // Get environment variables for authentication
  // Use hardcoded defaults for testing if env vars aren't available
  const AUTH_USERNAME = env.AUTH_USERNAME || 'admin';
  const AUTH_PASSWORD = env.AUTH_PASSWORD || 'password';
  
  // Skip authentication in development mode if desired
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    console.log('Development mode detected, authentication may be skipped');
    if (env.SKIP_AUTH === 'true') {
      console.log('Authentication skipped due to SKIP_AUTH=true');
      return await resolve(event);
    }
  }

  // Get the Authorization header from the request
  const authHeader = event.request.headers.get('Authorization');
  
  // Create the expected auth string
  const credentials = `${AUTH_USERNAME}:${AUTH_PASSWORD}`;
  const validAuth = 'Basic ' + Buffer.from(credentials).toString('base64');
  
  // Debug output (remove in production)
  console.log('Auth header present:', !!authHeader);
  
  if (!authHeader || authHeader !== validAuth) {
    // If the Authorization header is missing or invalid, return a 401 response
    console.log('Authentication failed, sending 401 response');
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Visual Music Learning System", charset="UTF-8"'
      }
    });
  }
  
  // If the Authorization header is valid, proceed with the request
  console.log('Authentication successful');
  return await resolve(event);
};
