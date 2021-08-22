import { Product } from "../Product/types";
import ThreeForTwoDiscountRule from "./ThreeForTwoDiscountRule";
import { Discount } from "./types";

const appleTvProduct: Product = {
  sku: "atv",
  name: "Apple TV",
  price: 109.5,
};
const discount: Discount = {
  name: "Apple TV 3 for 2 deal",
  amount: appleTvProduct.price,
};

describe("test getDiscountItems", () => {
  const rule = new ThreeForTwoDiscountRule({
    name: discount.name,
    sku: appleTvProduct.sku,
    amount: appleTvProduct.price,
  });

  it("should return 0 discounts when 3 Apple TV are ordered", () => {
    const orderProducts: Product[] = [appleTvProduct];
    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = [];
    expect(resultDiscounts).toEqual(expectedDiscounts);
  });

  it("should return 1 discount when 3 Apple TV are ordered", () => {
    const orderProducts: Product[] = Array(3).fill(appleTvProduct);
    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = [discount];
    expect(resultDiscounts).toEqual(expectedDiscounts);
  });

  it("should return 2 discounts when 6 Apple TV are ordered", () => {
    const orderProducts: Product[] = Array(6).fill(appleTvProduct);
    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = [discount, discount];
    expect(resultDiscounts).toEqual(expectedDiscounts);
  });

  it("should return 2 discounts when 6 Apple TV, 6 MacBook Pro are ordered", () => {
    const mbpProducts = Array(6).fill({
      sku: "mbp",
      name: "MacBook Pro",
      price: 1399.99,
    });

    const iPadProducts: Product[] = Array(6).fill(appleTvProduct);
    const orderProducts: Product[] = [...mbpProducts, ...iPadProducts];

    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = [discount, discount];
    expect(resultDiscounts).toEqual(expectedDiscounts);
  });

  it("should return 2 discounts when 8 Apple TV are ordered", () => {
    const orderProducts: Product[] = Array(8).fill(appleTvProduct);
    const resultDiscounts = rule.getDiscounts(orderProducts);

    const expectedDiscounts: Discount[] = [discount, discount];
    expect(resultDiscounts).toEqual(expectedDiscounts);
  });
});
