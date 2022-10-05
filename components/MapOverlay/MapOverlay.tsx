import { LayersControl, TileLayer } from "react-leaflet";
import { useRecoilValue } from "recoil";
import { currentMode } from "@/atoms/pinsAtom";

const MapOverlay = () => {
  const mode = useRecoilValue(currentMode);

  return (
    <>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked={true} name="Practice Map">
          <TileLayer
            tileSize={256}
            maxNativeZoom={5}
            noWrap={true}
            url="withText/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={mode === "practice" || mode === "game"}
          name="Practice Map"
        >
          <TileLayer
            tileSize={256}
            maxNativeZoom={5}
            noWrap={true}
            url="noText/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </>
  );
};

export default MapOverlay;
