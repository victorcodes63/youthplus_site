import { VentureDetailPage } from "@/components/ventures/VentureDetailPage";
import { VENTURES } from "@/data/ventures";

export default function ConnectVenturePage() {
  const venture = VENTURES.find((item) => item.slug === "connect");

  if (!venture) return null;

  return <VentureDetailPage venture={venture} />;
}
