import "server-only"

import { User } from "@prisma/client"
import { cache } from "react"
import { db } from "./db"

export const preloadProjects = (userId: User["id"]) => {
    void getUserById(userId)
}

export const getUserById = cache(async (userId: User["id"]) => {
    return await db.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            projects: true,
            bounties: true,
            bountySubmissions: true,
            accounts: true,
        },
    })
})

export const getUserBountySubmissions = cache(async (userId: User["id"]) => {
    return await db.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            projects: true,
            bounties: true,
            bountySubmissions: {
                include: {
                    user: true,
                },
                where: {
                    bounty: {
                        deleted: false,
                    },
                },
            },
            accounts: true,
        },
    })
})

export interface Achievement {
    title: string
    description: string
    image: string
}

export const getUserAchievements = cache(async (userId: User["id"]) => {
    const user = await db.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        include: {
            projects: true,
            bounties: {
                where: {
                    deleted: false,
                    published: true,
                },
            },
            bountySubmissions: {
                where: {
                    deleted: false,
                },
            },
            accounts: true,
        },
    })

    const hasUserHadBountyAccepted = user?.bountySubmissions.find(
        (submission) => submission.accepted
    )

    let achievements: Achievement[] = []

    if (user?.projects?.length > 0) {
        achievements.push({
            title: "Nosferatu's Coffer Key",
            description: "You've connected a Github project on Vamp.",
            image: "/achievements/key.png",
        })
    }

    if (user?.bounties?.length > 0) {
        achievements.push({
            title: "Viago's Heart",
            description:
                "You've posted and published a bounty for one of your projects.",
            image: "/achievements/blood.png",
        })
    }

    if (user.bountySubmissions.length > 0) {
        achievements.push({
            title: "Dracula's Tonic",
            description: "You've submit a bounty submission.",
            image: "/achievements/potion.png",
        })
    }

    if (!!hasUserHadBountyAccepted) {
        achievements.push({
            title: "Van Helsing's Skull",
            description: "One of your bounty submissions has been accepted.",
            image: "/achievements/skull.png",
        })
    }

    if (user?.stripeCustomerId) {
        achievements.push({
            title: "Nandor's Coin",
            description: "You've connected your Stripe account to Vamp.",
            image: "/achievements/nandors-coin.png",
        })
    }

    if (user?.blood && user?.blood >= 5) {
        achievements.push({
            title: "Orlok's Night Blade",
            description: "You've collected 5+ Blood from solving bounties.",
            image: "/achievements/sword.png",
        })
    }

    return achievements
})
