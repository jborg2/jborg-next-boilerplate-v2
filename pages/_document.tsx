import { Html, Head, Main, NextScript } from 'next/document'
import { cn } from "@/lib/utils"

export default function Document() {
  return (
    <Html lang="en"
      className="font-sans antialiased"
    >
      <Head/>
      <body className={cn(
        "min-h-screen bg-white dark:bg-void text-black dark:text-white motion-reduce:transform-none motion-reduce:transition-none"
        )}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
