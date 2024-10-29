'use client';

import { PinDetails, PinType } from "@/types/pins";
import { ICONS_CONFIG } from "@/components/map/icons-config";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Marker } from "react-leaflet";
import { createDynamicIcon } from "./map/icons-config";
import { DomEvent } from "leaflet";

interface PinDetailsPopoverProps {
    pin: {
        id?: string;
        x: number;
        y: number;
        type: PinType;
        details?: PinDetails[PinType];
    };
}

export function PinDetailsPopover({ pin }: PinDetailsPopoverProps) {
    const type = pin.type;
    const config = ICONS_CONFIG[type];
    const details = pin.details;

    if (!details) return null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div>
                    <Marker
                        position={[pin.y, pin.x]}
                        icon={createDynamicIcon(pin.type)}
                        eventHandlers={{
                            click: (e) => {
                                DomEvent.stopPropagation(e.originalEvent);
                            },
                        }}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="flex items-center gap-2 mb-4">
                    <config.icon className="h-5 w-5" style={{ color: config.color }} />
                    <span className="font-semibold">{details.name}</span>
                </div>

                <div className="space-y-2">
                    {'elevation' in details && (
                        <div>
                            <p className="text-sm font-medium">Elevation</p>
                            <p className="text-sm">{details.elevation} m</p>
                        </div>
                    )}
                    {'capacity' in details && (
                        <div>
                            <p className="text-sm font-medium">Capacity</p>
                            <p className="text-sm">{details.capacity} people</p>
                        </div>
                    )}
                    {'depth' in details && (
                        <div>
                            <p className="text-sm font-medium">Depth</p>
                            <p className="text-sm">{details.depth} m</p>
                        </div>
                    )}
                    {'length' in details && (
                        <div>
                            <p className="text-sm font-medium">Length</p>
                            <p className="text-sm">{details.length} km</p>
                        </div>
                    )}
                    {details.description && (
                        <div>
                            <p className="text-sm font-medium">Description</p>
                            <p className="text-sm whitespace-pre-wrap">{details.description}</p>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
} 