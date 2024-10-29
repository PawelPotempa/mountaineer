'use client';

import { PinDetails, PinType } from "@/types/pins";
import { ICONS_CONFIG } from "@/components/map/icons-config";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface PinDetailsDialogProps {
    pin: {
        id?: string;
        x: number;
        y: number;
        type: PinType;
        details?: PinDetails[PinType];
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PinDetailsDialog({ pin, open, onOpenChange }: PinDetailsDialogProps) {
    const type = pin.type;
    const config = ICONS_CONFIG[type];
    const details = pin.details;

    if (!details) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="z-[1001]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <config.icon className="h-5 w-5" style={{ color: config.color }} />
                        <span>{details.name}</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {'elevation' in details && (
                        <div>
                            <p className="text-sm font-medium">Elevation</p>
                            <p>{details.elevation} m</p>
                        </div>
                    )}
                    {'capacity' in details && (
                        <div>
                            <p className="text-sm font-medium">Capacity</p>
                            <p>{details.capacity} people</p>
                        </div>
                    )}
                    {'depth' in details && (
                        <div>
                            <p className="text-sm font-medium">Depth</p>
                            <p>{details.depth} m</p>
                        </div>
                    )}
                    {'length' in details && (
                        <div>
                            <p className="text-sm font-medium">Length</p>
                            <p>{details.length} km</p>
                        </div>
                    )}
                    {details.description && (
                        <div>
                            <p className="text-sm font-medium">Description</p>
                            <p className="whitespace-pre-wrap">{details.description}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 