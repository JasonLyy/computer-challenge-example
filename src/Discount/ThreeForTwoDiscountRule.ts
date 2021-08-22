import { Product } from "../Product/types";
import { Discount, DiscountRuleConfig } from "./types";
import IDiscountRule from "./DiscountRuleInterface";

export default class ThreeForTwoDiscountRule implements IDiscountRule {
  #config: DiscountRuleConfig;

  constructor(config: DiscountRuleConfig) {
    this.#config = config;
  }

  getDiscounts(orderProducts: Product[]): Discount[] {
    const productCount = orderProducts.filter(
      (p) => p.sku === this.#config.sku
    ).length;
    const discountQuantity = Math.floor(productCount / 3);

    const discounts = Array(discountQuantity).fill({
      name: this.#config.name,
      amount: this.#config.amount,
    });

    return discounts;
  }
}
