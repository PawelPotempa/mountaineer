'use client';

import { DomEvent } from "leaflet";
import { Marker } from "react-leaflet";
import { useState } from "react";
import { Pin, PinType, PinDetails } from "@/types/pins";
import { useUpdatePin, useDeletePin } from "@/hooks/use-pins";
import { toast } from "sonner";
import { createDynamicIcon } from "./icons-config";
import { PinDialog } from "../pin-dialog";

interface ExistingPinsProps {
    pins: Pin[];
}

export const ExistingPins = ({ pins }: ExistingPinsProps) => {
    const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const updatePin = useUpdatePin();
    const deletePin = useDeletePin();

    const handlePinClick = (pin: Pin) => {
        setSelectedPin(pin);
        setDialogOpen(true);
    };

    const handleUpdatePin = async (details: PinDetails[PinType]) => {
        if (!selectedPin) return;

        updatePin.mutate(
            {
                id: selectedPin.id,
                details,
            },
            {
                onSuccess: () => {
                    setDialogOpen(false);
                    setSelectedPin(null);
                    toast.success('Pin updated successfully');
                },
                onError: (error) => {
                    toast.error(error instanceof Error ? error.message : "Failed to update pin");
                },
            }
        );
    };

    const handleDeletePin = () => {
        if (!selectedPin) return;

        deletePin.mutate(selectedPin.id, {
            onSuccess: () => {
                setDialogOpen(false);
                setSelectedPin(null);
                toast.success('Pin deleted successfully');
            },
            onError: (error) => {
                toast.error(error instanceof Error ? error.message : "Failed to delete pin");
            },
        });
    };

    const handleDialogClose = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            setSelectedPin(null);
        }
    };

    return (
        <>
            {pins.map(pin => (
                <Marker
                    key={pin.id}
                    position={[pin.y, pin.x]}
                    icon={createDynamicIcon(pin.type)}
                    eventHandlers={{
                        click: (e) => {
                            DomEvent.stopPropagation(e.originalEvent);
                            handlePinClick(pin);
                        },
                    }}
                />
            ))}
            {selectedPin && (
                <PinDialog
                    pin={selectedPin}
                    mode="edit"
                    open={dialogOpen}
                    onOpenChange={handleDialogClose}
                    onSubmit={handleUpdatePin}
                    onDelete={handleDeletePin}
                />
            )}
        </>
    );
}; 