'use client'
import SignIn from '@/components/sign-in'
import SignOut from '@/components/sign-out'
import React from 'react'
import { useSession } from '@/lib/auth-client'

const Home = () => {
  const { 
    data: session, 
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = useSession()

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-8">
      {session ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1>Welcome, {session.user.name || session.user.email}!</h1>
            <SignOut />
          </div>
          <details>
            <summary>Session Data</summary>
            <pre className="mt-2   p-4 rounded text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          </details>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
          <SignIn />
        </div>
      )}
    </div>
  )
}

export default Home
