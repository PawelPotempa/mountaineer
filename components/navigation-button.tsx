'use client';

import { BookOpen, GamepadIcon, Edit, LogIn, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const icons = {
    'book-open': BookOpen,
    'gamepad': GamepadIcon,
    'edit': Edit,
    'log-in': LogIn,
    'log-out': LogOut,
} as const;

type IconType = keyof typeof icons;

interface NavigationButtonProps {
    href: string;
    icon: IconType;
    title: string;
    className?: string;
    iconColor?: string;
    onClick?: () => Promise<void>;
    disabled?: boolean;
}

export function NavigationButton({
    href,
    icon,
    title,
    className,
    iconColor,
    onClick,
    disabled,
}: NavigationButtonProps) {
    const pathname = usePathname();
    const router = useRouter();
    const Icon = icons[icon];

    const isActive = pathname === href;

    const handleClick = async () => {
        if (onClick) {
            await onClick();
        } else {
            router.push(href);
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    onClick={!disabled ? handleClick : undefined}
                    className={cn(
                        "p-2 rounded-lg transition-colors cursor-pointer text-gray-700 hover:bg-gray-100",
                        isActive && "bg-gray-200 hover:bg-gray-200",
                        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
                        className
                    )}
                >
                    <Icon className={cn("h-5 w-5", iconColor)} />
                </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="z-[1001]">
                <p>{title}</p>
            </TooltipContent>
        </Tooltip>
    );
} 