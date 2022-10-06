import { useRef } from "react";
import { LatLngBoundsExpression } from "leaflet";
import { ImageOverlay, useMapEvents } from "react-leaflet";
import { useRecoilState } from "recoil";
import { formValues } from "@/atoms/pinsAtom";

const PlaceholderPin = () => {
  const pin = useRef<any>();
  const [form, setForm] = useRecoilState(formValues);

  // Initial pin position far away from the view
  const faraway: LatLngBoundsExpression = [
    [0, 0],
    [0, 0],
  ];

  // Set a temporary pin on the map in selected position with every click, then pan camera to that pin
  const map = useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setForm({
        ...form,
        latitude: lat,
        longitude: lng,
      });

      pin.current._bounds._northEast = {
        lat: lat + 0.34,
        lng: lng + 0.34,
      };
      pin.current._bounds._southWest = {
        lat: lat - 0.34,
        lng: lng - 0.34,
      };
      let data = { lat, lng };
      map.flyTo(data, 6, {
        duration: 0.75,
      });
    },
  });

  return (
    <ImageOverlay ref={pin} bounds={faraway} url={form.shape}></ImageOverlay>
  );
};

export default PlaceholderPin;
