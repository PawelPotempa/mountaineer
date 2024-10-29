'use client';

import { DomEvent } from "leaflet";
import { Marker } from "react-leaflet";
import { useState } from "react";
import { Pin, PinType, PinDetails } from "@/types/pins";
import { useUpdatePin, useDeletePin } from "@/hooks/use-pins";
import { toast } from "sonner";
import { createDynamicIcon } from "./icons-config";
import { PinDialog } from "../pin-dialog";
import { PinDetailsPopover } from "../pin-details-popover";

interface ExistingPinsProps {
    pins: Pin[];
    mode: 'learn' | 'edit' | 'game';
}

export const ExistingPins = ({ pins, mode }: ExistingPinsProps) => {
    const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const updatePin = useUpdatePin();
    const deletePin = useDeletePin();

    const handlePinClick = (pin: Pin) => {
        if (mode === 'game') return;
        setSelectedPin(pin);
        setDialogOpen(true);
    };

    const handleUpdatePin = async (details: PinDetails[PinType]) => {
        if (!selectedPin) return;

        updatePin.updatePinAsync(
            {
                id: selectedPin.id,
                details,
            },
            {
                onSuccess: () => {
                    setDialogOpen(false);
                    setSelectedPin(null);
                    toast.success('Punkt został zaktualizowany');
                },
                onError: (error) => {
                    toast.error(error instanceof Error ? error.message : "Nie udało się zaktualizować punktu");
                },
            }
        );
    };

    const handleDeletePin = () => {
        if (!selectedPin) return;

        deletePin.deletePinAsync(selectedPin.id, {
            onSuccess: () => {
                setDialogOpen(false);
                setSelectedPin(null);
                toast.success('Punkt został usunięty');
            },
            onError: (error) => {
                toast.error(error instanceof Error ? error.message : "Nie udało się usunąć punktu");
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
            {mode === 'learn' ? (
                pins.map(pin => (
                    <PinDetailsPopover key={pin.id} pin={pin} />
                ))
            ) : (
                pins.map(pin => (
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
                ))
            )}
            {selectedPin && mode === 'edit' && (
                <PinDialog
                    pin={selectedPin}
                    mode="edit"
                    open={dialogOpen}
                    onOpenChange={handleDialogClose}
                    onSubmit={handleUpdatePin}
                    onDelete={handleDeletePin}
                    isDeletePending={deletePin.isPending}
                    isSubmitPending={updatePin.isPending}
                />
            )}
        </>
    );
}; 