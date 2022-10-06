import { ChangeEvent, useState } from "react";

const useCompare = (name: string, shape: string) => {
  const [pinUrl, setPinUrl] = useState(shape);

  // Compare input value with current pin name
  const valueCompare = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /[^\w\s.-_\/]/g;
    const regexPolish = /\u0142/g;

    const value = e.target.value
      .toLowerCase()
      .replace(regexPolish, "l")
      .normalize("NFKD")
      .replace(regex, "");

    const pinName = name
      .toLowerCase()
      .replace(regexPolish, "l")
      .normalize("NFKD")
      .replace(regex, "");

    // If input value matches or doesn't match pin name, set pinUrl to the appropriate color
    if (pinName !== value) {
      setPinUrl(`${shape.substring(0, shape.lastIndexOf("/"))}/wrong.svg`);
    } else {
      setPinUrl(`${shape.substring(0, shape.lastIndexOf("/"))}/correct.svg`);
    }
  };

  return [pinUrl, setPinUrl, valueCompare] as const;
};

export default useCompare;
