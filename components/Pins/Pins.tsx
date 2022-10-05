import styles from "./Pins.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { LatLngBoundsExpression } from "leaflet";
import { ImageOverlay, Popup } from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { Pin } from "@prisma/client";
import { currentMode, fetchedPins } from "@/atoms/pinsAtom";
import useCompare from "@/hooks/useCompare";

const Pins = ({ item }: { item: Pin }) => {
  const { status } = useSession();
  const [pinUrl, setPinUrl, valueCompare] = useCompare(item.name, item.shape);

  const [hint, setHint] = useState(false);

  const [pins, setPins] = useRecoilState(fetchedPins);
  const mode = useRecoilValue(currentMode);

  const bounds: LatLngBoundsExpression = [
    [item.latitude - 0.34, item.longitude - 0.34],
    [item.latitude + 0.34, item.longitude + 0.34],
  ];

  const deletePin = async () => {
    await fetch("/api/pins", {
      method: "DELETE",
      body: JSON.stringify({ name: item.name }),
    });
    const newItems = pins.filter((i) => i.name !== item.name);
    setPins(newItems);
  };

  return (
    <ImageOverlay
      alt={item.name}
      key={item.id}
      bounds={bounds}
      interactive={true}
      url={mode === "practice" ? pinUrl : item.shape}
    >
      <Popup>
        {mode === "practice" && (
          <div className={styles.input__wrapper}>
            <input
              autoFocus
              className={styles.input}
              onChange={valueCompare}
            ></input>
            <button
              className={styles.hint__button}
              onClick={() => setHint((prev) => !prev)}
            >
              Pokaż podpowiedź
            </button>
            {hint && <p className={styles.hint__text}>{item.name}</p>}
          </div>
        )}

        {mode !== "practice" && mode !== "game" && (
          <div className={styles.popup}>
            <h1 className={styles.popup__name}>
              {item.name} {item.altitude && `(${item.altitude})`}
            </h1>
            {item.notes && <p>{item.notes}</p>}
            {item.keystone_1 && <p>Zwornik: {item.keystone_1}</p>}
            {item.keystone_2 && <p>Zwornik: {item.keystone_2}</p>}
          </div>
        )}
        {status === "authenticated" && mode !== "practice" && mode !== "game" && (
          <div className={styles.delete__container}>
            <button className={styles.delete__button} onClick={deletePin}>
              <span className={styles.delete__icon}></span>
            </button>
          </div>
        )}
      </Popup>
    </ImageOverlay>
  );
};

export default Pins;
