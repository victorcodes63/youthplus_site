import { VentureDetailPage } from "@/components/ventures/VentureDetailPage";
import { VENTURES } from "@/data/ventures";

export default function AllAXSVenturePage() {
  const venture = VENTURES.find((item) => item.slug === "allaxs");

  if (!venture) return null;

  return <VentureDetailPage venture={venture} />;
}
