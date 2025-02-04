import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { ProjectItem } from "@/components/dashboard/project-item"
import { DashboardShell } from "@/components/dashboard/shell"
import { preloadRepos } from "@/lib/github"
import { getProjectsForUser } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export const revalidate = false

export default async function DashboardPage({}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    preloadRepos()

    const projectUsers = await getProjectsForUser(user.id)

    return (
        <DashboardShell>
            <div className="mt-12">
                {projectUsers?.length ? (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        {projectUsers.map((projectUser) => (
                            <ProjectItem
                                projectUser={projectUser}
                                key={projectUser.id}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="logo" />
                        <EmptyPlaceholder.Title>
                            No projects created
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don't have any projects yet. Start posting
                            bounties.
                        </EmptyPlaceholder.Description>
                        <Link href={`/new`}>
                            <Button>+ New Project</Button>
                        </Link>
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}
