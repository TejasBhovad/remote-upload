import React from 'react'
import { signIn } from '@/lib/auth-client';

const SignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      await  signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/error", 
        newUserCallbackURL: "/",
        disableRedirect: false,
      });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <button 
      onClick={handleGoogleSignIn} 
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Sign in with Google
    </button>
  )
}

export default SignIn
