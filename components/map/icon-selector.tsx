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
            className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-lg flex gap-2 items-center"
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
                                    className="p-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                                    style={{
                                        backgroundColor: selectedType === type ? config.color : undefined
                                    }}
                                >
                                    <config.icon
                                        size={24}
                                        color="#000000"
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>{config.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                ))}
            </TooltipProvider>
        </div>
    );
}; 