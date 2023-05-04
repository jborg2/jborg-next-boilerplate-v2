import { Auth } from '@supabase/auth-ui-react';
import { ThemeMinimal } from '@supabase/auth-ui-shared';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Icons } from '@/components/icons';
import Button from '@/components/markprompt-ui/Button';
import { FC } from 'react';
import Link from 'next/link';
import { ThemeSupa } from '@supabase/auth-ui-shared'

type AuthPageProps = {
  type: 'signin' | 'signup';
};

const AuthPage: FC<AuthPageProps> = ({ type }) => {
  const session = useSession();
  const supabaseClient = useSupabaseClient();

  return (
    <>
      <div>
        <div className="mx-auto w-min">
          <Link href="/">
            <Icons.logo className="mx-auto mt-16 h-16 w-16 dark:text-white text-neutral-900 hover:text-gray-600 dark:hover:text-gray-300 outline-none" />
          </Link>
        </div>
        {!session ? (
          <div className="mx-auto px-2 sm:px-0 mt-16 max-w-sm">
            <Auth
              view={type === 'signup' ? 'sign_up' : 'sign_in'}
              redirectTo={process.env.NEXT_PUBLIC_SITE_URL + '/'}
              // onlyThirdPartyProviders
              socialLayout="vertical"
              providers={['github', 'google']}
              supabaseClient={supabaseClient}
              appearance={{ theme: ThemeSupa }}
              magicLink={true}
              theme="default"
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Password',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Password',
                  },
                },
              }}
            />
          </div>
        ) : (
          <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2 p-8 pt-20 text-neutral-300 dark:text-neutral-700">
            <p className="mb-4">You are already signed in.</p>
            <Button asLink className="w-full" variant="plain" href="/">
              Go to app
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => supabaseClient.auth.signOut()}>
              Sign out
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthPage;
