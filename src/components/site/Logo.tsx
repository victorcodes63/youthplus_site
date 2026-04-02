"use client";

import Image from "next/image";
import Link from "next/link";
import { brandAssetPath } from "@/lib/brandAssetPath";

const MOBILE_HEADER_SRC = brandAssetPath("youthblackheaderm.png");
const WORDMARK_WEBP_SRC = brandAssetPath("youthlogo.webp");

/** Phone: `youthblackheaderm.png`. Tablet+ (`md+`): `youthlogo.webp` wordmark. */
export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center min-w-0"
      aria-label="Youth+ Africa Home"
    >
      <div className="relative h-11 w-11 shrink-0 md:hidden">
        <Image
          src={MOBILE_HEADER_SRC}
          alt=""
          fill
          className="object-contain object-left"
          sizes="44px"
          priority
        />
      </div>
      <div className="relative hidden h-12 w-[200px] shrink-0 md:block lg:hidden">
        <Image
          src={WORDMARK_WEBP_SRC}
          alt="Youth+ Africa logo"
          fill
          className="object-contain object-left"
          sizes="200px"
          priority
        />
      </div>
      <div className="relative hidden h-12 w-[220px] shrink-0 lg:block xl:h-14 xl:w-[260px]">
        <Image
          src={WORDMARK_WEBP_SRC}
          alt="Youth+ Africa logo"
          fill
          className="object-contain object-left"
          sizes="(max-width: 1279px) 220px, 260px"
          priority
        />
      </div>
    </Link>
  );
}
