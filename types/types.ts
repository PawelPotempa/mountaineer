import { ReactNode } from "react";
import { Pin } from "@prisma/client";

// Wrapper that allows for modifying already declared types
export type Modify<T, R> = Omit<T, keyof R> & R;

export type Pins = Modify<
  Pin,
  {
    name: string | null;
    latitude: number | null;
    longitude: number | null;
    altitude?: string;
    keystone_1?: string;
    keystone_2?: string;
    notes?: string;
  }
>;

export type ChildrenProps = {
  children?: ReactNode;
};
