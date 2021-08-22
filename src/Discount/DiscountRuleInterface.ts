import { Discount } from "./types";
import { Product } from "../Product/types";

export default interface IDiscountRule {
  getDiscounts(products: Product[]): Discount[];
}
