import { ItemInfo } from "./item-info.interface";
import { User } from "./user.interface";

export interface Meal {
  ID: string;
  title: string;
  imageURL: string;
  itemInfos: ItemInfo[];
  createdBy: User;
}
