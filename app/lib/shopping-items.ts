import { ShoppingItem } from "../ui/supermarkets-list/supermarketsListComponent";

const shoppingItems: ShoppingItem[] = [];

export function addItem(item: ShoppingItem) {
  shoppingItems.push(item);
  console.log("add func" + shoppingItems.length);
}

export function getItems(): ShoppingItem[] {
  console.log("get func" + shoppingItems);
  return shoppingItems;
}
