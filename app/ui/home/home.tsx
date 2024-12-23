"use client";
import { useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";

export default function HomeComponent() {
  // TypeScript: things is an array of strings
  const [things, setThings] = useState<string[]>([]);

  // TypeScript: newItem is a string
  const addItem = (newItem: string) => {
    console.log("log from home layer");

    setThings((prev) => [...prev, newItem]);
  };

  return (
    <div>
      <ShoppingItemAddingForm addItem={addItem} />
      <SupermarketsList things={things} />
    </div>
  );
}
