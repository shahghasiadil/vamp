"use client"

import { Icons } from "@/components/icons"
import { capitalize, cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { useFormContext } from "react-hook-form"
import { Label } from "./label"

type InputProps = ComponentProps<"input">

const inputStyles = cva(
    "my-0 block h-9 w-full rounded-md border py-2 px-3 text-sm  transition-all duration-100 focus:outline-none focus:ring-0 form-input",
    {
        variants: {
            intent: {
                primary:
                    "bg-palette-400 border-palette-300 placeholder:text-placeholder hover:border-brandtext-600 text-white focus:border-rose-500",
                search: "bg-appbg border-palette-300 placeholder:text-placeholder hover:border-brandtext-600 text-white focus:border-rose-500 pl-8",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
)

export interface Props extends InputProps, VariantProps<typeof inputStyles> {
    id: string
    label?: string
    isUSD?: boolean
    isPending?: boolean
}

export function Input({
    intent = "primary",
    className,
    name,
    label,
    children,
    id,
    isPending = false,
    isUSD = false,
    ...props
}: Props) {
    const { register } = useFormContext()
    return (
        <>
            <div className="grid gap-1">
                {label && <Label htmlFor={id}>{capitalize(label)}</Label>}

                <div className="relative w-full">
                    {isPending && (
                        <div className="absolute right-0 z-10  my-auto inline-flex h-full items-center">
                            <Icons.spinner className="mr-3 h-4 w-4 animate-spin text-brandtext-600" />
                        </div>
                    )}
                    {intent === "search" && (
                        <Icons.search
                            className="absolute left-2 top-0 bottom-0 m-auto ml-1 h-full text-brandtext-600"
                            size={16}
                        />
                    )}
                    <input
                        id={id}
                        {...register(id, {
                            // valueAsNumber:
                            //     props.type === "number" ? true : false,
                            setValueAs: (v) => {
                                if (props.type === "number") {
                                    if (v === "") {
                                        return undefined
                                    } else {
                                        return parseFloat(v).toFixed(2)
                                    }
                                } else {
                                    return v
                                }
                            },
                        })}
                        className={cn(inputStyles({ intent }), className)}
                        {...props}
                    />
                    {isUSD && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span
                                className="text-gray-500 sm:text-sm"
                                id="price-currency"
                            >
                                USD
                            </span>
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </>
    )
}
