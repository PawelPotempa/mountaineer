import { Mountain, ArrowDownUp, Waves, Droplet, Home, LandPlot } from "lucide-react";
import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { PinType } from "@/types/pins";

export const ICONS_CONFIG = {
    peak: {
        icon: Mountain,
        color: "#ff8a80",
        label: "Szczyt",
    },
    pass: {
        icon: ArrowDownUp,
        color: "#b9f6ca",
        label: "Przełęcz",
    },
    river: {
        icon: Waves,
        color: "#82b1ff",
        label: "Rzeka",
    },
    lake: {
        icon: Droplet,
        color: "#80d8ff",
        label: "Jezioro",
    },
    shelter: {
        icon: Home,
        color: "#ffd180",
        label: "Schronisko",
    },
    cave: {
        icon: LandPlot,
        color: "#ea80fc",
        label: "Jaskinia",
    },
} as const;

export const createDynamicIcon = (type: PinType) => {
    const size = 32;
    const { icon: IconComponent, color } = ICONS_CONFIG[type];

    const iconHtml = renderToString(
        <div style={{
            backgroundColor: color,
            padding: '6px',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${size}px`,
            height: `${size}px`,
        }}>
            <IconComponent
                size={20}
                strokeWidth={2}
                color="#000000"
            />
        </div>
    );

    return new DivIcon({
        html: iconHtml,
        className: 'custom-pin',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
    });
}; 