# Goal Description
Replace the email-based Magic Link authentication with Google OAuth across the application to bypass the Supabase email rate limits and simplify the login process.

## User Review Required
> [!IMPORTANT]
> To make Google OAuth work, you will need to configure it in both your Google Cloud Console and your Supabase Dashboard. 
> 
> You will need to:
> 1. Create a project in Google Cloud Console and get an **OAuth Client ID** and **Client Secret**.
> 2. Go to **Supabase Dashboard -> Authentication -> Providers -> Google** and paste those credentials in.
> 3. Turn the Google provider **ON** in Supabase.

## Proposed Changes

### Auth Actions
#### [MODIFY] `app/actions/auth.ts`
- Add a new `signInWithGoogle` server action.
- This action will call `supabase.auth.signInWithOAuth({ provider: 'google' })` and redirect the user to the generated Google consent screen URL.
- Remove the `signInWithMagicLink` action.

### Auth Pages
#### [MODIFY] `app/(auth)/login/page.tsx`
- Remove the email input form, state handling, and "Check your inbox" success UI.
- Replace the form with a single, styled "Continue with Google" button.
- Wrap the button in a standard form that calls the `signInWithGoogle` server action.

#### [MODIFY] `app/(auth)/register/page.tsx` (if it exists)
- Replace the registration form with the same "Continue with Google" button, since OAuth handles both sign-up and sign-in seamlessly.

## Verification Plan
### Manual Verification
- You will need to click the "Continue with Google" button locally.
- It should redirect you to Google's consent screen.
- After selecting your Google account, it should redirect you back to `http://localhost:3000/auth/callback` and log you into the Contributor Dashboard.
