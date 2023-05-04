import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/shadcn-ui/button"
import { cn } from "@/lib/utils"
import { useSession } from "@supabase/auth-helpers-react"

import { marketingConfig } from "@/config/marketing"
import { Toggle } from "../darkmodetoggle"
import FadeIn from "../fadein"
import ProfileMenu from "@/components/user/ProfileMenu"

interface LayoutProps {
    children: React.ReactNode
    fadein?: boolean
}

export default function Layout({ children, ...props }: LayoutProps) {
    const session = useSession();

    return (
        <div className=" bg-background text-foreground flex min-h-screen flex-col">
            <header className="container sticky top-0 z-40">
                <div className="flex h-16 items-center justify-between border-b border-color py-4">
                    <MainNav items={marketingConfig.mainNav} />
                    <div className='flex flex-row gap-4 justify-center items-center'>
                        {session ? (
                            <ProfileMenu />
                        ) : (
                            <Link
                                href="/login"
                                className={cn(buttonVariants({ variant: "default", size: "sm" }), "px-4")}
                            >
                                Login
                            </Link>
                        )}
                        <Toggle />
                    </div>
                </div>
            </header>
            {props.fadein ? (
                <FadeIn>
                    <main className="flex-1 min-h-[calc(100vh-4rem)]">
                        {children}
                    </main>
                </FadeIn>
            ) : (
                <main className="flex-1 min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            )}
            <SiteFooter />
        </div>
    )
}