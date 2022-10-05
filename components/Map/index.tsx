import dynamic from "next/dynamic";
import { memo } from "react";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default memo(Map);
