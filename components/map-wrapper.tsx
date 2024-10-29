'use client'

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), { ssr: false });

interface MapWrapperProps {
    mode: 'learn' | 'edit' | 'game';
}

export const MapWrapper = ({ mode }: MapWrapperProps) => {
    return (
        <div className="h-screen w-full">
            <Map mode={mode} />
        </div>
    );
}
