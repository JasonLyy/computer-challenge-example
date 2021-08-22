import ThreeForTwoDiscountRule from "../Discount/ThreeForTwoDiscountRule";
import BulkOrderDiscountRule from "../Discount/BulkOrderDiscountRule";
import CheckoutService from "./CheckoutService";

const iPadDiscountRule = new BulkOrderDiscountRule({
  name: "rule name",
  sku: "ipd",
  amount: 50,
  minBulkOrder: 4,
});
const appleTvDiscountRule = new ThreeForTwoDiscountRule({
  name: "rule name",
  sku: "atv",
  amount: 109.5,
});

describe("test total", () => {
  it("should return full price with no rules for 3 iPad (1379.97)", () => {
    const checkout = new CheckoutService([]);

    for (let i = 0; i < 3; i++) {
      checkout.scan({
        sku: "ipd",
        name: "Super iPad",
        price: 549.99,
      });
    }

    const totalResult = checkout.total();
    expect(totalResult).toEqual(1649.97);
  });

  it("should not match any rules and return the full price for 3 iPad (1379.97)", () => {
    const checkout = new CheckoutService([
      iPadDiscountRule,
      appleTvDiscountRule,
    ]);

    for (let i = 0; i < 3; i++) {
      checkout.scan({
        sku: "ipd",
        name: "Super iPad",
        price: 549.99,
      });
    }

    const totalResult = checkout.total();
    expect(totalResult).toEqual(1649.97);
  });

  it("should match iPadDiscountRule and return discounted price for 5 iPad (2499.95)", () => {
    const checkout = new CheckoutService([
      iPadDiscountRule,
      appleTvDiscountRule,
    ]);

    for (let i = 0; i < 5; i++) {
      checkout.scan({
        sku: "ipd",
        name: "Super iPad",
        price: 549.99,
      });
    }

    const totalResult = checkout.total();
    expect(totalResult).toEqual(2499.95);
  });

  it("should match iPadDiscountRule and appleTVDiscountRle and return discounted price for 5 iPad and 10 Apple TV (3266.45)", () => {
    const checkout = new CheckoutService([
      iPadDiscountRule,
      appleTvDiscountRule,
    ]);

    for (let i = 0; i < 5; i++) {
      checkout.scan({
        sku: "ipd",
        name: "Super iPad",
        price: 549.99,
      });
    }

    for (let i = 0; i < 10; i++) {
      checkout.scan({
        sku: "atv",
        name: "Apple TV",
        price: 109.5,
      });
    }

    const totalResult = checkout.total();
    expect(totalResult).toEqual(2499.95 + 766.5);
  });
});
