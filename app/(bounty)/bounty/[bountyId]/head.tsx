import { db } from "@/lib/db"
import { getBaseUrl } from "@/lib/utils"
import { notFound } from "next/navigation"
import DefaultTags from "@/app/DefaultTags"
interface IBountyHeadProps {
    params: { bountyId: string }
}

export default async function Head({ params }: IBountyHeadProps) {
    const bounty = await db.bounty.findUnique({
        where: {
            id: params.bountyId,
        },
        include: {
            project: true,
        },
    })

    if (!bounty) {
        return notFound()
    }

    const ogUrl = new URL(`${getBaseUrl()}/api/og`)
    ogUrl.searchParams.set("heading", bounty.title)
    ogUrl.searchParams.set("type", bounty.project.name)
    ogUrl.searchParams.set(
        "bountyPrice",
        bounty?.bountyPrice?.toString() ?? "0"
    )
    // const bounty = await getPost(params.bountyId)

    return (
        <>
            <title>{bounty.title}</title>
            <DefaultTags />
            <link rel="canonical" href={`/bounty/${bounty.id}`} />
            <meta name="description" content={bounty?.description ?? ""} />
            <meta property="og:title" content={bounty.title} />
            <meta
                property="og:description"
                content={bounty?.description ?? ""}
            />
            {/* <meta property="og:url" content={url} /> */}
            <meta property="og:image" content={ogUrl.toString()} />
            <meta name="twitter:title" content={bounty.title} />
            <meta
                name="twitter:description"
                content={bounty?.description ?? ""}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={ogUrl.toString()} />
        </>
    )
}
