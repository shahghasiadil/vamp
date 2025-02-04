"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

type ModalProps = Dialog.DialogProps

export function Modal({ ...props }: ModalProps) {
    return <Dialog.Root {...props} />
}

Modal.Trigger = React.forwardRef<HTMLButtonElement, Dialog.DialogTriggerProps>(
    function ModalTrigger({ ...props }, ref) {
        return <Dialog.Trigger {...props} ref={ref} />
    }
)

Modal.Portal = Dialog.Portal

Modal.Title = React.forwardRef<HTMLDivElement, Dialog.DialogTitleProps>(
    function ModalTitle({ className, ...props }, ref) {
        return (
            <Dialog.Title
                className="text-xl font-bold text-default"
                {...props}
                ref={ref}
            />
        )
    }
)

Modal.Content = React.forwardRef<HTMLDivElement, Dialog.DialogContentProps>(
    function ModalContent({ className, ...props }, ref) {
        return (
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 opacity-100 backdrop-blur-sm transition-opacity animate-in fade-in	" />
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <Dialog.Content
                        ref={ref}
                        className={cn(
                            "dropdown fixed z-50 grid w-[95vw] max-w-md scale-100 gap-4 rounded-xl p-6 opacity-100 shadow-lg animate-in fade-in-90 zoom-in-90 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75 md:w-full",
                            className
                        )}
                        {...props}
                    />
                </div>
            </Dialog.Portal>
        )
    }
)
