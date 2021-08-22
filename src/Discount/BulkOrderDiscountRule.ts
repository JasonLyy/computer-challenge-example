import { Product } from "../Product/types";
import {
  Discount,
  DiscountRuleConfig as BaseDiscountRuleConfig,
} from "./types";
import IDiscountRule from "./DiscountRuleInterface";

type DiscountRuleConfig = { minBulkOrder: number } & BaseDiscountRuleConfig;
export default class BulkOrderDiscountRule implements IDiscountRule {
  #config: DiscountRuleConfig;

  constructor(config: DiscountRuleConfig) {
    this.#config = config;
  }

  getDiscounts(orderProducts: Product[]): Discount[] {
    const iPadOrderCount = orderProducts.filter(
      (p) => p.sku === this.#config.sku
    ).length;
    const bulkDiscountCount =
      iPadOrderCount > this.#config.minBulkOrder ? iPadOrderCount : 0;

    const discounts = Array(bulkDiscountCount).fill({
      name: this.#config.name,
      amount: this.#config.amount,
    });

    return discounts;
  }
}
