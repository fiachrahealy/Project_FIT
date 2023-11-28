import { NutritionalInfo } from "./nutritional-info.interface";
import { User } from "./user.interface";

export interface CurrentUser extends User {
  email: string;
  height: number;
  nutritionalGoals: NutritionalInfo;
}
