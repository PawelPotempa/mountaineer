import dynamic from "next/dynamic";

const RandomPin = dynamic(() => import("./RandomPin"), {
  ssr: false,
});

export default RandomPin;
