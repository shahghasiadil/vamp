import { Inter as FontSans } from "@next/font/google"
import localFont from "@next/font/local"
import "./globals.css"
import { Toaster } from "@/ui/toast"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/site-footer"
import { AnalyticsWrapper } from "@/components/analytics"
import { Providers } from "./providers"
export { reportWebVitals } from "next-axiom"
import { Web3Providers } from "./web3Providers"
import "@rainbow-me/rainbowkit/styles.css"
import Script from "next/script"

const satoshi = localFont({
    src: "./Satoshi-Variable.woff2",
    variable: "--font-satoshi",
    weight: "300 900",
    display: "swap",
    style: "normal",
})

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-inter",
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Providers>
            <html
                lang="en"
                className={cn(
                    "bg-appbg font-sans text-brandtext-500 antialiased",
                    satoshi.variable,
                    fontSans.variable
                )}
            >
                {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
                <head />
                <body className="min-h-screen">
                    <Web3Providers>
                        {children}
                        <Toaster position="bottom-right" />
                        <SiteFooter />
                        <AnalyticsWrapper />
                    </Web3Providers>
                </body>
            </html>
        </Providers>
    )
}
