"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Project } from "@prisma/client"

import { DropdownMenu } from "@/ui/dropdown"
import { Icons } from "@/components/icons"
import { Alert } from "@/ui/alert"
import { toast } from "@/ui/toast"

async function deleteProject(postId: string) {
    const response = await fetch(`/api/project/${postId}`, {
        method: "DELETE",
    })

    if (!response?.ok) {
        return toast({
            title: "Something went wrong.",
            message: "Your project was not deleted. Please try again.",
            type: "error",
        })
    }

    toast({
        title: "Project deleted",
        message: "Your project has been deleted.",
        type: "success",
    })

    return true
}

interface PostOperationsProps {
    project: Pick<Project, "id" | "name">
}

export function ProjectOperations({ project }: PostOperationsProps) {
    const router = useRouter()
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenu.Trigger>
                    <div className="inline-flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-raised-border p-1 transition-all duration-100 hover:brightness-200 focus:outline-none">
                        <Icons.ellipsis
                            size={16}
                            className="text-brandtext-400"
                        />
                    </div>
                    <span className="sr-only">Open</span>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="dropdown z-50 mt-2">
                        <DropdownMenu.Item>
                            <Link
                                href={`/project/${project.id}/settings`}
                                className="flex w-full"
                            >
                                Edit
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            className="flex cursor-pointer items-center text-red-600 focus:text-red-700"
                            onSelect={() => setShowDeleteAlert(true)}
                        >
                            Delete
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu>
            <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <Alert.Content>
                    <Alert.Header>
                        <Alert.Title>
                            Are you sure you want to delete this project?
                        </Alert.Title>
                        <Alert.Description>
                            This action cannot be undone. All project bounties
                            will be deleted as well.
                        </Alert.Description>
                    </Alert.Header>
                    <Alert.Footer>
                        <Alert.Cancel>Cancel</Alert.Cancel>
                        <Alert.Action
                            className="disabled:pointer-events-none disabled:opacity-50"
                            disabled={isDeleteLoading}
                            onClick={async (event) => {
                                event.preventDefault()
                                setIsDeleteLoading(true)

                                const deleted = await deleteProject(project.id)

                                if (deleted) {
                                    setIsDeleteLoading(false)
                                    setShowDeleteAlert(false)
                                    router.refresh()
                                }
                            }}
                        >
                            {isDeleteLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4" />
                            )}
                            <span>Delete</span>
                        </Alert.Action>
                    </Alert.Footer>
                </Alert.Content>
            </Alert>
        </>
    )
}
