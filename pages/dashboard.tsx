import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import Layout from '@/components/layouts/landing-page-layout'

export default function ProtectedPage({ user, data }: { user: User; data: any }) {
  return (
    <>
      <Layout fadein={true}>
        <div className="container items-center justify-center md:pt-12 pb-16">
          <h1 className="text-4xl font-bold text-center">Dashboard</h1>
          <p className="text-center">
            This page is protected by <code>getServerSideProps</code>. You can only
            see this page if you are logged in.
          </p>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }

  // Run queries with RLS on the server
  const { data } = await supabase.from('users').select('*')

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  }
}