import Balancer from 'react-wrap-balancer';
import Link from 'next/link'
import { useEffect } from 'react';

import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/use-mounted';

import Layout from '@/components/layouts/landing-page-layout'
import Button from '@/components/markprompt-ui/Button'
import { Icons } from '@/components/icons'
import ExternalLink from '@/components/ExternalLink';
import { Code } from '@/components/markprompt-ui/Code';

// make some example react code
const exampleCode = `
def fibonacci(n):
  a, b = 0, 1
  while a < n:
      print(a, end=' ')
      a, b = b, a+b
  print()
`

export default function Index() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  useEffect(() => {
    if (mounted) {
      setTheme('dark')
    }
  }, [mounted, setTheme])

  const links = [
    {
      name: "Shadcn UI",
      href: "https://github.com/shadcn/ui"
    },
    {
      name: "Markprompt UI",
      href: "https://github.com/motifland/markprompt",
    },
    {
      name: "Next.js",
      href: "https://nextjs.org/",
    },
    {
      name: "Supabase",
      href: "https://supabase.com/",
    },
  ]

  return (
    <Layout fadein={true}>
      <div className="container items-center justify-center md:pt-4 pb-16">
        <section className='min-h-[60vh]'>
          <h1 className="gradient-heading mt-28 text-center text-5xl leading-[48px] tracking-[-0.6px] sm:text-6xl sm:leading-[64px]">
            <Balancer>
              The ultimate Saas boilerplate.
            </Balancer>
          </h1>
          <p className="mx-auto mt-4 max-w-screen-sm text-center text-lg dark:text-neutral-500">
            An internal tool so we can pump out new projects faster.
            <br />
            From the{' '}
            <ExternalLink
              href="https://github.com/jborg2"
            >
              Jborg2
            </ExternalLink>{' '}
            team.
          </p>
          <div className="flex flex-row items-center justify-center gap-4 pt-8">
            <Button
              variant="cta"
              buttonSize="lg"
              href="/login"
            >
              Start for free
            </Button>
            <Button
              variant="plain"
              buttonSize="lg"
              href="https://github.com/jborg2/jborg-next-boilerplate"
              Icon={Icons.gitHub}
            >
              Star on GitHub
              <span className="ml-2 text-neutral-600">0</span>
            </Button>
          </div>
          <p className="pt-20 text-center text-neutral-700">Built with</p>
          <div className="flex flex-col items-center justify-center gap-4 pt-6 md:flex-row md:gap-12 text-neutral-900 dark:text-neutral-500 text-2xl font-medium font-silkscreen">
            {links.map((link, index) => (
              <ExternalLink
                key={index}
                href={link.href}
                underline={false}
                arrow={false}
              >
                {link.name}
              </ExternalLink>
            ))}
          </div>
        </section>
        <section className='mb-16'>
          <h2 className="gradient-heading mt-40 text-center text-4xl">
            Easy. As. Fork.
          </h2>
          <p className="mx-auto mt-4 max-w-screen-md text-center text-lg dark:text-neutral-500">
            We did the hard work, so we never have to do it again. Just fork the repo and start building. Now, we can focus on creating sick features, not writing boilerplate.
          </p>
          <div className="mt-12 grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-2 lg:gap-0">
            <div className="flex h-full flex-col items-center">
              <div className="flex w-full flex-grow sm:px-12">
                <div className="mx-auto flex flex-grow items-center justify-center rounded-lg border border-color bg-neutral-1000 px-4 py-12 text-sm">
                  <div className="pointer-events-none flex flex-row items-center gap-2  sm:flex-col md:flex-row">
                    <div className="flex flex-grow flex-row items-center gap-4 rounded-md border border-color bg-neutral-100 dark:bg-neutral-900 px-3 py-2 pr-8">
                      <Icons.gitHub className="h-4 w-4 flex-none text-neutral-600" />
                      <p className="flex-grow truncate text-neutral-700 dark:text-neutral-300 ">
                        github.com/jborg2/jborg-next-boilerplate
                      </p>
                    </div>
                    <div className="button-glow-color flex-none rounded-md border-transparent bg-fuchsia-500 dark:bg-fuchsia-600 px-4 py-2 text-center text-white sm:w-full md:w-min">
                      Fork
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex h-32 w-full flex-none flex-col items-center">
                <div className="absolute right-0 z-0 h-[48px] w-1/2 border-b border-dashed border-color" />
                <div className="absolute top-0 left-0 z-0 h-[48px] w-1/2 border-b border-dashed border-color" />
                <div className="absolute left-0 z-10 h-[54px] w-1/2 bg-gradient-to-l from-neutral-1100/0 to-neutral-1100" />
                <div className="h-[40px] border-r border-dashed border-color" />
                <div className="z-20 h-4 w-4 rounded-full border-4 border-color bg-neutral-700 dark:bg-neutral-300" />
                <div className="relative mt-4 flex w-full flex-none flex-col items-center font-medium dark:text-neutral-300 text-neutral-700">
                  Fork
                  <p className="absolute inset-x-0 top-6 mx-auto mt-2 h-20 max-w-xs text-center text-sm font-normal text-neutral-500">
                    <Balancer ratio={0.5}>
                      Fork the GitHub repo, and you&apos;re ready to go.
                    </Balancer>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col items-center">
              <div className="flex w-full flex-grow px-0 sm:px-12">
                <div className="mx-auto flex w-full items-center justify-center overflow-hidden rounded-lg border border-color bg-gray-900 dark:bg-transparent p-0 text-sm">
                  <Code
                      className="code-small-md"
                      language="python"
                      code={exampleCode}
                    />
                </div>
              </div>
              <div className="relative flex h-32 w-full flex-none flex-col items-center">
                <div className="absolute top-0 left-0 z-0 h-[48px] w-1/2 border-b border-dashed border-color" />
                <div className="absolute top-0 right-0 z-0 h-[48px] w-1/2 border-b border-dashed border-color" />
                <div className="absolute right-0 z-10 h-[54px] w-1/2 bg-gradient-to-r from-neutral-1100/0 to-neutral-1100" />
                <div className="h-[40px] border-r border-dashed border-color" />
                <div className="z-20 h-4 w-4 rounded-full border-4 border-color bg-neutral-700 dark:bg-neutral-300" />
                <div className="relative mt-4 flex w-full flex-none flex-col items-center font-medium dark:text-neutral-300 text-neutral-700">
                  Build
                  <p className="absolute inset-x-0 top-6 mx-auto mt-2 h-20 max-w-xs text-center text-sm font-normal text-neutral-500">
                    Just add your own components and content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout >
  )
}