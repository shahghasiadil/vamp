import { Icons } from "@/components/icons"
import { Button } from "@/ui/button"
import { Headline } from "@/ui/headline"
import { Skeleton } from "@/ui/skeleton"

const RepoLoadingItem = () => {
    return (
        <div className="flex items-center justify-between p-4 pr-0">
            <Skeleton className="h-8 w-full" />
        </div>
    )
}

export default function NewLoading() {
    return (
        <div className="mx-auto w-full max-w-lg">
            <div className="my-8">
                <Button
                    intent="tertiary"
                    className="mb-8 inline-flex items-center justify-start gap-2"
                    size="small"
                >
                    <Icons.chevronLeft size={16} />
                    Back
                </Button>
                <Headline
                    heading="Almost there!"
                    text="Please follow the steps to configure your Project and create it."
                />
            </div>
            <div className="relative flex flex-col divide-y divide-palette-300">
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
            </div>
        </div>
    )
}
