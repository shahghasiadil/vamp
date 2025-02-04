import { getBountyById } from "@/lib/bounties"
import { Button } from "@/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/ui/skeleton"

interface TBountyInfoBox {
    bountyId: string
}

export async function BountyProjectInfo({ bountyId }: TBountyInfoBox) {
    const bounty = await getBountyById(bountyId)

    if (!bounty) return null

    return (
        <div className="col-span-4 rounded-lg border border-raised-border p-4 py-6">
            <div className="flex flex-col items-center">
                <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                    <Image
                        fill={true}
                        alt="Project avatar"
                        src={bounty.project.computedProjectImage}
                    />
                </div>
                <div className="mt-8">
                    <span className="inline-flex items-center gap-2 text-xl font-bold text-brandtext-500">
                        {bounty.project.name}{" "}
                    </span>
                </div>
                <div className="mt-2">
                    <span className="inline-flex items-center gap-2 text-brandtext-600">
                        {bounty.project.bounties.length} Bounties
                    </span>
                </div>
                <Link href={`/p/${bounty.project.id}`}>
                    <Button
                        size="small"
                        className="mt-4"
                        borderRadius="full"
                        intent="secondary"
                    >
                        View Project Profile
                    </Button>
                </Link>
            </div>
        </div>
    )
}

BountyProjectInfo.Skeleton = function BountyActivitySkeleton() {
    return (
        <div className="col-span-4 rounded-lg border border-raised-border p-4 py-6">
            <div className="flex flex-col items-center">
                <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                    <Skeleton className="h-16 w-16" />
                </div>
                <div className="mt-8 w-full  max-w-[128px]">
                    <span className="inline-flex w-full items-center gap-2 text-xl font-bold text-brandtext-500">
                        <Skeleton className="h-8 w-full" />
                    </span>
                </div>
                <div className="mt-2 w-full max-w-[48px]">
                    <span className="inline-flex w-full items-center gap-2 text-brandtext-600">
                        <Skeleton className="h-6 w-full" />
                    </span>
                </div>

                <div className="mt-2 h-[34px] w-[155px] overflow-hidden rounded-full">
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
        </div>
    )
}
