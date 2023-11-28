import { User } from "./user.interface";

export interface WeightDiaryEntry {
  ID: string;
  weight: number;
  date: Date;
  createdBy: User;
}
