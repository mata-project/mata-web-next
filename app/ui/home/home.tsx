"use client";
import { useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";
import { Item } from "../item/item";
import Banner from "../banner/banner";

export default function HomeComponent() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (newItem: Item) => {
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div>
      <Banner />
      <ShoppingItemAddingForm addItem={addItem} />
      <SupermarketsList items={items} />
    </div>
  );
}
