import type { ComponentType } from "react";
import type {
  KartvizitData,
  KartvizitTemplateId,
} from "@/lib/kartvizit-types";
import { KartvizitMinimal } from "./Minimal";
import { KartvizitKurumsal } from "./Kurumsal";
import { KartvizitLuks } from "./Luks";

export const KARTVIZIT_COMPONENTS: Record<
  KartvizitTemplateId,
  ComponentType<{ data: KartvizitData }>
> = {
  minimal: KartvizitMinimal,
  kurumsal: KartvizitKurumsal,
  luks: KartvizitLuks,
};
