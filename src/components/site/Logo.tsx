"use client";

import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center min-w-0"
      aria-label="Youth+ Africa Home"
    >
      <div className="relative h-14 w-[170px] shrink-0">
        <Image
          src="/brand/youthlogo.webp"
          alt="Youth+ Africa logo"
          fill
          className="object-contain object-center"
          sizes="170px"
          priority
        />
      </div>
    </Link>
  );
}

