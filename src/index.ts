import Checkout from "./Checkout/CheckoutService";
import BulkOrderDiscountRule from "./Discount/BulkOrderDiscountRule";
import ThreeForTwoDiscountRule from "./Discount/ThreeForTwoDiscountRule";
import { products } from "./Product/products";

const { iPad, appleTv } = products;
const iPadBulkDiscountRule = new BulkOrderDiscountRule({
  name: "Super iPad bulk discount",
  amount: 50,
  sku: iPad.sku,
  minBulkOrder: 4,
});
const appleTvThreeForTwoDiscountRule = new ThreeForTwoDiscountRule({
  name: "Apple TV 3 for 2 deal",
  amount: appleTv.price,
  sku: appleTv.sku,
});

const pricingRules = [iPadBulkDiscountRule, appleTvThreeForTwoDiscountRule];

const co = new Checkout(pricingRules);

co.scan(appleTv);
co.scan(iPad);
co.scan(iPad);
co.scan(appleTv);
co.scan(iPad);
co.scan(iPad);
co.scan(iPad);

console.log(co.total());
