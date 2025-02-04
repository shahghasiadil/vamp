import { LeaderBoard } from "@/components/marketing/leaderboard"
import { Suspense } from "react"
import { LeaderBoardLoading } from "@/components/marketing/leaderboard"
interface LeaderboardPageProps {
    searchParams?: { page: string; search: string; sort: string }
}

export default async function LeaderboardPage({
    searchParams,
}: LeaderboardPageProps) {
    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="my-8">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-lg font-semibold text-rose-600">
                            Make your mark
                        </h1>
                        <h1 className="mt-1 flex w-full items-center justify-center gap-8 text-4xl font-bold tracking-tight text-brandtext-500 sm:text-5xl lg:text-6xl">
                            Leaderboard
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-xl text-brandtext-600">
                            Collect Blood and rise to the top of the Vamps!
                        </p>
                    </div>
                </div>
            </div>

            <Suspense fallback={<LeaderBoardLoading />}>
                {/* @ts-expect-error Server Component */}
                <LeaderBoard
                    showPagination={true}
                    sortQuery={searchParams?.sort}
                    pageSize={10}
                    search={searchParams?.search}
                    page={searchParams?.page ? parseInt(searchParams.page) : 1}
                />
            </Suspense>
        </div>
    )
}
