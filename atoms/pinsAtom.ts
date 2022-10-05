import { atom } from "recoil";
import { Pin } from "@prisma/client";
import { Pins } from "@/types/types";

export const currentMode = atom({
  key: "currentMode",
  default: "learn",
});

export const fetchedPins = atom<Pin[]>({
  key: "fetchedPins",
  default: [],
});

export const formValues = atom<Omit<Pins, "id">>({
  key: "formValues",
  default: {
    name: null,
    latitude: null,
    longitude: null,
    shape: "icons/mountain/neutral.svg",
  },
});
