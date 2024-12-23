"use client";
import { useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";

export default function HomeComponent() {
  const [things, setThings] = useState<string[]>([]);

  const addItem = (newItem: string) => {
    setThings((prev) => [...prev, newItem]);
  };

  return (
    <div>
      <ShoppingItemAddingForm addItem={addItem} />
      <SupermarketsList things={things} />
    </div>
  );
}
