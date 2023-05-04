import Layout from "@/components/layouts/landing-page-layout";
import { DocsSidebarNav } from "@/components/shadcn-ui/sidebar-nav";
import { docsConfig } from "@/config/docs";

export default function Docs() {
    return (
        <Layout>
            <div className="relative flex flex-row">
                <div className="w-[400px] overflow-y-auto px-6 pb-10 sm:px-8 md:block">
                    <div className="mt-[26px] flex flex-col gap-1 pb-12 ml-8">
                        <DocsSidebarNav items={docsConfig.sidebarNav} />
                    </div>
                </div>
                <div className="relative w-full max-w-full overflow-hidden">
                    <div className="max-w-full pt-16 pb-16 sm:max-w-screen-md md:px-8">
                        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Docs</h1>
                        <div className="fixed inset-0 top-24 right-[max(0px,calc(50%-40rem))] left-auto z-20 hidden lg:w-48 overflow-y-auto px-6 pb-10 sm:px-8 lg:block">
                            <div className="mt-[26px] flex flex-col gap-1 pb-12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}