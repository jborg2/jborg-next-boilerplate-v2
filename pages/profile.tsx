import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Layout from '@/components/layouts/landing-page-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card"


// @ts-ignore
export default function Profile({ user }) {
  return (
    <>
      <Layout fadein={true}>
        <div className="container items-center justify-center md:pt-12 pb-16">
          <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>
          <div className="flex flex-col mx-auto">
            <Card
              className="mx-auto bg-background text-foreground"
            >
              <CardHeader>
                <CardTitle>{user.name || user.email}</CardTitle>
                <CardDescription>My account info</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Content goes here</p>
              </CardContent>
              <CardFooter>
                <p>Footer foes here</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  )
}

// @ts-ignore
export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}