import { Product } from "../Product/types";

export default interface ICheckoutService {
  scan(item: Product): Product;
  total(): number;
}
