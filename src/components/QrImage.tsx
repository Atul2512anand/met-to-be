"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QrImage({ uri }: { uri: string }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(uri, {
      width: 240,
      margin: 1,
      color: { dark: "#231C16", light: "#FFFDF9" },
    })
      .then((url) => {
        if (active) setSrc(url);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [uri]);

  if (!src) {
    return <div className="h-[240px] w-[240px] animate-pulse rounded-lg bg-linen" />;
  }

  return <img src={src} alt="UPI payment QR code" width={240} height={240} />;
}
