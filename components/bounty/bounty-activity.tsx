import { BountySubmissionList } from "@/components/bounty/bounty-submission-list"
import { BountySubmissionsEmpty } from "@/components/bounty/bounty-submissions-empty"
import { SubmissionCreateButton } from "@/components/project/submission-create-button"
import { getBountyById } from "@/lib/bounties"
import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import { Button } from "@/ui/button"
import { StripeNotConnectedModal } from "@/ui/stripe-not-connected-modal"
import { Skeleton } from "@/ui/skeleton"
import { useSearchParams } from "next/navigation"

interface TBountyActivity {
    bountyId: string
    cursor?: string
}

export async function BountyActivity({ bountyId, cursor }: TBountyActivity) {
    const [bounty, user] = await Promise.all([
        getBountyById(bountyId),
        getCurrentUser(),
    ])

    if (!bounty) return null

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-brandtext-500">
                    Activity
                </h3>
                {bounty?.bountySubmissions?.length &&
                !bounty.resolved &&
                user ? (
                    <>
                        {user.stripeCustomerId ? (
                            <SubmissionCreateButton
                                bounty={{
                                    id: bountyId,
                                }}
                            />
                        ) : (
                            <StripeNotConnectedModal>
                                <Button>Post solution</Button>
                            </StripeNotConnectedModal>
                        )}
                    </>
                ) : (
                    <>
                        {!user && (
                            <Link href="/login">
                                <Button size="small" intent="primary">
                                    Login to participate
                                </Button>
                            </Link>
                        )}
                    </>
                )}
            </div>
            {bounty?.bountySubmissions?.length && bounty?.stripePriceId ? (
                <>
                    {/* @ts-expect-error Server Component */}
                    <BountySubmissionList
                        cursor={cursor}
                        bountyId={bounty.id}
                        resolved={bounty.resolved}
                        bountyStripePriceId={bounty.stripePriceId}
                    />
                </>
            ) : (
                <>
                    {/* @ts-expect-error Server Component */}
                    <BountySubmissionsEmpty bountyId={bountyId} />
                </>
            )}
        </>
    )
}

BountyActivity.Skeleton = function BountyActivitySkeleton() {
    return (
        <div className="mb-4 flex w-full flex-col items-start justify-between">
            <h3 className="text-2xl font-bold text-brandtext-500">Activity</h3>
            <div className="mt-4 w-full">
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    )
}
