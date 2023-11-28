import { NutritionalInfo } from "./nutritional-info.interface";

export interface ItemInfo extends NutritionalInfo {
  name: string;
  amount: number;
  unit: string;
}
