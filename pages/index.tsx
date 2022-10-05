import { Suspense, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRecoilState, useRecoilValue } from "recoil";
import { Pin } from "@prisma/client";
import { currentMode, fetchedPins } from "@/atoms/pinsAtom";
import EditPanel from "@/components/EditPanel";
import { prisma } from "@/lib/prisma";
import Map from "@/components/Map";
import Pins from "@/components/Pins";
import PlaceholderPin from "@/components/PlaceholderPin";
import RandomPin from "@/components/RandomPin";

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.pin.findMany();
  return {
    props: {
      data,
    },
  };
};

interface IPins {
  data: Pin[];
}

const Study = ({ data }: IPins) => {
  const mode = useRecoilValue(currentMode);
  const [pins, setPins] = useRecoilState(fetchedPins);

  useEffect(() => {
    setPins(data);
  }, []);

  return (
    <Suspense fallback={"Loading..."}>
      <Map>
        {mode !== "game" &&
          pins.map((item) => {
            return <Pins key={item.id} item={item} />;
          })}
        {mode === "game" && <RandomPin data={pins} />}
        {mode === "edit" && <PlaceholderPin />}
      </Map>
      {mode === "edit" && <EditPanel />}
    </Suspense>
  );
};

export default Study;
