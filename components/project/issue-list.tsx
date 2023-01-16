import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { dateToNow } from "@/lib/utils"
import { Button } from "@/ui/button"
import { ExternalLink } from "@/ui/external-link"
import { GithubIssueSearch } from "types"
import { Icons } from "../icons"
import { BountyCreateButton } from "./bounty-create-button"
import IssueListPagination from "./issue-list-pagination"
import { TProject } from "./secondary-nav"

type TIssueList = {
    issues: GithubIssueSearch
    project: TProject
    page: number | string
}

export default function IssueList({ issues, project, page }: TIssueList) {
    return (
        <ul
            role="list"
            className="relative flex flex-col divide-y divide-palette-300"
        >
            {issues?.items?.length ? (
                <>
                    {issues?.items?.map((issue) => (
                        <li className="p-4 pr-0 pl-0" key={issue.id}>
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
                                <div className="flex items-center gap-2">
                                    <Icons.circleDot
                                        size={16}
                                        className="text-green-400"
                                    />
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={issue.html_url}
                                        className="max-w-[256px] truncate text-sm font-medium text-white hover:underline md:max-w-[400px]"
                                    >
                                        {issue.title}
                                    </a>
                                </div>
                                <div className="block w-full md:hidden">
                                    <p className="pl-0 text-xs text-brandtext-600 md:pl-6">
                                        #{issue.number} opened by{" "}
                                        <ExternalLink
                                            href={issue.user.html_url}
                                        >
                                            {issue.user.login}
                                        </ExternalLink>{" "}
                                        {dateToNow(new Date(issue.updated_at))}{" "}
                                        ago
                                    </p>
                                </div>

                                <BountyCreateButton
                                    size="small"
                                    project={{
                                        id: project.id,
                                    }}
                                    issue={issue}
                                    intent="secondary"
                                >
                                    New bounty
                                </BountyCreateButton>
                            </div>
                            <div className="hidden w-full md:block">
                                <p className="pl-0 text-xs text-brandtext-600 md:pl-6">
                                    #{issue.number} opened by{" "}
                                    <ExternalLink href={issue.user.html_url}>
                                        {issue.user.login}
                                    </ExternalLink>{" "}
                                    {dateToNow(new Date(issue.updated_at))} ago
                                </p>
                            </div>
                        </li>
                    ))}
                </>
            ) : (
                <EmptyPlaceholder className="mt-4">
                    <EmptyPlaceholder.Icon name="gitHub" />
                    <EmptyPlaceholder.Title>No issues</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        This Github repository does not have any issues, or any
                        issues that match this search query.
                    </EmptyPlaceholder.Description>
                </EmptyPlaceholder>
            )}
            {issues?.total_count > 30 && (
                <div className="mb-16 mt-8">
                    <IssueListPagination
                        totalCount={issues.total_count}
                        project={{
                            id: project.id,
                        }}
                    />
                </div>
            )}
        </ul>
    )
}
