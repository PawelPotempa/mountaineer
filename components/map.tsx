'use client';

import { CRS, LatLngExpression, LatLngBoundsExpression, Icon } from "leaflet";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";
import { Pin } from "@/types/pins";
import { useSuspenseQuery } from "@tanstack/react-query";
import { clientPinOptions } from "@/queries/pins";
import { toast } from "sonner";
import { useCreatePin } from "@/hooks/use-pins";

// Create a custom pin icon
const pinIcon = new Icon({
    iconUrl: '/pin.svg',
    iconSize: [25, 25],
    iconAnchor: [12, 25],
});

// Create a new component for handling map events and pin creation
const MapEvents = () => {
    const [cursorPos, setCursorPos] = useState<LatLngExpression | null>(null);
    const createPin = useCreatePin();

    const map = useMapEvents({
        mousemove: (e) => {
            setCursorPos(e.latlng);
        },
        click: async (e) => {

            createPin.mutate(
                {
                    x: e.latlng.lng,
                    y: e.latlng.lat,
                },
                {
                    onSuccess: () => {
                        toast.success('Pin created successfully');
                    },
                    onError: (error) => {
                        toast.error(error instanceof Error ? error.message : "Failed to create pin");
                    },
                }
            );
        },
    });

    return cursorPos ? (
        <Marker
            position={cursorPos}
            icon={pinIcon}
            opacity={0.5}
        />
    ) : null;
};

const ExistingPins = ({ pins }: { pins: Pin[] }) => {
    return (
        <>
            {pins.map(pin => (
                <Marker
                    key={pin.id}
                    position={[pin.y, pin.x]}
                    icon={pinIcon}
                />
            ))}
        </>
    );
};

const Map = () => {
    const { data: pins } = useSuspenseQuery(clientPinOptions);

    const position: LatLngExpression = [-128, 128];
    const bounds: LatLngBoundsExpression = [
        [-256, 0],    // [South, West]
        [0, 256],     // [North, East]
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
