import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  /**
   * The following routes are accessible to everyone.
   * All other routes are protected.
   */
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)'],
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets and other Next.js internals.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};