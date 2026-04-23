import type { ComponentType } from "react";
import type { PropertyData, TemplateId } from "@/lib/types";
import { NewListingPost } from "./NewListingPost";
import { WeeklyDealStory } from "./WeeklyDealStory";
import { SoldCard } from "./SoldCard";
import { InfoCard } from "./InfoCard";
import { GaleriVitrin } from "./GaleriVitrin";

export const TEMPLATE_COMPONENTS: Record<
  TemplateId,
  ComponentType<{ data: PropertyData }>
> = {
  "yeni-portfoy": NewListingPost,
  "haftanin-firsati": WeeklyDealStory,
  satildi: SoldCard,
  "bilgi-karti": InfoCard,
  "galeri-vitrin": GaleriVitrin,
};
