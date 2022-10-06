import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { CRS, LatLngExpression, LatLngBoundsExpression } from "leaflet";
import { MapContainer } from "react-leaflet";
import { ChildrenProps } from "@/types/types";
import MapOverlay from "../MapOverlay";

const Map = ({ children }: ChildrenProps) => {
  // Initial camera position
  const position: LatLngExpression | undefined = [-128, 128];

  // Camera boundaries
  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [-256, 256],
  ];

  return (
    <MapContainer
      className={styles.map}
      center={position}
      maxBounds={bounds}
      maxBoundsViscosity={1}
      zoom={4}
      zoomControl={false}
      zoomSnap={0}
      minZoom={4}
      maxZoom={7}
      doubleClickZoom={false}
      crs={CRS.Simple}
    >
      <MapOverlay />
      {children}
    </MapContainer>
  );
};

export default Map;
