import { Product } from "../Product/types";
import IDiscountRule from "../Discount/DiscountRuleInterface";
import ICheckoutService from "./CheckoutServiceInterface";
import { Discount } from "../Discount/types";

export default class CheckoutService implements ICheckoutService {
  #items: Product[] = [];
  #rules: IDiscountRule[];

  constructor(rules: IDiscountRule[]) {
    this.#rules = rules;
  }

  scan(item: Product): Product {
    this.#items = [...this.#items, item];
    return item;
  }

  total(): number {
    const itemsTotalCost = this.#items.reduce((total, p) => {
      return total + p.price;
    }, 0);

    const discount = this.#rules
      .flatMap((r) => r.getDiscounts(this.#items))
      .reduce((total, discounts) => total + discounts.amount, 0);

    return itemsTotalCost - discount;
  }
}
