import dynamic from "next/dynamic";

const PlaceholderPin = dynamic(() => import("./PlaceholderPin"), {
  ssr: false,
});

export default PlaceholderPin;
