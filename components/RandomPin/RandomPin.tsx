import styles from "./RandomPin.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Icon } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import { Pin } from "@prisma/client";
import useCompare from "@/hooks/useCompare";

interface IPin {
  data: Pin[];
}

const RandomPin = ({ data }: IPin) => {
  const map = useMap();
  const popup = useRef<any>();

  const [randomPin, setRandomPin] = useState<Pin>(
    data[getRandomElFromArray(data.length)]
  );
  const [pinUrl, setPinUrl, valueCompare] = useCompare(
    randomPin.name,
    randomPin.shape
  );

  // Set random pin on map with every change
  useEffect(() => {
    setPinUrl(randomPin.shape);
  }, [randomPin]);

  // If new random pin is generated, center the map on the new pin
  useEffect(() => {
    map.flyTo([randomPin?.latitude, randomPin?.longitude], 6);
    popup.current.openPopup() ?? null;
  }, [map, randomPin]);

  // Generate new random pin
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRandomPin(data[getRandomElFromArray(data.length)]);
    (e.target as HTMLFormElement).reset();
  };

  // Generate a random number between 0 and the length of the array
  function getRandomElFromArray(arrayLength: number) {
    return Math.floor(Math.random() * arrayLength);
  }

  // Create a custom icon for the random pin
  const markerIcon = new Icon({
    iconUrl: pinUrl,
    iconSize: [40, 40],
  });

  return (
    <Marker
      ref={popup}
      icon={markerIcon}
      position={[randomPin?.latitude, randomPin?.longitude]}
    >
      <Popup>
        <form className={styles.input__wrapper} onSubmit={handleSubmit}>
          <input
            autoFocus
            className={styles.input}
            onChange={valueCompare}
          ></input>
          <button>Następny</button>
        </form>
      </Popup>
    </Marker>
  );
};

export default RandomPin;
