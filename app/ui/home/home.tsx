"use client";
import { useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";
import { Item } from "../item/item";
import Banner from "../banner/banner";
import UserInfo from "../user-info/userInfo";

export default function HomeComponent() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (newItem: Item) => {
    setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = (supermarketName: string, itemName: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.itemName === itemName && item.supermarket === supermarketName)
      )
    );
  };

  return (
    <div>
      <UserInfo />
      <Banner />
      <ShoppingItemAddingForm addItem={addItem} />
      <SupermarketsList items={items} deleteItem={deleteItem} />
    </div>
  );
}
