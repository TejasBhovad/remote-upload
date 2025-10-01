import React from 'react'
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation'  
 
const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            // router.push("/login");  
          },
        },
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <button 
      onClick={handleSignOut} 
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Sign Out
    </button>
  )
}

export default SignOut
