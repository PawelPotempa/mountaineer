'use client'

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map/index"), { ssr: false });

export const MapWrapper = () => {
    return <div className="h-screen w-full"><Map /></div>;
}
