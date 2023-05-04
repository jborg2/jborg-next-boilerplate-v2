import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import ExternalLink from "./ExternalLink"

export function SiteFooter() {
  return (
    <footer className="container text-neutral-600 dark:text-neutral-400">
      <div className="flex  flex-col items-center justify-between gap-4 border-t border-t-neutral-200 dark:border-t-neutral-800 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <ExternalLink
              href="https://www.beneverman.com"
              arrow={false}
              // underline={false}
              className="underline underline-offset-4 font-medium"
            >
              Ben Everman
            </ExternalLink>
            {" & "}
            <ExternalLink
              href="#"
              arrow={false}
              // underline={false}
              className="underline underline-offset-4 font-medium"
            >
              Jake Haygood
            </ExternalLink>
            . © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
        <p className="text-center text-sm md:text-left">
          The source code is available on{" "}
          <ExternalLink
            href="https://www.github.com/jborg2"
            arrow={false}
            // underline={false}
            className="underline underline-offset-4 font-medium"
          >
            GitHub
          </ExternalLink>
          .
        </p>
      </div>
    </footer>
  )
}
