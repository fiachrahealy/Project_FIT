import { Meal } from "./meal.interface";
import { User } from "./user.interface";

export interface FoodDiaryEntry {
  ID: string;
  meals: Meal[];
  date: Date;
  createdBy: User;
}
