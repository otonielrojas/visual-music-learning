import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Base64 encoding function that works in all environments (including Edge)
function base64Encode(str: string): string {
  // For browsers and modern Node.js
  if (typeof btoa === 'function') {
    return btoa(str);
  }
  // For Node.js environments
  else if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64');
  }
  // Fallback implementation for Edge runtime
  else {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)
    ) {
      charCode = str.charCodeAt(i += 3/4);
      block = block << 8 | charCode;
    }
    return output;
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  // Skip authentication for public assets and API routes
  if (event.url.pathname.startsWith('/favicon.ico') || 
      event.url.pathname.startsWith('/_app/') ||
      event.url.pathname.startsWith('/images/') ||
      event.url.pathname.startsWith('/build/') ||
      event.url.pathname.includes('.')) {
    return await resolve(event);
  }

  // Get environment variables for authentication
  const AUTH_USERNAME = env.AUTH_USERNAME || 'admin';
  const AUTH_PASSWORD = env.AUTH_PASSWORD || 'password';
  
  // Skip authentication in development mode if desired
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev && env.SKIP_AUTH === 'true') {
    return await resolve(event);
  }

  // Get the Authorization header from the request
  const authHeader = event.request.headers.get('Authorization');
  
  // Create the expected auth string
  const credentials = `${AUTH_USERNAME}:${AUTH_PASSWORD}`;
  const validAuth = 'Basic ' + base64Encode(credentials);
  
  if (!authHeader || authHeader !== validAuth) {
    // If the Authorization header is missing or invalid, return a 401 response
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Visual Music Learning System", charset="UTF-8"'
      }
    });
  }
  
  // If the Authorization header is valid, proceed with the request
  return await resolve(event);
};
