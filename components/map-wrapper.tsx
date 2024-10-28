'use client'

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), { ssr: false });

export const MapWrapper = () => {
    return <div className="h-screen w-full"><Map /></div>;
}
