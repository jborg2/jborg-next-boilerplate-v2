import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import AuthPage from '@/components/user/AuthPage'
import Layout from '@/components/layouts/landing-page-layout'

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      // @ts-ignore
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!user)
    return (
        <AuthPage type={'signin'} />
    )

  return (
    <div>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <p>{JSON.stringify(user, null, 2)}</p>
      <p>client-side data fetching with RLS</p>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  )
}

export default LoginPage