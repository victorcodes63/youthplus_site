"use client";

import Image from "next/image";
import type { ReactNode } from "react";

type ParallaxBandProps = {
  imageSrc: string;
  imageAlt: string;
  heightClassName?: string;
  overlayClassName?: string;
  children?: ReactNode;
};

export function ParallaxBand({
  imageSrc,
  imageAlt,
  heightClassName = "h-[220px] md:h-[280px]",
  overlayClassName = "bg-[linear-gradient(180deg,rgba(10,10,10,0.22)_0%,rgba(10,10,10,0.6)_100%)]",
  children,
}: ParallaxBandProps) {
  return (
    <section className={`relative overflow-hidden ${heightClassName}`}>
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {children ? <div className="relative z-[1] h-full">{children}</div> : null}
    </section>
  );
}
