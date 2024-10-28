'use client';

import { CRS, LatLngExpression, LatLngBoundsExpression, DomEvent } from "leaflet";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";
import { PinType, PinDetails } from "@/types/pins";
import { useSuspenseQuery } from "@tanstack/react-query";
import { clientPinOptions } from "@/queries/pins";
import { toast } from "sonner";
import { useCreatePin } from "@/hooks/use-pins";
import { createDynamicIcon } from "./icons-config";
import { IconSelector } from "./icon-selector";
import { ExistingPins } from "./existing-pins";
import { PinDialog } from "../pin-dialog";

const MapEvents = () => {
    const [selectedType, setSelectedType] = useState<PinType>('peak');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingPin, setPendingPin] = useState<{ x: number; y: number; type: PinType } | null>(null);
    const createPin = useCreatePin();

    const map = useMapEvents({
        click: (e) => {
            const target = e.originalEvent.target as HTMLElement;
            const isOverMarker = target.closest('.leaflet-marker-icon') !== null;

            if (!isOverMarker && !dialogOpen) {
                setPendingPin({
                    x: e.latlng.lng,
                    y: e.latlng.lat,
                    type: selectedType,
                });
                setDialogOpen(true);
            }
        },
    });

    const handleCreatePin = async (details: PinDetails[PinType]) => {
        if (!pendingPin) return;

        createPin.mutate(
            {
                ...pendingPin,
                details,
            },
            {
                onSuccess: () => {
                    setDialogOpen(false);
                    setPendingPin(null);
                    toast.success('Punkt został dodany');
                },
                onError: (error) => {
                    toast.error(error instanceof Error ? error.message : "Nie udało się dodać punktu");
                },
            }
        );
    };

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            setPendingPin(null);
        }
        setDialogOpen(open);
    };

    return (
        <>
            <IconSelector
                selectedType={selectedType}
                onTypeSelect={setSelectedType}
            />
            {pendingPin && (
                <Marker
                    position={[pendingPin.y, pendingPin.x]}
                    icon={createDynamicIcon(pendingPin.type)}
                />
            )}
            {pendingPin && (
                <PinDialog
                    pin={pendingPin}
                    mode="create"
                    open={dialogOpen}
                    onOpenChange={handleDialogClose}
                    onSubmit={handleCreatePin}
                />
            )}
        </>
    );
};

const Map = () => {
    const { data: pins } = useSuspenseQuery(clientPinOptions);

    const position: LatLngExpression = [-128, 128];
    const bounds: LatLngBoundsExpression = [
        [-256, 0],
        [0, 256],
    ];

    return (
        <div className="h-screen w-full">
            <MapContainer
                key="map"
                className="h-full w-full"
                center={position}
                maxBounds={bounds}
                maxBoundsViscosity={1}
                zoom={4}
                zoomControl={false}
                zoomSnap={1}
                minZoom={4}
                maxZoom={7}
                doubleClickZoom={false}
                crs={CRS.Simple}
            >
                <MapEvents />
                <ExistingPins pins={pins} />
                <TileLayer
                    tileSize={256}
                    minZoom={4}
                    maxNativeZoom={5}
                    noWrap={true}
                    bounds={bounds}
                    attribution=""
                    url="/withText/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};

export default Map; 