'use client';

import { CRS, LatLngExpression, LatLngBoundsExpression } from "leaflet";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { PinType, PinDetails, Pin } from "@/types/pins";
import { useSuspenseQuery } from "@tanstack/react-query";
import { clientPinOptions } from "@/queries/pins";
import { toast } from "sonner";
import { useCreatePin } from "@/hooks/use-pins";
import { createDynamicIcon } from "./icons-config";
import { IconSelector } from "./icon-selector";
import { ExistingPins } from "./existing-pins";
import { PinDialog } from "../pin-dialog";
import { GameQuestion } from "../game-question";

const MapEvents = () => {
    const [selectedType, setSelectedType] = useState<PinType>('peak');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingPin, setPendingPin] = useState<{ x: number; y: number; type: PinType } | null>(null);
    const [cursorPosition, setCursorPosition] = useState<L.LatLng | null>(null);
    const createPin = useCreatePin();

    /* eslint-disable */
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
        mousemove: (e) => {
            const target = e.originalEvent.target as HTMLElement;
            const isOverMarker = target.closest('.leaflet-marker-icon') !== null;

            if (dialogOpen || isOverMarker) {
                setCursorPosition(null);
            } else {
                setCursorPosition(e.latlng);
            }
        },
        mouseout: () => {
            setCursorPosition(null);
        },
    });

    const handleCreatePin = async (details: PinDetails[PinType]) => {
        if (!pendingPin) return;

        createPin.createPinAsync(
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
            <IconSelector selectedType={selectedType} onTypeSelect={setSelectedType} />
            {cursorPosition && (
                <Marker
                    position={cursorPosition}
                    icon={createDynamicIcon(selectedType)}
                    interactive={false}
                    opacity={0.5}
                />
            )}
            {pendingPin && (
                <Marker position={[pendingPin.y, pendingPin.x]} icon={createDynamicIcon(pendingPin.type)} />
            )}
            {pendingPin && (
                <PinDialog
                    pin={pendingPin}
                    mode="create"
                    open={dialogOpen}
                    onOpenChange={handleDialogClose}
                    onSubmit={handleCreatePin}
                    isSubmitPending={createPin.isPending}
                />
            )}
        </>
    );
};

interface MapProps {
    mode: 'learn' | 'edit' | 'game';
}

const Map = ({ mode }: MapProps) => {
    const { data: pins } = useSuspenseQuery(clientPinOptions);
    const [gamePin, setGamePin] = useState<Pin | null>(null);
    const [questionOpen, setQuestionOpen] = useState(false);
    const mapRef = useRef<L.Map | null>(null);

    const getRandomPin = useCallback((excludePin?: Pin) => {
        const availablePins = excludePin
            ? pins.filter(p => p.id !== excludePin.id)
            : pins;
        return availablePins[Math.floor(Math.random() * availablePins.length)];
    }, [pins]);

    const panToPin = useCallback((pin: Pin) => {
        if (!mapRef.current) return;
        mapRef.current.panTo([pin.y, pin.x], {
            duration: 1,
            easeLinearity: 0.5
        });
    }, []);

    const handleNextPin = useCallback(() => {
        if (mode === 'game' && gamePin) {
            const nextPin = getRandomPin(gamePin);
            setGamePin(nextPin);
            panToPin(nextPin);
            setQuestionOpen(true);
        }
    }, [mode, gamePin, getRandomPin, panToPin]);

    const initialPin = useMemo(() => {
        if (mode === 'game' && pins.length > 0) {
            const firstPin = getRandomPin();
            setQuestionOpen(true);
            return firstPin;
        }
        return null;
    }, [mode, pins, getRandomPin]);

    useEffect(() => {
        if (initialPin) {
            setGamePin(initialPin);
        }
    }, [initialPin]);

    const initialCenter = useMemo((): LatLngExpression => {
        if (mode === 'game' && initialPin) {
            return [initialPin.y, initialPin.x];
        }
        return [-128, 128];
    }, [mode, initialPin]);

    const bounds: LatLngBoundsExpression = [[-256, 0], [0, 256]];

    return (
        <div className="h-screen w-full">
            <MapContainer
                key="map"
                className="h-full w-full"
                center={initialCenter}
                maxBounds={bounds}
                maxBoundsViscosity={1}
                zoom={5}
                zoomControl={false}
                zoomSnap={1}
                minZoom={4}
                maxZoom={7}
                doubleClickZoom={false}
                crs={CRS.Simple}
                ref={mapRef}
            >
                {mode === 'edit' && <MapEvents />}
                <ExistingPins
                    pins={mode === 'game' ? (gamePin ? [gamePin] : []) : pins}
                    mode={mode}
                />
                <TileLayer
                    tileSize={256}
                    minZoom={4}
                    maxNativeZoom={5}
                    noWrap={true}
                    bounds={bounds}
                    attribution=""
                    url={mode === 'game' ? "/noText/{z}/{x}/{y}.png" : "/withText/{z}/{x}/{y}.png"}
                />
            </MapContainer>
            {mode === 'game' && (
                <GameQuestion
                    pin={gamePin}
                    open={questionOpen}
                    onNextPin={handleNextPin}
                />
            )}
        </div>
    );
};

export default Map; 