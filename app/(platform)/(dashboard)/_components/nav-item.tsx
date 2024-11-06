"use client"

import {cn} from "@/lib/utils";
import Image from "next/image"
import {useRouter, usePathname} from "next/navigation";

import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {ActivityIcon, CreditCardIcon, LayoutIcon, SettingsIcon} from "lucide-react";
import {Button} from "@/components/ui/button";


export type Organization = {
    id: string,
    slug: string,
    imageUrl: string,
    name: string
}

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string) => void;
}

export const NavItem = ({
    isActive,
    isExpanded,
    organization,
    onExpand
}: NavItemProps) => {

    const router = useRouter()
    const pathname = usePathname()

    const routes = [
        {
            label: "Boards",
            icon: <LayoutIcon className="h-4 w-4 mr-2"/>,
            href: `/organization/${organization.id}`,
        },
        {
            label: "Activity",
            icon: <ActivityIcon className="h-4 w-4 mr-2"/>,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: "Settings",
            icon: <SettingsIcon className="h-4 w-4 mr-2"/>,
            href: `/organization/${organization.id}/settings`,
        },
        {
            label: "Billing",
            icon: <CreditCardIcon className="h-4 w-4 mr-2"/>,
            href: `/organization/${organization.id}/billing`,
        }
    ]

    const onClick = (href: string) => {
        router.push(href)
    }

    return (
        <AccordionItem
            value={organization.id}
            className="border-none"
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image
                            fill
                            src={organization.imageUrl}
                            alt={organization.name}
                            className="rounded-sm object-cover"
                        />
                    </div>
                    <span className="font-medium text-sm no-underline">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        size="sm"
                        onClick={() => onClick(route.href)}
                        className={cn(
                            "w-full font-normal justify-start pl-10 mb-1",
                            pathname === route.href && "bg-sky-500/10 text-sky-700"
                        )}
                        variant="ghost"
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}