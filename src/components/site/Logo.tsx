"use client";

import Image from "next/image";
import Link from "next/link";

const ICON_SRC = encodeURI("/brand/Y+ Icon Black@3x.png");
const WORDMARK_PNG_SRC = encodeURI("/brand/Youth+ Logos - RGB-02.png");
const WORDMARK_WEBP_SRC = encodeURI("/brand/youthlogo.webp");

/** Phone: Y+ mark. Tablet (`md`–`lg`): PNG wordmark. Desktop (`lg+`): `youthlogo.webp`. */
export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center min-w-0"
      aria-label="Youth+ Africa Home"
    >
      <div className="relative h-11 w-11 shrink-0 md:hidden">
        <Image
          src={ICON_SRC}
          alt=""
          fill
          className="object-contain object-left"
          sizes="44px"
          priority
        />
      </div>
      <div className="relative hidden h-12 w-[200px] shrink-0 md:block lg:hidden">
        <Image
          src={WORDMARK_PNG_SRC}
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
