'use client';

import { DomEvent } from "leaflet";
import { ICONS_CONFIG } from "@/components/map/icons-config";
import { PinType } from "@/types/pins";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface IconSelectorProps {
    selectedType: PinType;
    onTypeSelect: (type: PinType) => void;
}

export const IconSelector = ({ selectedType, onTypeSelect }: IconSelectorProps) => {
    const handleIconClick = (e: React.MouseEvent, type: PinType) => {
        e.stopPropagation();
        onTypeSelect(type);
    };

    return (
        <div
            className="fixed top-4 right-4 z-[1000] flex gap-1.5 bg-white/80 p-2 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200"
            ref={(element) => {
                if (element) {
                    DomEvent.disableClickPropagation(element);
                }
            }}
        >
            <TooltipProvider delayDuration={0}>
                {Object.entries(ICONS_CONFIG).map(([type, config]) => (
                    <div
                        key={type}
                        onClick={(e) => handleIconClick(e, type as PinType)}
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className={cn(
                                        "p-2 rounded-lg transition-colors cursor-pointer text-gray-700 hover:bg-gray-100",
                                        selectedType === type && "bg-gray-200 hover:bg-gray-200"
                                    )}
                                    style={{
                                        backgroundColor: selectedType === type ? config.color : undefined
                                    }}
                                >
                                    <config.icon size={20} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="z-[1001]">
                                <p>{config.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                ))}
            </TooltipProvider>
        </div>
    );
}; 