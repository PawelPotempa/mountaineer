'use client';

import { PinDetails, PinType } from "@/types/pins";
import { ICONS_CONFIG } from "@/components/map/icons-config";
import { Marker, Popup } from "react-leaflet";
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
        <Marker
            position={[pin.y, pin.x]}
            icon={createDynamicIcon(pin.type)}
            eventHandlers={{
                click: (e) => {
                    DomEvent.stopPropagation(e.originalEvent);
                },
            }}
        >
            <Popup closeButton={false}>
                <div className="min-w-80 w-fit rounded-lg border bg-popover text-popover-foreground shadow-lg ring-offset-background transition-all">
                    <div className="p-4 space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b">
                            <config.icon className="h-5 w-5" style={{ color: config.color }} />
                            <span className="font-semibold">{details.name}</span>
                        </div>

                        <div className="space-y-2">
                            {'elevation' in details && details.elevation && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Elevation</span>
                                    <span className="font-medium">{details.elevation} m</span>
                                </div>
                            )}
                            {'capacity' in details && details.capacity && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Capacity</span>
                                    <span className="font-medium">{details.capacity} people</span>
                                </div>
                            )}
                            {'depth' in details && details.depth && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Depth</span>
                                    <span className="font-medium">{details.depth} m</span>
                                </div>
                            )}
                            {'length' in details && details.length && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Length</span>
                                    <span className="font-medium">{details.length} km</span>
                                </div>
                            )}
                        </div>

                        {details.description && (
                            <div className="pt-2 border-t">
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{details.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </Popup>
        </Marker>
    );
} 