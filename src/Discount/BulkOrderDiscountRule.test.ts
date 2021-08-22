import { Product } from "../Product/types";
import { Discount } from "./types";
import BulkOrderDiscountRule from "./BulkOrderDiscountRule";

const iPadProduct: Product = {
  sku: "ipd",
  name: "Super iPad",
  price: 459.99,
};
const discount: Discount = {
  name: "Super iPad bulk discount",
  amount: 50,
};

describe("test getDiscounts", () => {
  const rule = new BulkOrderDiscountRule({
    name: discount.name,
    amount: discount.amount,
    sku: iPadProduct.sku,
    minBulkOrder: 4,
  });

  it("should return 0 discounts when 4 iPad are ordered", () => {
    const orderProducts: Product[] = Array(4).fill(iPadProduct);

    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = [];
    expect(expectedDiscounts).toEqual(resultDiscounts);
  });

  it("should return 5 discount when 5 iPad are ordered", () => {
    const orderProducts: Product[] = Array(5).fill(iPadProduct);

    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = Array(5).fill(discount);
    expect(expectedDiscounts).toEqual(resultDiscounts);
  });

  it("should return 15 discounts when 15 iPad are ordered", () => {
    const orderProducts: Product[] = Array(15).fill(iPadProduct);

    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = Array(15).fill(discount);
    expect(expectedDiscounts).toEqual(resultDiscounts);
  });

  it("should return 15 discounts when 15 iPad and 10 Apple TV are ordered", () => {
    const iPadProducts: Product[] = Array(15).fill(iPadProduct);
    const appleTvProducts: Product[] = Array(10).fill({
      sku: "atv",
      name: "Apple TV",
      price: 109.5,
    });

    const orderProducts = [...iPadProducts, ...appleTvProducts];
    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = Array(15).fill(discount);
    expect(expectedDiscounts).toEqual(resultDiscounts);
  });
});
