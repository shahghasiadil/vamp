"use client"

import { trpc } from "@/client/trpcClient"
import { TUser } from "@/components/dashboard/user-account-nav"
import { useIsIntersecting } from "@/hooks/use-is-intersecting"
import { Button } from "@/ui/button"
import { Skeleton } from "@/ui/skeleton"
import { useEffect, useRef, Fragment } from "react"
import Image from "next/image"
import { dateToNow } from "@/lib/utils"
import Link from "next/link"

export interface INotificationList {
    user: TUser
}

export function NotificationList({ user }: INotificationList) {
    const [isLoadMoreVisible, ref] = useIsIntersecting<HTMLDivElement>()

    // Ignore this type warning for now, issue has been filed at https://github.com/trpc/trpc/issues/3555
    const query = trpc.notification.list.useInfiniteQuery(
        {
            limit: 10,
            userId: user.id,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    )

    const fetchNextPageRef = useRef(query.fetchNextPage)
    fetchNextPageRef.current = query.fetchNextPage

    useEffect(() => {
        if (isLoadMoreVisible && query.hasNextPage && !query.isFetching) {
            fetchNextPageRef.current()
        }
    }, [isLoadMoreVisible, query.hasNextPage, query.isFetching])

    return (
        <ul
            role="list"
            className="divide-y divide-palette-300 max-h-[400px] overflow-y-scroll"
        >
            {query.data?.pages.map((page, index) => (
                <Fragment key={index}>
                    {page.items.map((notification) => (
                        <>
                            {notification?.bounty &&
                                notification?.bountySubmission && (
                                    <Link
                                        as="li"
                                        href={`/bounty/${notification.bounty.id}`}
                                        className="p-4 hover:bg-palette-300 flex items-start gap-4 w-full"
                                    >
                                        <div className="overflow-hidden rounded-full relative flex-shrink-0">
                                            {notification?.bountySubmission
                                                ?.user &&
                                            notification.bountySubmission.user
                                                .image ? (
                                                <Image
                                                    height={24}
                                                    width={24}
                                                    alt="Avatar"
                                                    src={
                                                        notification
                                                            .bountySubmission
                                                            .user.image
                                                    }
                                                />
                                            ) : (
                                                <Image
                                                    fill={true}
                                                    alt="Avatar"
                                                    src={`https://avatar.vercel.sh/${notification.bounty.project.name}${notification.bounty.project.id}`}
                                                />
                                            )}
                                        </div>
                                        {notification.type ===
                                            "SUBMISSIONRECIEVED" && (
                                            <div className="flex flex-col w-full gap-2 overflow-hidden">
                                                <span className="text-brandtext-500 inline-flex gap-1 flex-wrap text-sm line-clamp-2 font-medium">
                                                    {
                                                        notification
                                                            .bountySubmission
                                                            .user.name
                                                    }{" "}
                                                    submitted a solution for{" "}
                                                    {notification.bounty.title}.
                                                </span>
                                                <small className="text-brandtext-600">
                                                    {dateToNow(
                                                        notification.createdAt
                                                    )}{" "}
                                                    ago
                                                </small>
                                            </div>
                                        )}
                                    </Link>
                                )}
                        </>
                    ))}
                </Fragment>
            ))}
            <div ref={ref}>
                {query.isFetchingNextPage ? (
                    <Skeleton className="h-9 w-full" />
                ) : (
                    <Button
                        size="noPadding"
                        intent="text"
                        disabled={!query.hasNextPage}
                        onClick={() => {
                            query.fetchNextPage()
                        }}
                        className={
                            "p-4 w-full cursor-pointer" +
                            (!query.hasNextPage ? " opacity-50" : "")
                        }
                    >
                        {query.hasNextPage
                            ? "Load more"
                            : "No more notifications to load"}
                    </Button>
                )}
            </div>
        </ul>
    )
}
