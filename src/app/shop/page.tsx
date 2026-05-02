import Link from "next/link";

const PRODUCTS = [
  {
    name: "Youth+ Water Bottle",
    category: "Hydration",
    price: "KES 1,800",
    details: "Insulated stainless steel bottle with engraved Youth+ Africa mark.",
  },
  {
    name: "Youth+ Signature Hoodie",
    category: "Apparel",
    price: "KES 4,900",
    details: "Premium cotton blend hoodie for cool festival evenings and travel days.",
  },
  {
    name: "Youth+ Tote Bag",
    category: "Essentials",
    price: "KES 1,400",
    details: "Durable canvas tote sized for notebooks, tablets, and daily carry.",
  },
  {
    name: "Youth Plus Festival Cap",
    category: "Accessories",
    price: "KES 1,950",
    details: "Structured cap with adjustable fit and clean embroidered crest.",
  },
];

export default function ShopPage() {
  return (
    <main className="bg-white text-[#0A0A0A]">
      <section className="page mx-auto max-w-[1440px] py-14 md:py-20">
        <div className="max-w-[760px]">
          <p className="text-[12px] font-[700] tracking-[0.12em] uppercase text-secondary">
            Shop
          </p>
          <h1 className="mt-4 text-[34px] md:text-[48px] leading-[1.02] tracking-[-0.04em] font-[900] text-primary">
            Youth+ Africa Merchandise
          </h1>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-secondary max-w-[64ch]">
            Wear the movement. Submit a purchase request for official Youth+ items,
            and our team will follow up with availability and delivery options.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {PRODUCTS.map((product) => (
            <article
              key={product.name}
              className="rounded-md border border-borderLight bg-white p-5 md:p-6 shadow-[0_8px_28px_rgba(10,10,10,0.05)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="inline-flex items-center rounded-md border border-accent/70 bg-accent/10 px-2.5 py-1 text-[10px] font-[800] tracking-[0.1em] uppercase text-[#0A0A0A]">
                {product.category}
              </div>

              <h2 className="mt-4 text-[22px] leading-[1.12] tracking-[-0.02em] font-[900] text-primary">
                {product.name}
              </h2>

              <p className="mt-3 text-[14px] leading-[1.65] text-secondary">
                {product.details}
              </p>

              <div className="mt-5 text-[24px] leading-none tracking-[-0.02em] font-[900] text-accent">
                {product.price}
              </div>

              <Link
                href={`mailto:team@youthplus.africa?subject=Make%20purchase%20request%20-%20${encodeURIComponent(product.name)}`}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#0A0A0A] px-4 text-[14px] font-[800] text-white transition-colors hover:bg-accent hover:text-[#0A0A0A]"
              >
                Make purchase request
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
