import { redirect } from "next/navigation"

import GithubRepoList from "@/components/dashboard/github-repo-list"
import { Icons } from "@/components/icons"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { Headline } from "@/ui/headline"
import Link from "next/link"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="mx-auto w-full max-w-lg">
            <div className="my-8">
                <Link href={`/dashboard`}>
                    <Button
                        intent="tertiary"
                        className="mb-8 inline-flex items-center justify-start gap-2"
                        size="small"
                    >
                        <Icons.chevronLeft size={16} />
                        Back
                    </Button>
                </Link>
                <Headline
                    heading="Select a Github repository or Org"
                    text="Import a Github Repository to get started posting bounties"
                />
            </div>
            {/* @ts-expect-error Server Component */}
            <GithubRepoList />
        </div>
    )
}
