import dynamic from "next/dynamic";

const Pins = dynamic(() => import("./Pins"), {
  ssr: false,
});

export default Pins;
