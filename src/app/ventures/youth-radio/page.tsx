import { VentureDetailPage } from "@/components/ventures/VentureDetailPage";
import { VENTURES } from "@/data/ventures";

export default function YouthRadioVenturePage() {
  const venture = VENTURES.find((item) => item.slug === "youth-radio");

  if (!venture) return null;

  return <VentureDetailPage venture={venture} />;
}
